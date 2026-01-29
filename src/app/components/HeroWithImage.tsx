'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { VideoPlayer } from './VideoPlayer';

interface HeroWithImageProps {
  chapterNumber: number;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export function HeroWithImage({ chapterNumber, title, subtitle, imageUrl }: HeroWithImageProps) {
  const [imgSrc, setImgSrc] = useState(`/assets/images/chapter_bg_${chapterNumber}.jpg`);
  const [v, setV] = useState(0);

  useEffect(() => {
    setV(Date.now());
  }, []);

  useEffect(() => {
    setImgSrc(`/assets/images/chapter_bg_${chapterNumber}.jpg`);
  }, [chapterNumber]);

  return (
    <div className="hero hero--with-image">
      <Image
        src={`${imgSrc}${v ? `?v=${v}` : ''}`}
        alt={`Chapter ${chapterNumber} illustration`}
        fill
        className="hero__image"
        priority
        unoptimized
        sizes="100vw"
        onError={() => setImgSrc('/assets/images/chapter_bg_1.jpg')}
      />

      <div className="hero__overlay" />

      <div className="hero__container">
        <div className="hero__badge">
          Chapter {chapterNumber}
        </div>
        <h1 className="hero__title">
          {title}
        </h1>
        <p className="hero__subtitle">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
