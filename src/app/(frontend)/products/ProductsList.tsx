"use client";

import { useEffect, useState } from "react";

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

export default function ProductsList() {
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

  if (loading) {
    return <p className="text-[#c0849a] mt-10">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="text-[#c0849a] mt-10">No products added yet.</p>;
  }

  return (
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
                Rs. {product.price.toFixed(2)}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
