import Link from 'next/link';
import Image from 'next/image';
import type { ChapterSummary } from '@/services/dataService';
import { VerseNavigator } from '@/app/components/VerseNavigator';
import { dataService } from '@/services/dataService';


interface ChapterSidebarProps {
  currentChapter: number;
  chapters: ChapterSummary[];
}

export async function ChapterSidebar({ currentChapter, chapters }: ChapterSidebarProps) {
  const chapter = await dataService.getChapterById(currentChapter);

  if (!chapter) {
    return null;
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__sticky">
        <h2 className="sidebar__title">All Chapters</h2>

        <nav className="sidebar__list" aria-label="Chapter navigation">
          {chapters.map((ch) => (
            <div key={ch.number} className="sidebar__item">
              <Link
                href={`/chapter/${ch.number}`}
                className={`sidebar__link ${ch.number === currentChapter ? 'sidebar__link--active' : ''
                  }`}
                aria-current={ch.number === currentChapter ? 'page' : undefined}
              >
                <Image
                  src={`/assets/images/chapter_bg_${ch.number}.jpg?v=${Date.now()}`}
                  alt=""
                  width={48}
                  height={48}
                  className="sidebar__image"
                  unoptimized
                />
                <div className="sidebar__info">
                  <div className="sidebar__number">
                    Chapter {ch.number}
                  </div>
                  <div className="sidebar__name">
                    {ch.title}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </nav>
      </div>
      <VerseNavigator
        totalVerses={chapter.verseCount}
        chapterNumber={chapter.number}
      />
    </aside>
  );
}