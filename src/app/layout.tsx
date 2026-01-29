import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.scss';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Bhagavad Gita - Ancient Wisdom for Modern Life',
  description: 'Read and listen to the Bhagavad Gita with Sanskrit verses, transliterations, translations, and commentary.',
  keywords: ['Bhagavad Gita', 'Sanskrit', 'Hinduism', 'Spirituality', 'Philosophy'],
  authors: [{ name: 'Bhagavad Gita App' }],
  openGraph: {
    title: 'Bhagavad Gita - Ancient Wisdom for Modern Life',
    description: 'Read and listen to the Bhagavad Gita with Sanskrit verses, transliterations, translations, and commentary.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
