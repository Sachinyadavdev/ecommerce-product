import { createPool, Pool } from 'mysql2/promise';

declare global {
  var mysqlPool: Pool | undefined;
}

const getPool = () => {
  if (global.mysqlPool) return global.mysqlPool;

  const url = process.env.DATABASE_URL || '';
  
  const isLocal = url.includes('localhost') || url.includes('127.0.0.1');
  const forcedSSL = url.includes('sslmode=require') || url.includes('ssl=true');
  const disabledSSL = url.includes('sslmode=disable') || url.includes('ssl=false');
  
  const pool = createPool({
    uri: url,
    waitForConnections: true,
    connectionLimit: 20, // Increased for performance
    queueLimit: 0,
    maxIdle: 20,         // Match connection limit for stability
    idleTimeout: 60000,  // Keep idle connections longer to avoid churn
    connectTimeout: 20000, // Slightly reduced to fail faster and retry
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
    // Use SSL if explicitly requested OR (if remote and not explicitly disabled)
    ssl: forcedSSL || (!isLocal && !disabledSSL) ? { rejectUnauthorized: false } : undefined
  });

  // Persist pool globally in both dev and production to ensure reuse on resource-constrained CPUs
  global.mysqlPool = pool;

  return pool;
};

export const query = async <T = any>(sql: string, params?: any[]): Promise<T> => {
  const connectionPool = getPool();
  let retries = 3;
  const QUERY_TIMEOUT = 15000; // 15 seconds
  
  const start = Date.now();
  while (retries > 0) {
    try {
      // Use Promise.race to enforce a timeout on the query
      const results = await Promise.race([
        connectionPool.query(sql, params || []),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('QUERY_TIMEOUT')), QUERY_TIMEOUT)
        )
      ]) as [any];

      const duration = Date.now() - start;
      if (duration > 1000) {
        console.warn(`[DB Slow Query] ${duration}ms: ${sql}`);
      }
      return results[0] as T;
    } catch (error: any) {
      const isRetryable = 
        error.code === 'ECONNRESET' || 
        error.code === 'PROTOCOL_CONNECTION_LOST' || 
        error.code === 'ER_CON_COUNT_ERROR' ||
        error.code === 'ETIMEDOUT' ||
        error.message === 'QUERY_TIMEOUT';

      if (isRetryable && retries > 1) {
        retries--;
        console.warn(`[DB] Connection error or timeout (${error.message || error.code}), retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }
      console.error('[DB Error] Query failed:', { sql, error });
      throw error;
    }
  }
  throw new Error('Database query failed after retries');
};

export default { query };
