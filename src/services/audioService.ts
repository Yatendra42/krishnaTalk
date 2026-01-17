/**
 * Audio Service Layer
 * 
 * This service abstracts audio file access.
 * Today: Serves local MP3 files from public/audio
 * Future: Can be swapped to streaming API endpoints
 */

export class AudioService {
    /**
     * Get audio URL for a specific verse
     * Future: Replace with API endpoint that returns streaming URL
     * 
     * @param verseId - Format: "chapter.verse" (e.g., "2.47")
     * @returns Audio file URL
     */
    getAudioUrl(verseId: string): string {
        // Parse verse ID
        const cleanId = verseId.replace('.', '_');

        // Future: Replace with API call
        // return `/api/audio/${verseId}`;

        return `/audio/verse_${cleanId}.mp3`;
    }

    /**
     * Check if audio exists for a verse
     * Future: Query API for availability
     */
    async checkAudioAvailability(verseId: string): Promise<boolean> {
        const url = this.getAudioUrl(verseId);

        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch {
            return false;
        }
    }

    /**
     * Preload audio file
     * Useful for improving playback experience
     */
    async preloadAudio(verseId: string): Promise<void> {
        const url = this.getAudioUrl(verseId);

        return new Promise((resolve, reject) => {
            const audio = new Audio(url);

            const handleCanPlay = () => {
                cleanup();
                resolve();
            };

            const handleError = () => {
                cleanup();
                reject(new Error(`Failed to load audio for verse ${verseId}`));
            };

            const cleanup = () => {
                audio.removeEventListener('canplaythrough', handleCanPlay);
                audio.removeEventListener('error', handleError);
            };

            audio.addEventListener('canplaythrough', handleCanPlay, { once: true });
            audio.addEventListener('error', handleError, { once: true });

            // Start loading
            audio.load();
        });
    }

    /**
     * Get multiple audio URLs
     * Useful for batch operations
     */
    getMultipleAudioUrls(verseIds: string[]): string[] {
        return verseIds.map((id) => this.getAudioUrl(id));
    }
}

// Export singleton instance
export const audioService = new AudioService();
