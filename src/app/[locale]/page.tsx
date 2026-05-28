import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { LandingClient } from '@/app/components/LandingClient';
import { dataService } from '@/services/dataService';

export const metadata: Metadata = {
  title: 'Bhagavad Gita | Discover Eternal Wisdom',
  description: 'Read all 18 chapters with Sanskrit verses, audio, and commentary.',
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const chapters = await dataService.getChapters(locale);

  return (
    <>
      <Header />
      <LandingClient chapters={chapters} />
      <Footer />
    </>
  );
}
