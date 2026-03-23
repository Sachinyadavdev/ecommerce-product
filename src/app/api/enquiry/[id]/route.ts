import { NextResponse } from 'next/server';
import { query as dbQuery } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { status, notes } = await req.json();

    if (status && !['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const now = new Date();
    
    let updateSql = "UPDATE enquiry SET ";
    const updateParams = [];
    
    if (status) {
      updateSql += "status = ?, ";
      updateParams.push(status);
    }
    
    if (notes !== undefined) {
      updateSql += "notes = ?, ";
      updateParams.push(JSON.stringify(notes));
    }
    
    updateSql += "updatedAt = ? WHERE id = ?";
    updateParams.push(now, id);

    await dbQuery(updateSql, updateParams);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating enquiry status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
