
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Blog = {
  id: string;
  title: string;
  category?: string;
  publishedAt?: string;
  heroImage?: {
    alt?: string;
    url?: string;
  };
  content?: {
    root?: {
      children?: Array<{
        children?: Array<{
          text?: string;
        }>;
      }>;
    };
  };
};

function getParagraphs(blog: Blog) {
  return (
    blog.content?.root?.children
      ?.map((node) =>
        (node.children || [])
          .map((child) => child.text)
          .filter(Boolean)
          .join(" "),
      )
      .filter(Boolean) || []
  );
}

export default function BlogDetailPage() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      try {
        const slug = window.location.pathname.split("/").pop();
        const res = await fetch(`/api/blog?depth=1&limit=1&where[slug][equals]=${slug}`);
        const data = await res.json();
        setBlog(data.docs?.[0] || null);
      } catch (error) {
        console.error("Failed to load blog", error);
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
  }, []);

  if (loading) {
    return <main className="min-h-screen bg-[#fffafc] p-6">Loading blog...</main>;
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-[#fffafc] p-6">
        <Link href="/blogs" className="text-[#e8829a] text-sm font-semibold">
          Back to blogs
        </Link>
        <h1 className="text-3xl font-bold text-[#3d1f2a] mt-8">Blog not found</h1>
      </main>
    );
  }

  const paragraphs = getParagraphs(blog);

  return (
    <main className="min-h-screen bg-[#fffafc] px-6 py-12">
      <article className="max-w-3xl mx-auto">
        <Link href="/blogs" className="text-[#e8829a] text-sm font-semibold">
          Back to blogs
        </Link>

        <div className="mt-8 mb-6">
          <div className="flex gap-3 text-sm text-[#c0849a] mb-3">
            {blog.category && <span>{blog.category}</span>}
            {blog.publishedAt && <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>}
          </div>
          <h1 className="text-4xl font-bold text-[#3d1f2a]">{blog.title}</h1>
        </div>

        {blog.heroImage?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={blog.heroImage.url}
            alt={blog.heroImage.alt || blog.title}
            className="w-full max-h-[420px] object-cover rounded-2xl border border-[#f5d0da] mb-8"
          />
        )}

        <div className="space-y-5 text-[#6f4858] leading-8">
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          ) : (
            <p>No content added yet.</p>
          )}
        </div>
      </article>
    </main>
  );
}
