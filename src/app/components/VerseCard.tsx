import type { Verse } from '@/services/dataService';

interface VerseCardProps {
  verse: Verse;
  isFirst?: boolean;
  totalVerses?: number;
}

export function VerseCard({ verse, isFirst, totalVerses }: VerseCardProps) {
  return (
    <div className="verse-card" id={`verse-${verse.number}`}>
      <div className="verse-card__header">
        <div className="verse-card__badge">
          Verse {verse.number}
        </div>
        {isFirst && totalVerses && (
          <span className="verse-card__meta">
            ({totalVerses} verses in this chapter)
          </span>
        )}
      </div>
      
      <div className="verse-card__sanskrit">
        {verse.sanskrit}
      </div>
      
      <div className="verse-card__transliteration">
        {verse.transliteration}
      </div>
      
      <div className="verse-card__translation">
        {verse.translation}
      </div>
      
      <div className="verse-card__commentary">
        <h3 className="verse-card__commentary-title">
          Commentary
        </h3>
        <p className="verse-card__commentary-text">
          {verse.commentary}
        </p>
      </div>
      
      {isFirst && (
        <div className="verse-card__actions">
          <button className="verse-card__button verse-card__button--primary">
            Share Verse
          </button>
          <button className="verse-card__button verse-card__button--secondary">
            Bookmark
          </button>
          <button className="verse-card__button verse-card__button--secondary">
            Copy Text
          </button>
        </div>
      )}
    </div>
  );
}
