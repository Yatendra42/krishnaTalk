import Image from 'next/image';

interface HeroWithImageProps {
  chapterNumber: number;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export function HeroWithImage({ chapterNumber, title, subtitle, imageUrl }: HeroWithImageProps) {
  return (
    <div className="hero hero--with-image">
      <Image
        src={imageUrl}
        alt={`Chapter ${chapterNumber} illustration`}
        fill
        className="hero__image"
        priority
        sizes="100vw"
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
