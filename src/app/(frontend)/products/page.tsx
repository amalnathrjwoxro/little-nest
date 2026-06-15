"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: {
    alt?: string;
    url?: string;
    sizes?: {
      card?: {
        url?: string;
      };
    };
  };
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products?depth=1&limit=50&sort=-createdAt");
        const data = await res.json();
        setProducts(data.docs || []);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[#fffafc]">
      <Navbar />

      <section className="px-6 pt-32 pb-16 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#3d1f2a]">Products</h1>
        <p className="text-[#c0849a] mt-2">
          Browse baby essentials added by our admins.
        </p>

        {loading && <p className="text-[#c0849a] mt-10">Loading products...</p>}

        {!loading && products.length === 0 && (
          <p className="text-[#c0849a] mt-10">No products added yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {products.map((product) => {
            const image = product.image?.sizes?.card?.url || product.image?.url;

            return (
              <article
                key={product.id}
                className="bg-white border border-[#f5d0da] rounded-2xl overflow-hidden"
              >
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt={product.image?.alt || product.name}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="h-52 bg-[#fde8ed]" />
                )}

                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest text-[#e8829a] mb-2">
                    {product.category}
                  </p>
                  <h2 className="text-lg font-bold text-[#3d1f2a]">
                    {product.name}
                  </h2>
                  {product.description && (
                    <p className="text-sm text-[#8c6373] mt-2 line-clamp-3">
                      {product.description}
                    </p>
                  )}
                  <p className="text-[#3d1f2a] font-bold mt-4">
                    ₹{product.price.toFixed(2)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
