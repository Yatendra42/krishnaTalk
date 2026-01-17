import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { dataService } from '@/services/dataService';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import styles from './explore.module.scss';

export const metadata: Metadata = {
  title: 'Explore All Chapters | Bhagavad Gita',
  description: 'Browse all 18 chapters of the Bhagavad Gita with Sanskrit verses, translations, and commentary.',
};

export default async function ExplorePage() {
  const chapters = await dataService.getChapters();
  
  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      <Header />
      
      <main id="main-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>
            Explore All Chapters
          </h1>
          <p style={{ fontSize: '16px', color: '#737373', lineHeight: 1.75 }}>
            The Bhagavad Gita consists of 18 chapters, each exploring different aspects of life, duty, and spirituality.
          </p>
        </div>
        
        <div className={styles.grid}>
          {chapters.map((chapter) => (
            <Link
              key={chapter.number}
              href={`/chapter/${chapter.number}`}
              className={styles.card}
            >
              <div className={styles.card__image}>
                <Image
                  src={chapter.imageUrl}
                  alt={`Chapter ${chapter.number} illustration`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              <div className={styles.card__content}>
                <div className={styles.card__badge}>
                  Chapter {chapter.number}
                </div>
                <h2 className={styles.card__title}>
                  {chapter.title}
                </h2>
                <p className={styles.card__subtitle}>
                  {chapter.subtitle}
                </p>
                <div className={styles.card__meta}>
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
