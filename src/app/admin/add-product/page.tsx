// src/app/admin/add-product/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [slug, setSlug] = useState("");
  const [images, setImages] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const product = {
      name,
      price: Number(price),
      slug,
      images: images.split(","), // Split by comma to create an array
      videoUrl,
      category,
      subCategory,
      description,
      stock: Number(stock),
      brand,
      tags: tags.split(","), // Tags as an array
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      alert("Product added successfully");
      router.push("/admin"); // Redirect to admin dashboard
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Slug (for SEO)"
          required
        />
        <input
          type="text"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          placeholder="Images (comma-separated URLs)"
          required
        />
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Video URL (optional)"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          type="text"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          placeholder="Subcategory (optional)"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock (e.g., 10)"
          required
        />
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand (optional)"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma-separated)"
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
