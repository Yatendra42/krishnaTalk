'use client';

import { useState } from 'react';
import { Play, Pause, ChevronDown } from 'lucide-react';
import { TalkIcon } from './icons/TalkIcon';
import type { Verse } from '@/services/dataService';
import { useAudio } from '@/contexts/AudioContext';

interface VerseCardProps {
  verse: Verse;
  isFirst?: boolean;
  totalVerses?: number;
}

export function VerseCard({ verse, isFirst, totalVerses }: VerseCardProps) {
  const { currentVerse, currentSection, isPlaying, playSection, pause, resume, setSelected } = useAudio();
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePlay = (section: 'sanskrit' | 'transliteration' | 'translation' | 'commentary', text: string) => {
    if (currentVerse === verse.number && currentSection === section) {
      if (isPlaying) {
        pause();
      } else {
        resume();
      }
    } else {
      playSection(verse.number, section, text);
    }
  };

  const isSelected = (section: string) => currentVerse === verse.number && currentSection === section;
  const isSectionPlaying = (section: string) => isSelected(section) && isPlaying;

  return (
    <div className="verse-card" id={`verse-${verse.number}`}>
      <div className="verse-card__header">
        <div className="verse-card__badge">Verse {verse.number}</div>
        {isFirst && totalVerses && <span className="verse-card__meta">({totalVerses} verses in this chapter)</span>}
      </div>

      <div className={`verse-card__section ${isSelected('sanskrit') ? 'verse-card__section--playing' : ''}`}>
        <button onClick={() => handlePlay('sanskrit', verse.sanskrit)} className="verse-card__play-btn" aria-label="Play Sanskrit">
          {isSectionPlaying('sanskrit') ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <div className="verse-card__section-content">
          <div className="verse-card__sanskrit-text">{verse.sanskrit}</div>
        </div>
        {isSectionPlaying('sanskrit') && <span className="verse-card__playing-label">▶ Playing</span>}
      </div>

      <div className="verse-card__section">
        <div className="verse-card__section-content">
          <div className="verse-card__transliteration-text">{verse.transliteration}</div>
        </div>
      </div>

      <div className={`verse-card__section ${isSelected('translation') ? 'verse-card__section--playing' : ''}`}>
        <button onClick={() => handlePlay('translation', verse.translation)} className="verse-card__play-btn" aria-label="Play translation">
          {isSectionPlaying('translation') ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <div className="verse-card__section-content">
          <div className="verse-card__translation-text">TRANSLATION</div>
          <div>{verse.translation}</div>
        </div>
        {isSectionPlaying('translation') && <span className="verse-card__playing-label">▶ Playing</span>}
      </div>

      <div className="verse-card__commentary-container">
        <h3 className="verse-card__commentary-label">Commentary</h3>
        <div className={`verse-card__commentary-box ${isExpanded ? 'verse-card__commentary-box--expanded' : ''}`}>
          <div className="verse-card__commentary-play-btn">
            <TalkIcon size={24} />
          </div>

          <div className="verse-card__commentary-content">
            <p className={`verse-card__commentary-text ${isExpanded ? 'verse-card__commentary-text--expanded' : ''}`}>
              {verse.commentary}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`verse-card__commentary-toggle ${isExpanded ? 'verse-card__commentary-toggle--expanded' : ''}`}
            >
              {isExpanded ? 'Show less' : 'Read full commentary'} <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {isFirst && (
        <div className="verse-card__actions">
          <button className="verse-card__button verse-card__button--primary">Share Verse</button>
          <button className="verse-card__button verse-card__button--secondary">Bookmark</button>
          <button className="verse-card__button verse-card__button--secondary">Copy Text</button>
        </div>
      )}
    </div>
  );
}
