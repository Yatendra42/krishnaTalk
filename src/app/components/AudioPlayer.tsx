'use client';

import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';
import { audioService } from '@/services/audioService';


// Note: In Next.js, static assets in 'public' should be referenced by string path.
// The AudioService handles generating these paths.

interface AudioPlayerProps {
  verseNumber: string;
  label: string;
}

export function AudioPlayer({ verseNumber, label }: AudioPlayerProps) {
  const audioUrl = audioService.getAudioUrl(verseNumber);
  
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
  } = useAudio(audioUrl);

  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
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

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="audio-player__container">
        <div className="audio-player__controls">
          {error && (
            <div className="audio-player__error" style={{ color: 'red', fontSize: '12px', marginBottom: '8px' }}>
              Unable to load audio. Verse audio may be missing.
            </div>
          )}
          <button
            onClick={togglePlay}
            className="audio-player__play-button"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            disabled={isLoading}
          >
            {isPlaying ? (
              <Pause fill="currentColor" aria-hidden="true" />
            ) : (
              <Play fill="currentColor" style={{ marginLeft: '2px' }} aria-hidden="true" />
            )}
          </button>

          <div className="audio-player__info">
            <div className="audio-player__info-title">
              Verse {verseNumber}
            </div>
            <div className="audio-player__info-label">
              {label}
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
      </div>
    </div>
  );
}