'use client';

import { Play, Pause, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';
import { audioService } from '@/services/audioService';
import { useAudio as useAudioContext } from '@/contexts/AudioContext';
import { textToSpeechService } from '@/services/textToSpeechService';
import { useEffect, useState, useCallback, useRef } from 'react';

interface AudioPlayerProps {
  verseNumber: string;
  label: string;
}

export function AudioPlayer({ verseNumber, label }: AudioPlayerProps) {
  const { currentText, isPlaying: contextIsPlaying, pause: contextPause, resume: contextResume, currentSection, currentVerse } = useAudioContext();
  const [activeUrl, setActiveUrl] = useState<string | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const previousTextRef = useRef<string | null>(null);

  // Cleanup helper
  const revokeOldUrl = useCallback((url: string) => {
    if (url && url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  }, []);

  // Immediate stop when text changes
  useEffect(() => {
    if (currentText !== previousTextRef.current) {
      if (currentText) {
        setActiveUrl(undefined); // Instant stop
        setIsGenerating(true);
      }
      previousTextRef.current = currentText;
    }
  }, [currentText]);

  // Handle URL determination and TTS generation
  useEffect(() => {
    let active = true;
    let localTtsUrl = '';

    const updateAudioSource = async () => {
      if (currentText) {
        setIsGenerating(true);
        try {
          const url = await textToSpeechService.getAudioUrl(currentText);
          if (active) {
            localTtsUrl = url;
            setActiveUrl(url);
          } else {
            URL.revokeObjectURL(url);
          }
        } catch (err) {
          console.error("TTS generation failed", err);
          if (active) {
            setActiveUrl(audioService.getAudioUrl(currentVerse || verseNumber));
          }
        } finally {
          if (active) setIsGenerating(false);
        }
      } else {
        // Only fallback to file if verseNumber is valid AND we want it on load?
        // User said "onload audio will not have any text", so let's keep it empty.
        setActiveUrl(undefined);
      }
    };

    updateAudioSource();

    return () => {
      active = false;
      if (localTtsUrl) revokeOldUrl(localTtsUrl);
    };
  }, [currentText, currentVerse, verseNumber, revokeOldUrl]);

  const {
    isPlaying,
    isLoading,
    error,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    audioRef,
    play,
    pause
  } = useAudio(activeUrl || '', {
    autoPlay: contextIsPlaying,
    onEnded: () => {
      contextPause();
    }
  });

  // Handle immediate play/pause from context
  useEffect(() => {
    if (contextIsPlaying && !isPlaying && !isLoading && !isGenerating && activeUrl) {
      play();
    } else if (!contextIsPlaying && isPlaying) {
      pause();
    }
  }, [contextIsPlaying, isPlaying, isLoading, isGenerating, activeUrl, play, pause]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      contextPause();
    } else {
      contextResume();
    }
  };

  const formatTime = (time: number): string => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercent = isMuted ? 0 : volume * 100;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const getLabel = () => {
    if (isGenerating) return 'Generating Audio...';
    if (currentSection) {
      const labels = {
        sanskrit: 'Sanskrit Verse',
        transliteration: 'Transliteration',
        translation: 'Translation',
        commentary: 'Commentary'
      };
      return `Playing: ${labels[currentSection]}`;
    }
    return '';
  };

  // Only show the error if:
  // 1. There is an error
  // 2. We are NOT currently loading or generating TTS
  // 3. The URL is not empty
  const isTts = activeUrl?.startsWith('blob:');
  const showError = error && !isLoading && !isGenerating && activeUrl && (!isTts || activeUrl.includes('failed'));

  return (
    <div className="audio-player">
      <audio key={activeUrl || 'idle'} ref={audioRef} src={activeUrl || undefined} preload="metadata" />

      <div className="audio-player__container">
        <div className="audio-player__controls">

          <button
            onClick={handleTogglePlay}
            className="audio-player__play-button"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            disabled={isLoading || isGenerating || !activeUrl}
          >
            {isGenerating || (isLoading && activeUrl) ? (
              <Loader2 className="audio-player__spinner" aria-hidden="true" />
            ) : isPlaying ? (
              <Pause fill="currentColor" aria-hidden="true" />
            ) : (
              <Play fill="currentColor" className="audio-player__play-icon" aria-hidden="true" />
            )}
          </button>

          <div className="audio-player__info">
            <div className="audio-player__info-title">
              {currentVerse ? `Verse ${currentVerse}` : 'Bhagavad Gita Audio'}
            </div>
            <div className="audio-player__info-label">
              {getLabel() || label || 'Select a section to hear audio'}
            </div>
          </div>

          <div className="audio-player__progress">
            <span className="audio-player__progress-time">
              {formatTime(currentTime)}
            </span>

            <div className="audio-player__progress-bar">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="audio-player__progress-bar-input"
                aria-label="Seek"
                disabled={!activeUrl}
              />
              <div
                className="audio-player__progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
              <div
                className="audio-player__progress-bar-thumb"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>

            <span className="audio-player__progress-time audio-player__progress-time--end">
              {formatTime(duration)}
            </span>
          </div>

          <div className="audio-player__volume">
            <button
              onClick={toggleMute}
              className="audio-player__volume-button"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX aria-hidden="true" />
              ) : (
                <Volume2 aria-hidden="true" />
              )}
            </button>

            <div className="audio-player__volume-bar">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="audio-player__volume-bar-input"
                aria-label="Volume"
              />
              <div
                className="audio-player__volume-bar-fill"
                style={{ width: `${volumePercent}%` }}
              />
              <div
                className="audio-player__volume-bar-thumb"
                style={{ left: `calc(${volumePercent}% - 6px)` }}
              />
            </div>
          </div>
        </div>
        {showError && isTts && (
          <div className="audio-player__error">
            Failed to generate speech audio. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}