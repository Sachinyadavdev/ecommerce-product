import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query("SELECT * FROM page_sections WHERE type = 'ep-infrastructure'");
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
