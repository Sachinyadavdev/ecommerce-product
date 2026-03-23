"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import parse from "html-react-parser";

interface VideoData {
  url: string;
  title?: string;
  poster?: string;
}

interface VideoSectionProps {
  content?: {
    videos?: VideoData[];
    overlay?: boolean;
  };
}

const defaultVideos: VideoData[] = [
  {
    url: "https://cvnvhpmvk12hdosq.public.blob.vercel-storage.com/Besmak%20Ai%20video%20%281%29.mp4",
    title: "Engineering the Future of Automotive Connectivity",
  },
  {
    url: "https://cvnvhpmvk12hdosq.public.blob.vercel-storage.com/Besmak%20Banner%20video%20%281%29.mp4",
    title: "Building the Backbone of Tomorrow’s Automotive Electronics",
  },
];

export default function VideoSection({ content }: VideoSectionProps) {
  const { videos = defaultVideos, overlay = true } = content || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showTitle, setShowTitle] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    // Keep title visible throughout the video
    setShowTitle(true);
  }, [currentIndex]);

  // Handle video progress
  const handleTimeUpdate = (
    e: React.SyntheticEvent<HTMLVideoElement>,
    index: number,
  ) => {
    if (index === currentIndexRef.current) {
      const video = e.currentTarget;
      if (video.duration) {
        const currentProgress = (video.currentTime / video.duration) * 100;
        setProgress(currentProgress);
      }
    }
  };

  // Auto-advance logic
  const handleVideoEnd = (index: number) => {
    if (index === currentIndexRef.current) {
      nextVideo();
    }
  };

  const nextVideo = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const currentVideo = videos[currentIndex];

  return (
    <section className="relative w-full grid grid-cols-1 h-auto md:h-[70vh] lg:h-[90vh] overflow-hidden bg-black mt-20">
      {/* Background Video Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="col-start-1 row-start-1 relative w-full h-auto md:h-full"
        >
          {overlay && (
            <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
          )}

          <video
            ref={videoRef}
            autoPlay={isPlaying}
            muted
            playsInline
            onTimeUpdate={(e) => handleTimeUpdate(e, currentIndex)}
            onEnded={() => handleVideoEnd(currentIndex)}
            poster={currentVideo.poster}
            className="w-full h-auto md:h-full md:object-cover"
          >
            <source src={currentVideo.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="col-start-1 row-start-1 relative z-20 flex items-center justify-center md:h-full text-center px-4 pt-16 md:pt-24 pointer-events-none">
        <AnimatePresence mode="wait">
          {showTitle && currentVideo.title && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className=""
            >
              <h2 className="text-[32px] leading-[1.2] text-center block w-full px-4 md:px-6 lg:px-8 md:text-[6.5rem] md:leading-[0.95] md:drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] lg:text-[4rem] font-semibold md:font-extrabold text-white md:text-white/80 tracking-tight md:tracking-tighter max-w-[1400px] mx-auto normal-case md:uppercase whitespace-nowrap">
                {parse(
                  currentVideo.title
                    .replace(/\\n/g, "<br />")
                    .replace(/\n/g, "<br />"),
                )}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 px-4 md:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-[1400px] mx-auto flex justify-between">
          <button
            onClick={prevVideo}
            className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all pointer-events-auto group backdrop-blur-sm"
            aria-label="Previous Video"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={nextVideo}
            className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all pointer-events-auto group backdrop-blur-sm"
            aria-label="Next Video"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Progress Indicators Container */}
      <div className="absolute bottom-10 inset-x-0 z-30 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex gap-3">
          {videos.map((_, index) => (
            <div
              key={index}
              className="h-1 bg-white/20 rounded-full flex-1 overflow-hidden cursor-pointer group"
              onClick={() => {
                setProgress(0);
                setCurrentIndex(index);
              }}
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width:
                    index === currentIndex
                      ? `${progress}%`
                      : index < currentIndex
                        ? "100%"
                        : "0%",
                  opacity: index === currentIndex ? 1 : 0.4,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-18 inset-x-0 z-30 px-4 md:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-[1400px] mx-auto flex items-center gap-6 pointer-events-auto">
          <span className="text-white/50 text-sm font-medium tracking-widest pointer-events-none">
            0{currentIndex + 1} / 0{videos.length}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all hover:scale-105"
            aria-label={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white translate-x-px" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
