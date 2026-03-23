import { NextResponse } from 'next/server';
import { z } from 'zod';
import { query as dbQuery } from '@/lib/db';
import { verifyCaptcha } from '@/lib/captcha';
import crypto from 'crypto';

const enquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  industry: z.string().optional(),
  message: z.string().optional(),
  products: z.array(z.object({
    id: z.string(),
    color: z.string().optional()
  })).optional(),
  productId: z.string().optional(), // Fallback for old simple calls
  productIds: z.array(z.string()).optional(), // Fallback for old simple calls
  captchaToken: z.string(),
  captchaAnswer: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = enquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { 
      name, email, phone, company, industry, message, 
      products, productId, productIds, captchaToken, captchaAnswer 
    } = result.data;

    // Verify Captcha
    if (!verifyCaptcha(captchaToken, captchaAnswer)) {
      return NextResponse.json({ error: "Invalid or expired captcha" }, { status: 400 });
    }

    // Resolve product list
    let resolvedProducts: { id: string, color?: string }[] = [];
    if (products && products.length > 0) {
      resolvedProducts = products;
    } else if (productIds && productIds.length > 0) {
      resolvedProducts = productIds.map(id => ({ id }));
    } else if (productId) {
      resolvedProducts = [{ id: productId }];
    }

    // Prepare consolidated message
    let finalMessage = message || "Interested in these products.";
    
    // Add Client Info
    finalMessage += `\n\n--- Client Info ---`;
    finalMessage += `\nCompany: ${company || 'N/A'}`;
    finalMessage += `\nIndustry: ${industry || 'N/A'}`;

    // Add Product Details with Colors
    if (resolvedProducts.length > 0) {
        finalMessage += `\n\n--- Product Details ---`;
        // We'll fetch names later or just IDs for now, but colors are critical
        resolvedProducts.forEach((p, idx) => {
            finalMessage += `\n${idx + 1}. ID: ${p.id}${p.color ? ` (Color: ${p.color})` : ''}`;
        });
    }

    try {
        const now = new Date();
        const id = crypto.randomUUID();
        
        // Single productId column for backward compatibility (primary product)
        const primaryProductId = resolvedProducts.length > 0 ? resolvedProducts[0].id : null;

        await dbQuery(
            "INSERT INTO enquiry (id, name, email, phone, message, productId, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              id, 
              name, 
              email, 
              phone || null, 
              finalMessage, 
              primaryProductId, 
              "PENDING", 
              now, 
              now
            ]
        );
        
        return NextResponse.json({ success: true, message: "Enquiry saved successfully" }, { status: 201 });
    } catch (dbError) {
        console.error("Database error:", dbError);
        return NextResponse.json({ error: "Failed to save enquiry" }, { status: 500 });
    }

  } catch (error) {
    console.error("Error processing enquiry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
