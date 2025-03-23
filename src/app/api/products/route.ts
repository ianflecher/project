import { NextResponse } from "next/server";
import pool from "@/lib/db";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json({ message: "Invalid content type" }, { status: 400 });
    }

    const formData = await req.formData();

    const productName = formData.get("productName")?.toString().trim();
    const price = parseFloat(formData.get("price")?.toString().trim() || "NaN");
    const category = formData.get("category")?.toString().trim();
    const imageFile = formData.get("image") as File | null;

    if (!productName || isNaN(price) || !category || !imageFile) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const newFileName = `${Date.now()}_${imageFile.name}`;
    const newPath = path.join(process.cwd(), "public/uploads", newFileName);

    await fs.writeFile(newPath, imageBuffer);
    const imagePath = `/uploads/${newFileName}`;

    const result = await pool.query(
      "INSERT INTO products (name, price, category, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [productName, price, category, imagePath]
    );

    if (!result.rows.length) {
      return NextResponse.json({ message: "Database insertion failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Product added successfully", product: result.rows[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM products");
    return NextResponse.json({ products: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    console.log("Received request body:", body); // Debugging

    const { id } = body;
    if (!id) {
      return NextResponse.json({ message: "Missing product ID" }, { status: 400 });
    }

    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
    if (!result.rows.length) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error); // Debugging
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  try {
    const { id, productName, price, category, image } = await req.json();
    if (!id || !productName || isNaN(price) || !category) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const result = await pool.query(
      "UPDATE products SET name = $1, price = $2, category = $3, image_url = $4 WHERE id = $5 RETURNING *",
      [productName, price, category, image, id]
    );

    if (!result.rows.length) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated successfully", product: result.rows[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
