import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT * FROM products;
    `);
    
    return NextResponse.json({ tables: result.rows });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
