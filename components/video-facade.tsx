'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface VideoFacadeProps {
  title: string;
  poster: string;
  youtubeId: string;
  watchLabel: string;
}

/**
 * Click-to-play trailer: renders the cover as a poster and only loads
 * the YouTube iframe after the visitor presses play.
 */
const VideoFacade: React.FC<VideoFacadeProps> = ({
  title,
  poster,
  youtubeId,
  watchLabel,
}) => {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-stone-200 dark:border-white/10 bg-stone-900">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-stone-200 dark:border-white/10 bg-stone-900">
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="group absolute inset-0 h-full w-full cursor-pointer"
        aria-label={watchLabel}
      >
        <Image
          src={poster}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 960px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/45" />
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-black/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play size={26} className="ml-1 text-white" fill="currentColor" />
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/90">
            {watchLabel}
          </span>
        </span>
      </button>
    </div>
  );
};

export default VideoFacade;
