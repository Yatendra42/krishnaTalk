'use client';

import { useState, useEffect } from 'react';

interface VerseNavigatorProps {
    currentVerse?: number;
    totalVerses: number;
    chapterNumber: number;
}

export function VerseNavigator({ currentVerse = 1, totalVerses, chapterNumber }: VerseNavigatorProps) {
    const [activeVerse, setActiveVerse] = useState(currentVerse);

    const handleVerseClick = (verseNum: number) => {
        const verseId = `verse-${chapterNumber}.${verseNum}`;
        const verseElement = document.getElementById(verseId);

        if (verseElement) {
            verseElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveVerse(verseNum);
        }
    };

    // Generate array of verse numbers
    const verses = Array.from({ length: totalVerses }, (_, i) => i + 1);

    return (
        <aside className="verse-navigator">
            <div className="verse-navigator__sticky">
                <div className="verse-navigator__header">
                    <h2 className="verse-navigator__title">Chapter {chapterNumber}</h2>
                    <span className="verse-navigator__counter">{activeVerse}/{totalVerses}</span>
                </div>

                <div className="verse-navigator__grid">
                    {verses.map((verseNum) => (
                        <button
                            key={verseNum}
                            onClick={() => handleVerseClick(verseNum)}
                            className={`verse-navigator__button ${verseNum === activeVerse ? 'verse-navigator__button--active' : ''
                                }`}
                            aria-label={`Go to verse ${verseNum}`}
                        >
                            {verseNum}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}
