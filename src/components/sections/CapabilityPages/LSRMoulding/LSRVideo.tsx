"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

interface LSRVideoProps {
  content?: {
    videoUrl?: string;
    posterImage?: string;
    title?: string;
  };
}

export default function LSRVideo({ content }: LSRVideoProps) {
  const {
    videoUrl = "",
    posterImage = "/images/lsr-moulding-facility.png",
    title = "",
  } = content || {};

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isMounted]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  if (!isMounted) {
    return (
      <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-black/40 z-10" />
      </section>
    );
  }

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden bg-white">
      {/* Light bottom overlay for controls visibility if video is light */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />

      {/* When no video URL - show poster image as background */}
      {!videoUrl && posterImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterImage}
          alt="LSR Process"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Video (only rendered when URL exists) */}
      {videoUrl && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage || undefined}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-10 inset-x-0 z-30 px-6 lg:px-12">
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Play/Pause */}
      <div className="absolute bottom-16 inset-x-0 z-30 px-6 lg:px-12">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all hover:scale-105"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-white" />
          ) : (
            <Play className="w-4 h-4 fill-white translate-x-px" />
          )}
        </button>
      </div>

      {/* HUD Corners */}
      <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-white/20 z-30" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-white/20 z-30" />
    </section>
  );
}
