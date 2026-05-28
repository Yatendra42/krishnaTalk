import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
import '../../styles/globals.scss';
import SmoothScrolling from '@/app/components/SmoothScrolling';
import initTranslations from '@/i18n';
import TranslationsProvider from '@/app/components/TranslationsProvider';

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
    title: "GitaTalks — Ancient Bhagavad Gita Wisdom for Modern Life",
    description:
      "Explore the complete Bhagavad Gita with life-changing shlokas, Krishna’s teachings, spiritual guidance, inner peace, and powerful wisdom for everyday life.",
    url: "https://www.gitatalks.com",
    siteName: "GitaTalks",
    images: [
      {
        url: "/og-image.jpg",
        width: 400,
        height: 400,
        alt: "GitaTalks"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "GitaTalks — Ancient Bhagavad Gita Wisdom for Modern Life",
    description:
      "Explore the complete Bhagavad Gita with life-changing shlokas, Krishna’s teachings, spiritual guidance, inner peace, and powerful wisdom for everyday life.",
    images: ["/og-image.png"]
  },

  robots: {
    index: true,
    follow: true
  }
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, ['translation']);
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
    <html lang={locale} className={inter.variable}>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NPG66DPH');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NPG66DPH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <TranslationsProvider locale={locale} resources={resources} namespaces={['translation']}>
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
        </TranslationsProvider>
      </body>
    </html>
  );
}

