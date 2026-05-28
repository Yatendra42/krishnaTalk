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
    private data: Record<string, DataResponse> = {};
    private dataPromises: Record<string, Promise<DataResponse>> = {};


    /**
     * Fetch all data (cached after first load)
     */
    private async fetchData(locale: string = 'en'): Promise<DataResponse> {
        if (this.data[locale]) {
            return this.data[locale];
        }

        // Prevent multiple simultaneous fetches
        if (this.dataPromises[locale]) {
            return this.dataPromises[locale];
        }

        // Use dynamic import for fs to work in both server and client contexts
        this.dataPromises[locale] = import('fs/promises')
            .then(async (fs) => {
                const path = await import('path');
                const fileName = locale === 'hi' ? 'hi_gita.json' : 'en_gita.json';
                const filePath = path.join(process.cwd(), 'public', 'data', fileName);
                const fileContents = await fs.readFile(filePath, 'utf8');
                return JSON.parse(fileContents);
            })
            .then((data) => {
                this.data[locale] = data;
                delete this.dataPromises[locale];
                return data;
            })
            .catch((error) => {
                delete this.dataPromises[locale];
                throw error;
            });

        return this.dataPromises[locale];
    }

    /**
     * Get all chapters
     * Future: Replace with API call to /api/chapters
     */
    async getChapters(locale: string = 'en'): Promise<Chapter[]> {
        const data = await this.fetchData(locale);
        return data.chapters;
    }

    /**
     * Get chapter summaries (for listings)
     * Future: Replace with API call to /api/chapters/summaries
     */
    async getChapterSummaries(locale: string = 'en'): Promise<ChapterSummary[]> {
        const chapters = await this.getChapters(locale);
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
    async getChapterById(id: number, locale: string = 'en'): Promise<Chapter | null> {
        const chapters = await this.getChapters(locale);
        return chapters.find((ch) => ch.number === id) || null;
    }

    /**
     * Get a specific verse by chapter and verse ID
     * Future: Replace with API call to /api/chapters/:chapterId/verses/:verseId
     */
    async getVerseById(chapterId: number, verseId: string, locale: string = 'en'): Promise<Verse | null> {
        const chapter = await this.getChapterById(chapterId, locale);
        return chapter?.verses.find((v) => v.id === verseId) || null;
    }

    /**
     * Search verses by text (simple client-side search)
     * Future: Replace with API call to /api/search?q=...
     */
    async searchVerses(query: string, locale: string = 'en'): Promise<Verse[]> {
        const chapters = await this.getChapters(locale);
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
        this.data = {};
        this.dataPromises = {};
    }
}

// Export singleton instance
export const dataService = new DataService();
