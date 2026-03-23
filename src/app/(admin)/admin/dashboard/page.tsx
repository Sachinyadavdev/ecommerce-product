import { query as dbQuery } from "@/lib/db";
import DashboardClient from "@/components/admin/DashboardClient";

export default async function DashboardPage() {
    // Fetch data on the server
    const [
        productsCount,
        enquiriesCount,
        mediaCount,
        seoData,
        enquiryBreakdown,
        categoryStats,
        recentEnquiries
    ] = await Promise.all([
        dbQuery<any[]>("SELECT COUNT(*) as count FROM product"),
        dbQuery<any[]>("SELECT COUNT(*) as count FROM enquiry"),
        dbQuery<any[]>("SELECT COUNT(*) as count FROM media"),
        dbQuery<any[]>("SELECT title, description, keywords FROM pages"),
        dbQuery<any[]>("SELECT status, COUNT(*) as count FROM enquiry GROUP BY status"),
        dbQuery<any[]>("SELECT c.name, COUNT(p.id) as count FROM category c LEFT JOIN product p ON c.id = p.categoryId GROUP BY c.id"),
        dbQuery<any[]>("SELECT name, email, createdAt, status FROM enquiry ORDER BY createdAt DESC LIMIT 5")
    ]);

    return (
        <DashboardClient
            productsCount={productsCount}
            enquiriesCount={enquiriesCount}
            mediaCount={mediaCount}
            seoData={seoData}
            enquiryBreakdown={enquiryBreakdown}
            categoryStats={categoryStats}
            recentEnquiries={recentEnquiries}
        />
    );
}
