import { NextResponse } from 'next/server';
import { query as dbQuery } from '@/lib/db';

export async function GET() {
  try {
    const result = await dbQuery<{ count: number }[]>(
      "SELECT COUNT(*) as count FROM enquiry WHERE status = 'PENDING'"
    );

    return NextResponse.json({ 
      count: result[0]?.count || 0 
    });
  } catch (error) {
    console.error("Error fetching notification count:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
