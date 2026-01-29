'use client';

import { forwardRef } from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ src, className = '' }, ref) => {
    return (
      <video 
        ref={ref}
        autoPlay 
        muted 
        loop 
        playsInline 
        className={className}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';
