'use client';

/**
 * Text-to-Speech API Request
 */
interface TTSRequest {
  text: string;
}

/**
 * Text-to-Speech API Error Response
 */
interface TTSErrorResponse {
  error?: string;
  [key: string]: unknown;
}

/**
 * Text-to-Speech Service Interface
 */
export interface TextToSpeechService {
  getAudioUrl: (text: string) => Promise<string>;
  generateSpeech: (text: string) => Promise<HTMLAudioElement>;
  stop: () => void;
  cleanup: () => void;
}

// Module-level state
let currentAudio: HTMLAudioElement | null = null;
let currentAudioUrl: string | null = null;

/**
 * Cleans text for TTS by removing verse markers and danda symbols
 * @param text - Raw text from data
 * @returns Cleaned text
 */
function cleanTTSText(text: string): string {
  // Remove verse markers like ।।1.1।।, ||4.18||, ।। 4.1 ।।, or ||४-४||
  // Matches "||" or "।।" followed by western/devanagari numbers, dots, hyphens, spaces, and ending with "||" or "।।"
  const verseMarkerRegex = /(?:\|\||।।)\s*[\d\.\s०-९\-]+\s*(?:\|\||।।)/g;
  
  // Also remove standalone danda symbols if any remain
  const dandaRegex = /[।|]/g;

  return text
    .replace(verseMarkerRegex, '')
    .replace(dandaRegex, '')
    .trim();
}

/**
 * Fetches audio URL from TTS API
 * @param text - Text to convert to speech
 * @returns Promise resolving to blob URL
 */
export async function getAudioUrl(text: string): Promise<string> {
  try {
    const cleanedText = cleanTTSText(text);
    const requestBody: TTSRequest = { text: cleanedText };
    
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData: TTSErrorResponse = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const blob: Blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error generating speech URL:', error);
    throw error;
  }
}

/**
 * Generates speech audio from text
 * @param text - Text to convert to speech
 * @returns Promise resolving to HTML Audio element
 */
export async function generateSpeech(text: string): Promise<HTMLAudioElement> {
  try {
    stop();
    const url: string = await getAudioUrl(text);
    
    currentAudioUrl = url;
    currentAudio = new Audio(url);

    return currentAudio;
  } catch (error) {
    console.error('Error generating speech:', error);
    throw error;
  }
}

/**
 * Stops current audio playback and cleans up resources
 */
export function stop(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  
  if (currentAudioUrl) {
    URL.revokeObjectURL(currentAudioUrl);
    currentAudioUrl = null;
  }
}

/**
 * Cleanup function (alias for stop)
 */
export function cleanup(): void {
  stop();
}

/**
 * Text-to-Speech service object (backward compatibility)
 */
export const textToSpeechService: TextToSpeechService = {
  getAudioUrl,
  generateSpeech,
  stop,
  cleanup,
};
