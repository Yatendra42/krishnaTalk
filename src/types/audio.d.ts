/**
 * TypeScript declarations for audio file imports
 * This allows importing MP3 files as modules in TypeScript
 */

declare module '*.mp3' {
    const src: string;
    export default src;
}

declare module '*.wav' {
    const src: string;
    export default src;
}

declare module '*.ogg' {
    const src: string;
    export default src;
}
