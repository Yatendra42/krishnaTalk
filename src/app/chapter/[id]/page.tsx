import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { dataService } from '@/services/dataService';
import { Header } from '@/app/components/Header';
import { AudioPlayer } from '@/app/components/AudioPlayer';
import { Footer } from '@/app/components/Footer';
import { HeroWithImage } from '@/app/components/HeroWithImage';
import { VerseCard } from '@/app/components/VerseCard';
import { ChapterSidebar } from '@/app/components/ChapterSidebar';

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const chapterId = parseInt(id, 10);
  const chapter = await dataService.getChapterById(chapterId);
  
  if (!chapter) {
    return {
      title: 'Chapter Not Found',
    };
  }
  
  return {
    title: `Chapter ${chapter.number}: ${chapter.title} | Bhagavad Gita`,
    description: chapter.subtitle,
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { id } = await params;
  const chapterId = parseInt(id, 10);
  const chapter = await dataService.getChapterById(chapterId);
  
  if (!chapter) {
    notFound();
  }
  
  const allChapters = await dataService.getChapterSummaries();
  
  return (
    <div className="page-wrapper">
      <Header />
      
      <HeroWithImage
        chapterNumber={chapter.number}
        title={chapter.title}
        subtitle={chapter.subtitle}
        imageUrl={chapter.imageUrl}
      />
      
      <AudioPlayer
        verseNumber={`${chapter.number}.1`}
        label="Sanskrit Audio"
      />
      
      <main id="main-content" className="main-content">
        <div className="content-layout">
          <div className="content-primary">
            <div className="verse-list">
              {chapter.verses.map((verse, index) => (
                <VerseCard
                  key={verse.id}
                  verse={verse}
                  isFirst={index === 0}
                  totalVerses={chapter.verseCount}
                />
              ))}
              
              {chapter.verses.length < chapter.verseCount && (
                <div className="load-more">
                  <p className="load-more__text">
                    Showing {chapter.verses.length} of {chapter.verseCount} verses
                  </p>
                  <button className="load-more__button">
                    Load More Verses
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <ChapterSidebar
            currentChapter={chapter.number}
            chapters={allChapters}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
