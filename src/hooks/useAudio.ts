'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

export interface UseAudioOptions {
    autoPlay?: boolean;
    loop?: boolean;
    volume?: number;
    onEnded?: () => void;
    onError?: (error: Error) => void;
}

export interface UseAudioReturn {
    // State
    isPlaying: boolean;
    isLoading: boolean;
    error: Error | null;
    currentTime: number;
    duration: number;
    volume: number;
    isMuted: boolean;

    // Controls
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    seek: (time: number) => void;
    setVolume: (volume: number) => void;
    toggleMute: () => void;

    // Ref
    audioRef: React.RefObject<HTMLAudioElement | null>;
}

/**
 * Custom hook for audio playback with full controls
 * Handles loading, error states, and accessibility
 */
export function useAudio(audioUrl: string, options: UseAudioOptions = {}): UseAudioReturn {
    const {
        autoPlay = false,
        loop = false,
        volume: initialVolume = 1,
        onEnded,
        onError,
    } = options;

    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolumeState] = useState(initialVolume);
    const [isMuted, setIsMuted] = useState(false);
    const previousVolumeRef = useRef(initialVolume);

    // Initialize audio element
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = volume;
        audio.loop = loop;

        if (autoPlay) {
            audio.play().catch((err) => {
                setError(new Error('Autoplay failed: ' + err.message));
                onError?.(err);
            });
        }
    }, [autoPlay, loop, volume, onError]);

    // Event handlers
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadStart = () => setIsLoading(true);
        const handleCanPlay = () => setIsLoading(false);
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleDurationChange = () => setDuration(audio.duration);
        const handleEnded = () => {
            setIsPlaying(false);
            onEnded?.();
        };
        const handleError = () => {
            const err = new Error('Failed to load audio');
            setError(err);
            setIsLoading(false);
            onError?.(err);
        };
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('loadstart', handleLoadStart);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('durationchange', handleDurationChange);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('loadstart', handleLoadStart);
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('durationchange', handleDurationChange);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, [onEnded, onError]);

    // Control functions
    const play = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.play().catch((err) => {
            const error = new Error('Playback failed: ' + err.message);
            setError(error);
            onError?.(error);
        });
    }, [onError]);

    const pause = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
    }, []);

    const togglePlay = useCallback(() => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }, [isPlaying, play, pause]);

    const seek = useCallback((time: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = Math.max(0, Math.min(time, duration));
    }, [duration]);

    const setVolume = useCallback((newVolume: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        audio.volume = clampedVolume;
        setVolumeState(clampedVolume);

        if (clampedVolume > 0) {
            setIsMuted(false);
            previousVolumeRef.current = clampedVolume;
        } else {
            setIsMuted(true);
        }
    }, []);

    const toggleMute = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isMuted) {
            const newVolume = previousVolumeRef.current || 0.5;
            audio.volume = newVolume;
            setVolumeState(newVolume);
            setIsMuted(false);
        } else {
            previousVolumeRef.current = volume;
            audio.volume = 0;
            setVolumeState(0);
            setIsMuted(true);
        }
    }, [isMuted, volume]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Only handle if audio player is focused or no input is focused
            const activeElement = document.activeElement;
            const isInputFocused = activeElement?.tagName === 'INPUT' ||
                activeElement?.tagName === 'TEXTAREA';

            if (isInputFocused) return;

            switch (e.key) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    seek(currentTime - 5);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    seek(currentTime + 5);
                    break;
                case 'm':
                    e.preventDefault();
                    toggleMute();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [togglePlay, seek, currentTime, toggleMute]);

    return {
        // State
        isPlaying,
        isLoading,
        error,
        currentTime,
        duration,
        volume,
        isMuted,

        // Controls
        play,
        pause,
        togglePlay,
        seek,
        setVolume,
        toggleMute,

        // Ref
        audioRef,
    };
}
