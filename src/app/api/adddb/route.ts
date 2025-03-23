import { NextResponse } from "next/server";
import pool from "@/lib/db";
export async function GET() {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          price NUMERIC NOT NULL,
          category TEXT NOT NULL,
          image_url TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
      return NextResponse.json({ message: "Table 'products' created successfully!" });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }