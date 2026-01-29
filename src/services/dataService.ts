/**
 * Data Service Layer
 * 
 * This service abstracts data access from the application.
 * Today: Fetches from local data.json
 * Future: Can be easily swapped to API endpoints
 */

export interface Verse {
    id: string;
    number: string;
    sanskrit: string;
    transliteration: string;
    translation: string;
    commentary: string;
}

export interface Chapter {
    number: number;
    title: string;
    subtitle: string;
    imageUrl: string;
    verseCount: number;
    verses: Verse[];
}

export interface ChapterSummary {
    number: number;
    title: string;
    imageUrl: string;
}

interface DataResponse {
    chapters: Chapter[];
}

class DataService {
    private data: DataResponse | null = null;
    private dataPromise: Promise<DataResponse> | null = null;


    /**
     * Fetch all data (cached after first load)
     */
    private async fetchData(): Promise<DataResponse> {
        if (this.data) {
            return this.data;
        }

        // Prevent multiple simultaneous fetches
        if (this.dataPromise) {
            return this.dataPromise;
        }

        // Use dynamic import for fs to work in both server and client contexts
        this.dataPromise = import('fs/promises')
            .then(async (fs) => {
                const path = await import('path');
                const filePath = path.join(process.cwd(), 'public', 'data', 'en_gita.json');
                const fileContents = await fs.readFile(filePath, 'utf8');
                return JSON.parse(fileContents);
            })
            .then((data) => {
                this.data = data;
                this.dataPromise = null;
                return data;
            })
            .catch((error) => {
                this.dataPromise = null;
                throw error;
            });

        return this.dataPromise;
    }

    /**
     * Get all chapters
     * Future: Replace with API call to /api/chapters
     */
    async getChapters(): Promise<Chapter[]> {
        const data = await this.fetchData();
        return data.chapters;
    }

    /**
     * Get chapter summaries (for listings)
     * Future: Replace with API call to /api/chapters/summaries
     */
    async getChapterSummaries(): Promise<ChapterSummary[]> {
        const chapters = await this.getChapters();
        return chapters.map((ch) => ({
            number: ch.number,
            title: ch.title,
            imageUrl: ch.imageUrl,
        }));
    }

    /**
     * Get a specific chapter by ID
     * Future: Replace with API call to /api/chapters/:id
     */
    async getChapterById(id: number): Promise<Chapter | null> {
        const chapters = await this.getChapters();
        return chapters.find((ch) => ch.number === id) || null;
    }

    /**
     * Get a specific verse by chapter and verse ID
     * Future: Replace with API call to /api/chapters/:chapterId/verses/:verseId
     */
    async getVerseById(chapterId: number, verseId: string): Promise<Verse | null> {
        const chapter = await this.getChapterById(chapterId);
        return chapter?.verses.find((v) => v.id === verseId) || null;
    }

    /**
     * Search verses by text (simple client-side search)
     * Future: Replace with API call to /api/search?q=...
     */
    async searchVerses(query: string): Promise<Verse[]> {
        const chapters = await this.getChapters();
        const allVerses = chapters.flatMap((ch) => ch.verses);
        const lowerQuery = query.toLowerCase();

        return allVerses.filter(
            (verse) =>
                verse.sanskrit.toLowerCase().includes(lowerQuery) ||
                verse.transliteration.toLowerCase().includes(lowerQuery) ||
                verse.translation.toLowerCase().includes(lowerQuery) ||
                verse.commentary.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Clear cache (useful for development/testing)
     */
    clearCache(): void {
        this.data = null;
        this.dataPromise = null;
    }
}

// Export singleton instance
export const dataService = new DataService();
