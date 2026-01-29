import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { dataService } from '@/services/dataService';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Explore All Chapters | Bhagavad Gita',
  description: 'Browse all 18 chapters of the Bhagavad Gita with Sanskrit verses, translations, and commentary.',
};

export default async function ExplorePage() {
  const chapters = await dataService.getChapters();

  return (
    <div className="explore-page">
      <Header />

      <main id="main-content" className="explore-main">
        <div className="explore-header">
          <h1 className="explore-title">
            Explore All Chapters
          </h1>
          <p className="explore-description">
            The Bhagavad Gita consists of 18 chapters, each exploring different aspects of life, duty, and spirituality.
          </p>
        </div>

        <div className="explore-grid">
          {chapters.map((chapter) => (
            <Link
              key={chapter.number}
              href={`/chapter/${chapter.number}`}
              className="explore-card"
            >
              <div className="explore-card__image">
                <Image
                  src={`/assets/images/chapter_bg_${chapter.number}.jpg?v=${Date.now()}`}
                  alt={`Chapter ${chapter.number} illustration`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="explore-card__content">
                <div className="explore-card__badge">
                  Chapter {chapter.number}
                </div>
                <h2 className="explore-card__title">
                  {chapter.title}
                </h2>
                <p className="explore-card__subtitle">
                  {chapter.subtitle}
                </p>
                <div className="explore-card__meta">
                  {chapter.verseCount} verses
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
