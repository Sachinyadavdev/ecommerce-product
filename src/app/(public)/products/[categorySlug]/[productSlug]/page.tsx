import { notFound } from "next/navigation";
import Link from "next/link";
import { query } from "@/lib/db";
import PageHeader from "@/components/ui/PageHeader";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import AddToQueryButton from "@/components/products/AddToQueryButton";
import RelatedProducts from "@/components/sections/products/RelatedProducts";
import { ShieldCheck, Info, Box, Layers, Factory, Activity, CheckCircle2, FileText, Settings, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import MatingPartsValue from "@/components/products/MatingPartsValue";

export async function generateMetadata({
  params,
}: {
  params: { categorySlug: string; productSlug: string };
}): Promise<Metadata> {
  const sql = `
    SELECT p.name, p.description, p.metaTitle, p.metaDescription, c.name as categoryName
    FROM product p
    JOIN category c ON p.categoryId = c.id
    WHERE c.slug = ? AND p.slug = ?
    LIMIT 1
  `;
  const products = await query(sql, [params.categorySlug, params.productSlug]) as any[];
  const product = products[0];

  if (!product) return {};

  return {
    title: product.metaTitle || `${product.name} | ${product.categoryName} | Besmak India`,
    description: product.metaDescription || product.description || `High-quality ${product.name} from Besmak India's ${product.categoryName} range.`,
  };
}

async function getProduct(categorySlug: string, productSlug: string) {
  const sql = `
    SELECT 
      p.*, 
      c.name as categoryName,
      c.slug as categorySlug
    FROM product p
    JOIN category c ON p.categoryId = c.id
    WHERE c.slug = ? AND p.slug = ?
    LIMIT 1
  `;
  const products = await query(sql, [categorySlug, productSlug]) as any[];
  return products[0];
}

async function getSmartRelatedProducts(product: any) {
  const specifications = typeof product.specifications === 'string' 
    ? JSON.parse(product.specifications) 
    : product.specifications;
  
  const matingPartRef = specifications?.["Mating Part"] || specifications?.["mating part"];
  const seriesRef = specifications?.["Series"] || specifications?.["series"];
  
  let relatedProducts: any[] = [];
  
  // 1. Fetch Mating Part(s)
  if (matingPartRef) {
    // Split by comma and trim each part
    const matingPartsList = String(matingPartRef).split(',').map(p => p.trim()).filter(Boolean);
    
    if (matingPartsList.length > 0) {
      const placeholders = matingPartsList.map(() => '?').join(',');
      const matingSql = `
        SELECT p.*, c.slug as categorySlug, c.name as categoryName
        FROM product p
        JOIN category c ON p.categoryId = c.id
        WHERE (p.categorySpecification IN (${placeholders}) OR p.name IN (${placeholders})) AND p.id != ?
      `;
      // Pass the list twice (once for categorySpecification IN, once for name IN) + currentProductId
      const matingParts = await query(matingSql, [...matingPartsList, ...matingPartsList, product.id]) as any[];
      relatedProducts = [...matingParts];
    }
  }
  
  // 2. Fetch Series Mates (if we have fewer than 12)
  if (relatedProducts.length < 12 && seriesRef) {
    const seriesSql = `
      SELECT p.*, c.slug as categorySlug, c.name as categoryName
      FROM product p
      JOIN category c ON p.categoryId = c.id
      WHERE p.categoryId = ? 
      AND (p.specifications->>'$.Series' = ? OR p.specifications->>'$.series' = ?)
      AND p.id != ?
      ${relatedProducts.length > 0 ? `AND p.id NOT IN (${relatedProducts.map(p => `'${p.id}'`).join(',')})` : ''}
      LIMIT ?
    `;
    const seriesMates = await query(seriesSql, [
      product.categoryId, 
      seriesRef, 
      seriesRef, 
      product.id, 
      12 - relatedProducts.length
    ]) as any[];
    relatedProducts = [...relatedProducts, ...seriesMates];
  }
  
  // 3. Fallback: Same Category (if still fewer than 4)
  if (relatedProducts.length < 4) {
    const fallbackSql = `
      SELECT p.*, c.slug as categorySlug, c.name as categoryName
      FROM product p
      JOIN category c ON p.categoryId = c.id
      WHERE p.categoryId = ? AND p.id != ?
      ${relatedProducts.length > 0 ? `AND p.id NOT IN (${relatedProducts.map(p => `'${p.id}'`).join(',')})` : ''}
      LIMIT ?
    `;
    const fallbacks = await query(fallbackSql, [
      product.categoryId, 
      product.id, 
      4 - relatedProducts.length
    ]) as any[];
    relatedProducts = [...relatedProducts, ...fallbacks];
  }
  
  return relatedProducts.filter((rp: any) => rp.id !== product.id);
}

export default async function ProductDetailPage({
  params,
}: {
  params: { categorySlug: string; productSlug: string };
}) {
  const product = await getProduct(params.categorySlug, params.productSlug);

  if (!product) {
    notFound();
  }

  const rawRelatedProducts = await getSmartRelatedProducts(product);
  const relatedProducts = rawRelatedProducts.map((rp: any) => ({
    ...rp,
    category: {
      name: rp.categoryName,
      slug: rp.categorySlug
    }
  }));
  
  const specifications = typeof product.specifications === 'string' 
    ? JSON.parse(product.specifications) 
    : product.specifications;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.categoryName, href: `/products/${product.categorySlug}` },
    { label: product.part_number || product.name },
  ];

  const bannerImg = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/at%20a%20glance%20bannner.png";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `High-quality ${product.name} from Besmak India`,
    "sku": product.part_number || product.partNumber || product.id,
    "mpn": product.part_number || product.partNumber,
    "image": product.images ? JSON.parse(product.images) : [],
    "brand": {
      "@type": "Brand",
      "name": "Besmak India",
    },
    "offers": {
      "@type": "Offer",
      "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://besmakindia.com'}/products/${product.categorySlug}/${product.slug}`,
      "availability": "https://schema.org/InStock",
      "priceCurrency": "INR",
      "price": "0", // Price not shown but required by schema often
    }
  };

  return (
    <div className="bg-white min-h-screen font-body text-slate-900">
      <JsonLd data={productSchema} />
      {/* Premium Integrated Header */}
      <PageHeader 
        title=""
        breadcrumbs={breadcrumbs}
        backgroundImg={bannerImg}
      />


      <div className="container mx-auto px-4 py-0.5 md:py-1 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-4 lg:gap-8 items-start">
          
          {/* LEFT: Technical Viewport (30-33%) */}
          <div className="lg:sticky lg:top-6 space-y-4 z-[10]">
            <div className="relative group rounded-[12px] overflow-hidden">
              <ProductImageGallery 
                images={product.images ? JSON.parse(product.images) : []} 
                productName={product.name}
              />
              <div className="mt-6 flex flex-wrap gap-4 items-center justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                 <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <span>Quality Verified</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Box className="w-3 h-3" />
                   <span>OEM Production</span>
                 </div>
              </div>
            </div>
            
            <div className="p-4 bg-indigo-50/40 rounded-[12px] border border-indigo-100/60 flex flex-col gap-3">
               <div className="flex items-center gap-4 text-primary">
                 <div className="h-10 w-10 bg-white rounded-[12px] flex items-center justify-center shadow-sm border border-slate-100">
                   <FileText className="w-5 h-5" />
                 </div>
                <h4 className="text-xs font-black tracking-[0.2em] text-[#5e9baf]">Our Product Range</h4>
               </div>
               <p className="text-xs text-slate-500 font-medium leading-relaxed">
                 Our Product Range: Browse our full range of automotive connector solutions and other products built with advanced engineering, ensuring performance, safety and long-term reliability.
               </p>
                <Link 
                  href="/e-catalog"
                  className="w-full flex items-center justify-center py-3 bg-white border border-slate-200 rounded-[12px] text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-[0.98]"
                >
                  View E-Catalogue
                </Link>
            </div>
          </div>

          {/* RIGHT: Industrial Intelligence (67-70%) */}
          <div className="space-y-2">
            {/* Header Identity Block */}
            <div className="space-y-2">
              <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-4">
                    <span className="h-0.5 w-10 bg-primary" />
                    <span className="text-[12px] font-black text-primary uppercase tracking-[0.4em]">{product.categoryName}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tight leading-[1] max-w-2xl">
                    {product.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-8 text-xs font-bold text-slate-400">
                    <div className="flex flex-col gap-1">
                      <span className="uppercase tracking-[0.2em] text-[10px] text-slate-300">Serial Designation</span>
                      <span className="text-slate-800 tracking-wide">{product.part_number || "INDUSTRIAL-ASSET-01"}</span>
                    </div>
                    <div className="h-10 w-px bg-slate-100 hidden sm:block" />
                    <div className="flex flex-col gap-1">
                      <span className="uppercase tracking-[0.2em] text-[10px] text-slate-300">Grade Standard</span>
                      <span className="text-slate-800 tracking-wide">ISO-9001 CERTIFIED</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="bg-indigo-50/30 px-3 py-1.5 rounded-[12px] border border-indigo-100/50 flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Part:</span>
                      <span className="text-xs font-black text-slate-700">{product.partNumber}</span>
                    </div>
                  </div>
                </div>
                
                <div className="shrink-0 xl:pt-2">
                  <AddToQueryButton product={{
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    image: product.images ? JSON.parse(product.images)[0] : null,
                    categoryName: product.categoryName
                  }} />
                </div>
              </div>

              {/* Sophisticated Description */}
              <div className="prose prose-slate prose-xl max-w-none text-slate-600 font-medium leading-[1.6] border-l-4 border-primary/10 pl-8 py-1">
                {product.description || "Meticulously precision-crafted industrial solution designed for mission-critical automation and high-load performance. Engineered to exceed standard operational benchmarks with superior thermal and structural stability."}
              </div>
            </div>

            {/* TECHNICAL DATA SHEET - Modern Structured Design */}
            {specifications && Object.keys(specifications).length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-primary/5 rounded-[12px] flex items-center justify-center text-primary">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-black tracking-tight text-[#5e9baf]">Technical Data Sheet</h3>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Engineering Report Ref #v2.40</span>
                  </div>
                </div>

                <div className="bg-indigo-50/20 rounded-[12px] border border-indigo-100/40 p-0.5 overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-indigo-100/50 border border-indigo-100/30 rounded-[12px] overflow-hidden">
                      {(() => {
                        const preferredOrder = ["Tab Size", "Way", "MF", "Sealed", "Material", "Color", "Colour"];
                        
                        const entries = Object.entries(specifications);
                        
                        const sortedEntries = entries.sort(([keyA], [keyB]) => {
                          const indexA = preferredOrder.findIndex(item => 
                            keyA.toLowerCase().includes(item.toLowerCase())
                          );
                          const indexB = preferredOrder.findIndex(item => 
                            keyB.toLowerCase().includes(item.toLowerCase())
                          );
                          
                          if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                          if (indexA !== -1) return -1;
                          if (indexB !== -1) return 1;
                          return keyA.localeCompare(keyB);
                        });

                        return sortedEntries.map(([key, value]) => (
                          <div 
                            key={key} 
                            className="bg-white p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group transition-all hover:bg-slate-50 relative"
                          >
                            <div className="space-y-0.5">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">{key}</span>
                              <div className="h-px w-3 bg-indigo-50 group-hover:w-full group-hover:bg-primary/20 transition-all duration-500" />
                            </div>
                            {key.toLowerCase().includes("mating part") ? (
                              <MatingPartsValue value={String(value)} />
                            ) : (
                              <span className="text-xs font-bold text-slate-600 leading-tight text-right">{String(value)}</span>
                            )}
                          </div>
                        ));
                      })()}
                    </div>
                </div>
              </div>
            )}

            {/* Manufacturing & Operational context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="relative p-6 bg-white rounded-[12px] border border-slate-100 shadow-sm overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <ShieldCheck className="w-16 h-16" />
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 mb-6 font-black text-[10px] uppercase tracking-[0.2em]">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Production Standards
                  </div>
                  <h5 className="text-xl font-black text-[#5e9baf] mb-3 tracking-tight leading-tight">Zero-Defect Protocol</h5>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Every asset is subjected to 3D coordinate measuring and automated visual inspection systems to guarantee structural integrity across extreme operational contexts.
                  </p>
               </div>

               <div className="relative p-6 bg-white rounded-[12px] border border-slate-100 shadow-sm overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Activity className="w-16 h-16" />
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 mb-6 font-black text-[10px] uppercase tracking-[0.2em]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Material Analysis
                  </div>
                  <h5 className="text-xl font-black text-[#5e9baf] mb-3 tracking-tight leading-tight">Advanced Composites</h5>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Utilizing high-grade industrial polymers and aerospace-tier alloys, ensuring high heat resistance and minimal degradation under friction-heavy workflows.
                  </p>
               </div>
            </div>
            
            {/* CTA Intelligence Line */}
            <div className="bg-[#5e9baf] rounded-[12px] p-3 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-50" />
               <div className="relative z-10 space-y-4 max-w-sm">
                 <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tighter leading-[1.1]">Custom Industrial Engineering.</h4>
                 <p className="text-sm text-white/50 font-medium leading-relaxed">
                   Need a specialized variation of this asset? Our R&D team can adapt technical parameters.
                 </p>
               </div>
               <button className="relative z-10 px-8 py-4 bg-white text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-[12px] hover:bg-primary hover:text-white transition-all shadow-2xl flex items-center gap-4 group/btn">
                 Engineering Sheet
                 <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
               </button>
            </div>
          </div>
        </div>

        {/* RELATED ASSETS */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex flex-col items-center text-center mb-6 space-y-2">
              <span className="text-[11px] font-black text-primary uppercase tracking-[0.5em]">Curated Intelligence</span>
              <h3 className="text-3xl font-black text-[#5e9baf] tracking-tighter">Compatible Industry Assets</h3>
              <div className="h-1 w-10 bg-slate-100 rounded-full" />
            </div>
            
            <RelatedProducts products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
