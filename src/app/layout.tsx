import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
import '../styles/globals.scss';
import SmoothScrolling from '@/app/components/SmoothScrolling';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "GitaTalks – Complete Bhagavad Gita Teachings & Spiritual Wisdom",
  description:
    "Explore the complete Bhagavad Gita with detailed shlokas, meanings, life lessons, spiritual wisdom, and Krishna teachings.",

  keywords: [
    "Bhagavad Gita",
    "Geeta",
    "Krishna Teachings",
    "Spiritual Wisdom",
    "Bhagavad Gita Shlokas",
    "Sanatan Dharma",
    "GitaTalks"
  ],

  metadataBase: new URL("https://www.gitatalks.com"),

  icons: {
    icon: '/favicon.png',
  },

  openGraph: {
    title: "GitaTalks – Whole Geeta Is Here",
    description:
      "Discover the timeless wisdom of the Bhagavad Gita.",
    url: "https://www.gitatalks.com",
    siteName: "GitaTalks",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GitaTalks"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "GitaTalks – Whole Geeta Is Here",
    description:
      "Read and explore the complete Bhagavad Gita with modern spiritual insights.",
    images: ["/og-image.jpg"]
  },

  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GitaTalks",
    url: "https://www.gitatalks.com",
    logo: "https://www.gitatalks.com/logo.png",
    sameAs: [
      "https://youtube.com/",
      "https://instagram.com/",
      "https://twitter.com/"
    ],
    description: "GitaTalks is a spiritual platform dedicated to sharing the complete wisdom of the Bhagavad Gita through shlokas, teachings, and life lessons."
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}

