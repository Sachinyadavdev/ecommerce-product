import { NextResponse } from 'next/server';
import { query as dbQuery } from '@/lib/db';
import { auth } from '@/auth';

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 1. Fetch all products for name mapping (same as in AdminEnquiriesPage)
        const products = await dbQuery<{ id: string; name: string }[]>(
            "SELECT id, name FROM product",
        );
        const productMap = products.reduce((acc: any, p) => {
            acc[p.id] = p.name;
            return acc;
        }, {});

        // 2. Fetch all enquiries
        const sql = `
      SELECT e.*, p.name as primaryProductName 
      FROM enquiry e 
      LEFT JOIN product p ON e.productId = p.id 
      ORDER BY e.createdAt DESC
    `;
        const rawEnquiries = await dbQuery<any[]>(sql);

        // 3. Process data (extract Company, Industry, and Product Summary)
        const processedEnquiries = rawEnquiries.map((enq) => {
            const message = enq.message || "";

            // Extract Company
            const companyMatch = message.match(/Company:\s*(.*)/i);
            const company = companyMatch ? companyMatch[1].trim() : "N/A";

            // Extract Industry
            const industryMatch = message.match(/Industry:\s*(.*)/i);
            const industry = industryMatch ? industryMatch[1].trim() : "N/A";

            // Extract Product Summary (logic from AdminEnquiriesPage)
            let productSummary = "";
            if (message.includes("--- Product Details ---")) {
                const detailsPart = message.split("--- Product Details ---")[1];
                const lines = detailsPart.split("\n").filter((l: string) => l.trim() !== "");

                const productSummaries = lines.map((line: string) => {
                    const idMatch = line.match(/ID:\s*([\w-]+)/i);
                    const colorMatch = line.match(/\(Color:\s*(.*?)\)/i);
                    const pId = idMatch ? idMatch[1] : null;
                    const color = colorMatch ? colorMatch[1] : null;
                    const pName = pId ? productMap[pId] || pId : null;

                    if (pName) {
                        return `${pName}${color ? ` (${color})` : ''}`;
                    }
                    return null;
                }).filter(Boolean);

                productSummary = productSummaries.join(", ");
            } else {
                productSummary = enq.primaryProductName || "General Interest";
            }

            return {
                ...enq,
                extractedCompany: company,
                extractedIndustry: industry,
                productSummary: productSummary
            };
        });

        return NextResponse.json(processedEnquiries);
    } catch (error) {
        console.error('Error exporting enquiries:', error);
        return NextResponse.json({ error: "Failed to fetch enquiries for export" }, { status: 500 });
    }
}
