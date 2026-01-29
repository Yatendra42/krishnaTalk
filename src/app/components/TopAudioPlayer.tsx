'use client';

import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import { textToSpeechService } from '@/services/textToSpeechService';

export function TopAudioPlayer() {
    const { currentVerse, currentSection, isPlaying, pause, resume, currentText } = useAudio();
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (isPlaying && currentText) {
            textToSpeechService.generateSpeech(currentText).then(audio => {
                audio.onloadedmetadata = () => setDuration(audio.duration);
                audio.ontimeupdate = () => setProgress((audio.currentTime / audio.duration) * 100);
                audio.onended = () => pause();
                audio.play();
            });
        } else {
            textToSpeechService.stop();
        }
    }, [isPlaying, currentText, pause]);

    const sectionLabels = {
        sanskrit: 'Sanskrit Verse',
        transliteration: 'Transliteration',
        translation: 'Translation',
        commentary: 'Commentary'
    };



    return (
        <div className="top-audio-player">
            <button onClick={() => isPlaying ? pause() : resume()} className="top-audio-player__pause-btn">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <div className="top-audio-player__info">
                <div className="top-audio-player__verse">{currentVerse ? `Verse ${currentVerse}` : 'Select a verse'}</div>
                <div className="top-audio-player__label">
                    {currentSection ? `Playing: ${sectionLabels[currentSection]}` : 'Ready to play'}
                </div>
                <div className="top-audio-player__progress">
                    <div className="top-audio-player__progress-bar" style={{ width: `${progress}%` }} />
                </div>
            </div>
            <div className="top-audio-player__time">
                {duration > 0 ? (
                    `${Math.floor((progress / 100) * duration)}:${Math.floor(duration % 60).toString().padStart(2, '0')} / ${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`
                ) : '0:00 / 0:00'}
            </div>
        </div>
    );
}
