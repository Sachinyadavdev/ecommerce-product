import { query as dbQuery } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit, Tag, Image as ImageIcon, Package, Hash } from "lucide-react";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";
import Image from "next/image";

export default async function AdminCategoriesPage() {
  const categories = await dbQuery<any[]>(
    "SELECT c.*, COUNT(p.id) as productCount FROM category c LEFT JOIN product p ON p.categoryId = c.id GROUP BY c.id ORDER BY c.display_order ASC, c.name ASC"
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">
            {categories.length} {categories.length === 1 ? "category" : "categories"}
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Tag className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <ImageIcon className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">With Image</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.filter((c) => c.image).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-50 rounded-lg">
              <Package className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.reduce((sum: number, c: any) => sum + (Number(c.productCount) || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
          <Tag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No categories yet.</p>
          <Link href="/admin/categories/new" className="mt-4 inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:underline">
            <Plus className="h-4 w-4" /> Create your first category
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-44 w-full bg-gradient-to-br from-gray-100 to-gray-50">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
                    <ImageIcon className="h-10 w-10 mb-2" />
                    <span className="text-xs font-medium">No image</span>
                  </div>
                )}
                {/* Product count & Order badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                  <div className="bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-gray-100 shadow-sm">
                    {category.productCount} products
                  </div>
                  <div className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                    <Hash className="h-3 w-3" />
                    Order: {category.display_order || 0}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-base leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                {category.tag && (
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-1">
                    {category.tag}
                  </p>
                )}
                <p className="text-xs text-gray-400 font-mono mb-3 truncate">/products/{category.slug}</p>
                {category.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
                    {category.description}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-2">
                  <Link
                    href={`/products/${category.slug}`}
                    target="_blank"
                    className="text-xs text-gray-400 hover:text-blue-600 transition-colors font-medium"
                  >
                    View page ↗
                  </Link>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/categories/edit/${category.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                    <DeleteCategoryButton
                      categoryId={category.id}
                      categoryName={category.name}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
