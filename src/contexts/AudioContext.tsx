'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AudioContextType {
    currentVerse: string | null;
    currentSection: 'sanskrit' | 'transliteration' | 'translation' | 'commentary' | null;
    isPlaying: boolean;
    playSection: (verse: string, section: 'sanskrit' | 'transliteration' | 'translation' | 'commentary', text: string) => void;
    pause: () => void;
    resume: () => void;
    setSelected: (verse: string, section: 'sanskrit' | 'transliteration' | 'translation' | 'commentary', text: string) => void;
    currentText: string | null;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
    const [currentVerse, setCurrentVerse] = useState<string | null>(null);
    const [currentSection, setCurrentSection] = useState<'sanskrit' | 'transliteration' | 'translation' | 'commentary' | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentText, setCurrentText] = useState<string | null>(null);

    const playSection = (verse: string, section: 'sanskrit' | 'transliteration' | 'translation' | 'commentary', text: string) => {
        setCurrentVerse(verse);
        setCurrentSection(section);
        setCurrentText(text);
        setIsPlaying(true);
    };

    const setSelected = (verse: string, section: 'sanskrit' | 'transliteration' | 'translation' | 'commentary', text: string) => {
        setCurrentVerse(verse);
        setCurrentSection(section);
        setCurrentText(text);
        setIsPlaying(false);
    };

    const pause = () => {
        setIsPlaying(false);
    };

    const resume = () => {
        setIsPlaying(true);
    };

    return (
        <AudioContext.Provider value={{ currentVerse, currentSection, isPlaying, playSection, pause, resume, setSelected, currentText }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (!context) throw new Error('useAudio must be used within AudioProvider');
    return context;
}
