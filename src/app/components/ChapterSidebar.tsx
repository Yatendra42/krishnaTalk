import Link from 'next/link';
import Image from 'next/image';
import type { ChapterSummary } from '@/services/dataService';

interface ChapterSidebarProps {
  currentChapter: number;
  chapters: ChapterSummary[];
}

export function ChapterSidebar({ currentChapter, chapters }: ChapterSidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__sticky">
        <h2 className="sidebar__title">All Chapters</h2>
        
        <nav className="sidebar__list" aria-label="Chapter navigation">
          {chapters.map((chapter) => (
            <div key={chapter.number} className="sidebar__item">
              <Link
                href={`/chapter/${chapter.number}`}
                className={`sidebar__link ${
                  chapter.number === currentChapter ? 'sidebar__link--active' : ''
                }`}
                aria-current={chapter.number === currentChapter ? 'page' : undefined}
              >
                <Image
                  src={chapter.imageUrl}
                  alt=""
                  width={48}
                  height={48}
                  className="sidebar__image"
                />
                <div className="sidebar__info">
                  <div className="sidebar__number">
                    Chapter {chapter.number}
                  </div>
                  <div className="sidebar__name">
                    {chapter.title}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}