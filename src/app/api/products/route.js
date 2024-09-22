import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";

// Fetch all products
export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find({});
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Create a new product
export async function POST(req) {
  await dbConnect();

  try {
    const data = await req.json();
    const product = await Product.create(data);
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
