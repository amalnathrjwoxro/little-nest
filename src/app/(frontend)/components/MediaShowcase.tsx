"use client";

import { useEffect, useState } from "react";
import HLSVideoPlayer from "./HLSVideoPlayer";
HLSVideoPlayer

type Video = {
  id: string;
  title: string;
  video?: {
    hlsMasterUrl?: string;
    hlsStatus?: "pending" | "processing" | "ready" | "failed";
  };
};

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch(
          `/api/videos?depth=1&limit=50&sort=-createdAt`,
          { cache: "no-store" }
        );

        const data = await res.json();
        setVideos(data.docs || []);
      } catch (error) {
        console.error("Failed to load videos", error);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  return (
    <main className="min-h-screen bg-[#fffafc]">
      <section className="px-6 pt-32 pb-16 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#3d1f2a]">
          Videos Gallery
        </h1>

        <p className="text-[#c0849a] mt-2">
          Watch adorable baby moments and product showcases.
        </p>

        {loading && (
          <p className="text-[#c0849a] mt-10">Loading videos...</p>
        )}

        {!loading && videos.length === 0 && (
          <p className="text-[#c0849a] mt-10">No videos added yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {videos.map((video) => {
            const file = video.video;
            const status = file?.hlsStatus;

            return (
              <article
                key={video.id}
                className="bg-white border border-[#f5d0da] rounded-2xl overflow-hidden"
              >
                {/* VIDEO */}
                <div className="h-52 w-full bg-[#fde8ed]">
                  {status === "ready" && file?.hlsMasterUrl ? (
                    <HLSVideoPlayer src={file.hlsMasterUrl} />
                  ) : status === "processing" || status === "pending" ? (
                    <div className="h-full w-full flex items-center justify-center text-[#e8829a] text-sm">
                      Processing video...
                    </div>
                  ) : status === "failed" ? (
                    <div className="h-full w-full flex items-center justify-center text-[#e8829a] text-sm">
                      Video failed to process
                    </div>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-[#e8829a]">
                      No Video
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest text-[#e8829a] mb-2">
                    video
                  </p>

                  <h2 className="text-lg font-bold text-[#3d1f2a]">
                    {video.title}
                  </h2>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}