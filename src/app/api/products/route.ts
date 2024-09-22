import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";

// Handle GET requests
export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find({});
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error fetching products" },
      { status: 500 }
    );
  }
}

// Handle POST requests
export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error creating product" },
      { status: 400 }
    );
  }
}
