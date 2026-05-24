'use client';

import { Share2, Bookmark, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import type { Verse } from '@/services/dataService';

interface VerseActionsProps {
  verse: Verse;
}

export function VerseActions({ verse }: VerseActionsProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#verse-${verse.number}`;
    const shareText = `Bhagavad Gita Verse ${verse.number}\n\n${verse.sanskrit}\n\n${verse.translation}\n\nRead more at: ${url}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Bhagavad Gita - Verse ${verse.number}`,
          text: shareText,
          url: url
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      // Fallback to copy to clipboard
      handleCopy();
    }
  };

  const handleCopy = async () => {
    const textToCopy = `Bhagavad Gita Verse ${verse.number}\n\n${verse.sanskrit}\n\n${verse.translation}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // Future: save to localStorage or backend
  };

  return (
    <div className="verse-card__actions">
      <button 
        onClick={handleShare}
        className="verse-card__button verse-card__button--primary"
        aria-label="Share verse"
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <Share2 size={16} /> Share Verse
      </button>
      
      <button 
        onClick={handleBookmark}
        className={`verse-card__button verse-card__button--secondary ${bookmarked ? 'active' : ''}`}
        aria-label="Bookmark verse"
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} /> 
        {bookmarked ? 'Saved' : 'Bookmark'}
      </button>
      
      <button 
        onClick={handleCopy}
        className="verse-card__button verse-card__button--secondary"
        aria-label="Copy verse text"
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? 'Copied!' : 'Copy Text'}
      </button>
    </div>
  );
}
