
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type BlogPost = {
  id: string;
  title: string;
  category: "parenting" | "tips" | "products" | "health" | "sleep" | "feeding";
  heroImage?: {
    alt?: string;
    url?: string;
    sizes?: {
      card?: {
        url?: string;
      };
    };
  } | string | null;
  content?: {
    root?: {
      children?: unknown[];
    };
  };
  publishedAt?: string | null;
  slug?: string | null;
};

const categoryLabels: Record<BlogPost["category"], string> = {
  parenting: "Parenting",
  tips: "Tips",
  products: "Products",
  health: "Health",
  sleep: "Sleep",
  feeding: "Feeding",
};

function getImage(media: BlogPost["heroImage"]) {
  if (!media || typeof media === "string") return null;

  const card = media.sizes?.card?.url;
  return {
    alt: media.alt || "Blog image",
    url: card || media.url || null,
  };
}

function getRichTextPlainText(content: BlogPost["content"]) {
  const text: string[] = [];

  function walk(node: unknown) {
    if (!node || typeof node !== "object") return;

    const record = node as { text?: unknown; children?: unknown };
    if (typeof record.text === "string") {
      text.push(record.text);
    }

    if (Array.isArray(record.children)) {
      record.children.forEach(walk);
    }
  }

  walk(content?.root);
  return text.join(" ").replace(/\s+/g, " ").trim();
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const params = new URLSearchParams({
          depth: "1",
          limit: "12",
          sort: "-publishedAt",
        });

        const response = await fetch(`/api/blog?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const result = (await response.json()) as { docs: BlogPost[] };
        setPosts(result.docs);
      } catch (error) {
        console.error("Unable to load blog posts", error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#fffafc] overflow-x-hidden font-sans">
      <div className="relative bg-[#fde8ed] pt-16 pb-14 px-6 overflow-hidden">
        <div className="absolute w-56 h-56 bg-[#fcd0db] rounded-full -top-16 -left-16 animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute w-32 h-32 bg-[#fcd0db] rounded-full top-6 right-10 animate-[pulse_3s_ease-in-out_infinite]" />
        <div className="absolute w-16 h-16 bg-[#f9b8c8] rounded-full bottom-4 left-1/3 animate-[bounce_3.5s_ease-in-out_infinite]" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-[#f5d0da] rounded-full px-4 py-1.5 mb-5">
            <div className="w-2 h-2 bg-[#f9869f] rounded-full animate-ping" />
            <span className="text-[11px] font-semibold text-[#c0687a] tracking-widest uppercase">
              The littlenest journal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3d1f2a] leading-tight tracking-tight mb-3">
            Stories for <span className="text-[#e8829a]">little families</span>
          </h1>
          <p className="text-[14px] text-[#c0849a] leading-relaxed max-w-lg mx-auto mb-7">
            Tips, guides, and heartfelt stories from parents just like you.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white border border-[#f5d0da] text-[#e8829a] font-semibold rounded-full px-6 py-2.5 text-[13.5px] hover:bg-[#fde8ed] transition-all hover:scale-105 active:scale-95"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>

      <div className="bg-[#f9869f] py-2.5 overflow-hidden">
        <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-white text-[11.5px] font-semibold tracking-widest uppercase mx-8 flex-shrink-0">
              Parenting tips &nbsp;.&nbsp; Sleep guides &nbsp;.&nbsp; Product reviews &nbsp;.&nbsp; Real stories &nbsp;.&nbsp; Expert advice &nbsp;.&nbsp;
            </span>
          ))}
        </div>
      </div>

      <section className="py-16 px-6 max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center py-24">
            <p className="text-[#c0849a] text-[14px]">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-[#fde8ed] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" fill="none" stroke="#e8829a" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-[#c0849a] text-[14px]">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {posts.map((post) => {
              const image = getImage(post.heroImage);
              const excerpt = getRichTextPlainText(post.content);
              const date = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "";

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl border border-[#f5d0da] overflow-hidden hover:scale-[1.02] hover:shadow-md transition-all duration-300 group flex flex-col"
                >
                  {image?.url ? (
                    <div className="relative h-52 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#fde8ed]/40 to-transparent" />
                    </div>
                  ) : (
                    <div className="h-36 bg-gradient-to-br from-[#fde8ed] to-[#fcd0db] flex items-center justify-center">
                      <svg width="36" height="36" fill="none" stroke="#e8829a" strokeWidth="1.3" viewBox="0 0 24 24" className="opacity-50">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3 gap-3">
                      <span className="bg-[#fde8ed] text-[#e8829a] text-[10.5px] font-semibold uppercase tracking-widest rounded-full px-3 py-1">
                        {categoryLabels[post.category]}
                      </span>
                      {date && <span className="text-[11px] text-[#d4a0b0] text-right">{date}</span>}
                    </div>

                    <h2 className="text-[17px] font-bold text-[#3d1f2a] mb-2 leading-snug group-hover:text-[#e8829a] transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-[12.5px] text-[#c0849a] leading-relaxed flex-1 line-clamp-4">
                      {excerpt || "Open this story to read the full update."}
                    </p>

                    <div className="mt-5 pt-4 border-t border-[#f5d0da]">
                      <Link
                        href={`/blogs/${post.slug || post.id}`}
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#e8829a] hover:text-[#f06b88] transition-colors"
                      >
                        Read more
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <footer className="bg-[#3d1f2a] py-10 px-6 mt-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#fde8ed] rounded-full flex items-center justify-center">
              <svg width="14" height="14" fill="none" stroke="#e8829a" strokeWidth="1.6" viewBox="0 0 24 24">
                <path d="M3 12h13l-2-7H6L3 12z" />
                <circle cx="7" cy="17" r="1.5" />
                <circle cx="14" cy="17" r="1.5" />
              </svg>
            </div>
            <span className="text-white font-semibold text-[15px] tracking-tight">littlenest</span>
          </div>
          <p className="text-[#c0849a] text-[12px]">© 2026 littlenest. Made with love for little ones.</p>
        </div>
      </footer>
    </div>
  );
}
