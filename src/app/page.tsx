"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: string;
  images: string[];
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product Listings</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {products.map((product) => (
          <li key={product._id} style={{ marginBottom: "20px" }}>
            <Link
              href={`/product/${product.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={product.images[0]} // Display the first image from the array
                  alt={product.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <h2>{product.name}</h2>
                  <p>₦{product.price}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
