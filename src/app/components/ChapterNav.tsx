import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Chapter {
  number: number;
  title: string;
}

const chapters: Chapter[] = [
  { number: 1, title: 'Arjuna Vishada Yoga' },
  { number: 2, title: 'Sankhya Yoga' },
  { number: 3, title: 'Karma Yoga' },
  { number: 4, title: 'Jnana Karma Sanyasa Yoga' },
  { number: 5, title: 'Karma Sanyasa Yoga' },
  { number: 6, title: 'Dhyana Yoga' },
  { number: 7, title: 'Jnana Vijnana Yoga' },
  { number: 8, title: 'Aksara Brahma Yoga' },
];

interface ChapterNavProps {
  currentChapter: number;
}

export function ChapterNav({ currentChapter }: ChapterNavProps) {
  return (
    <aside className="sticky top-24 w-64 shrink-0">
      <div className="space-y-6">
        {/* Chapter List */}
        <div>
          <h4 className="text-[12px] tracking-widest uppercase text-muted-foreground font-light mb-4 px-3">
            All Chapters
          </h4>
          <nav className="space-y-1">
            {chapters.map((chapter) => (
              <a
                key={chapter.number}
                href={`#chapter-${chapter.number}`}
                className={`
                  block px-3 py-2.5 rounded-md text-[14px] transition-all duration-300
                  ${
                    chapter.number === currentChapter
                      ? 'bg-accent/50 text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }
                `}
              >
                <span className="block text-[11px] tracking-wide uppercase mb-0.5 opacity-70">
                  Chapter {chapter.number}
                </span>
                <span className="block font-light leading-snug">
                  {chapter.title}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-border/50 space-y-2">
          <button
            className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={currentChapter === 1}
          >
            <ChevronLeft size={14} />
            <span>Previous Chapter</span>
          </button>
          <button
            className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={currentChapter === chapters.length}
          >
            <span>Next Chapter</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
