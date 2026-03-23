import { query as dbQuery } from "@/lib/db";
import { notFound } from "next/navigation";
import AdminEnquiryDetails from "./AdminEnquiryDetails";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

async function getEnquiryDetail(id: string) {
  // Fetch products with their slugs and category slugs for linking
  const productsResult = await dbQuery<{ id: string; name: string; slug: string; categorySlug: string }[]>(
    `SELECT p.id, p.name, p.slug, c.slug as categorySlug 
     FROM product p 
     LEFT JOIN category c ON p.categoryId = c.id`
  );
  
  const productInfoMap = productsResult.reduce((acc: Record<string, any>, p) => {
    acc[p.id] = { name: p.name, slug: p.slug, categorySlug: p.categorySlug };
    return acc;
  }, {});

  const sql = `
    SELECT e.*, p.name as productName, p.slug as productSlug, c.slug as categorySlug
    FROM enquiry e 
    LEFT JOIN product p ON e.productId = p.id 
    LEFT JOIN category c ON p.categoryId = c.id
    WHERE e.id = ?
  `;
  const results = await dbQuery<any[]>(sql, [id]);
  if (results.length === 0) return null;

  const enq = results[0];
  let message = enq.message || "";
  let products: any[] = [];

  // Parse products from the "Product Details" section
  if (message.includes("--- Product Details ---")) {
    const detailsPart = message.split("--- Product Details ---")[1];
    const lines = detailsPart.split("\n").filter((l: string) => l.trim() !== "");
    
    products = lines.map((line: string) => {
      // Regex to match "1. ID: [id] (Color: [color])" or "1. ID: [id]"
      const idMatch = line.match(/ID:\s*([\w-]+)/i);
      const colorMatch = line.match(/\(Color:\s*(.*?)\)/i);
      const pId = idMatch ? idMatch[1] : null;
      const color = colorMatch ? colorMatch[1] : null;
      
      if (pId) {
        return {
          id: pId,
          color,
          ...(productInfoMap[pId] || { name: pId, slug: null, categorySlug: null })
        };
      }
      return null;
    }).filter(Boolean);
  }

  return { ...enq, message, products };
}

export default async function Page({ params }: { params: { id: string } }) {
  const enquiry = await getEnquiryDetail(params.id);

  if (!enquiry) {
    notFound();
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <Link 
          href="/admin/enquiries" 
          className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Enquiries
        </Link>
        <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
            ID: {enquiry.id}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-[#61a0b3]/10 rounded-xl flex items-center justify-center text-[#61a0b3]">
            <Mail className="w-6 h-6" />
        </div>
        <div>
            <h1 className="text-3xl font-black text-[#61a0b3] leading-tight">Enquiry from {enquiry.name}</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Customer Request Details</p>
        </div>
      </div>

      <AdminEnquiryDetails initialEnquiry={enquiry} />
    </div>
  );
}
