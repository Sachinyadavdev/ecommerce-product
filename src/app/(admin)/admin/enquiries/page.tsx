import { query as dbQuery } from "@/lib/db";
import { Mail } from "lucide-react";
import EnquiryList from "@/components/admin/EnquiryList";

export default async function AdminEnquiriesPage() {
  // Fetch all products for name mapping in bulk enquiries
  const products = await dbQuery<{ id: string; name: string }[]>(
    "SELECT id, name FROM product",
  );
  const productMap = products.reduce((acc: any, p) => {
    acc[p.id] = p.name;
    return acc;
  }, {});

  const sql = `
    SELECT e.*, p.name as productName 
    FROM enquiry e 
    LEFT JOIN product p ON e.productId = p.id 
    ORDER BY e.createdAt DESC
  `;

  const rawEnquiries = await dbQuery<any[]>(sql);

  // Map enquiry messages to include actual product names and colors
  const enquiries = rawEnquiries.map((enq) => {
    let message = enq.message || "";
    let summary = "";

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

      summary = productSummaries.join(", ");
    } else {
      summary = enq.productName || "General Interest";
    }

    return { ...enq, productSummary: summary };
  });

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-[#61a0b3]/10 rounded-xl flex items-center justify-center text-[#61a0b3]">
            <Mail className="w-6 h-6" />
        </div>
        <div>
            <h1 className="text-3xl font-black text-[#61a0b3] leading-tight">Customer Enquiries</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Global Request Queue</p>
        </div>
      </div>

      <EnquiryList initialEnquiries={enquiries} />
    </div>
  );
}
