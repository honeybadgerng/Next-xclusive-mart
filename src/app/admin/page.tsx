// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: string;
}

export default function AdminDashboard() {
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
      <h1>Admin Dashboard</h1>
      <Link href="/admin/add-product">
        <button>Add New Product</button>
      </Link>

      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ₦{product.price}
            <Link href={`/admin/edit-product/${product._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function handleDelete(productId: string) {
  const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
  if (res.ok) {
    alert("Product deleted");
    window.location.reload(); // Reload the page after deletion
  } else {
    alert("Failed to delete product");
  }
}
