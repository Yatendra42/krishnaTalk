import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'About | Bhagavad Gita',
  description: 'Learn about the Bhagavad Gita, its history, significance, and teachings.',
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <Header />

      <main id="main-content" className="about-main">
        <h1 className="about-title">
          About the Bhagavad Gita
        </h1>

        <div className="about-content">
          <section className="about-section">
            <h2 className="about-section__title">
              What is the Bhagavad Gita?
            </h2>
            <p className="about-section__paragraph">
              The Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the epic Mahabharata.
              It is a sacred text of the Hindu religion and is considered one of the most important spiritual classics.
            </p>
            <p className="about-section__paragraph">
              The Gita is set in a narrative framework of a dialogue between Pandava prince Arjuna and his guide and charioteer Krishna.
              At the start of the Dharma Yuddha (righteous war) between Pandavas and Kauravas, Arjuna is filled with moral dilemma and
              despair about the violence and death the war will cause.
            </p>
          </section>

          <section className="about-section">
            <h2 className="about-section__title">
              Key Teachings
            </h2>
            <ul className="about-list">
              <li className="about-list__item">
                <strong>Karma Yoga:</strong> The path of selfless action without attachment to results
              </li>
              <li className="about-list__item">
                <strong>Bhakti Yoga:</strong> The path of devotion and love for the divine
              </li>
              <li className="about-list__item">
                <strong>Jnana Yoga:</strong> The path of knowledge and wisdom
              </li>
              <li className="about-list__item">
                <strong>Dharma:</strong> Understanding one's duty and righteous path in life
              </li>
            </ul>
          </section>

          <section className="about-section">
            <h2 className="about-section__title">
              Structure
            </h2>
            <p className="about-section__paragraph">
              The Bhagavad Gita is composed of 18 chapters, each focusing on different aspects of life, duty, and spirituality.
              The chapters progress from Arjuna's initial confusion and despair to his eventual understanding and acceptance of his dharma.
            </p>
          </section>

          <section className="about-section">
            <h2 className="about-section__title">
              Universal Relevance
            </h2>
            <p className="about-section__paragraph">
              While rooted in Hindu philosophy, the Bhagavad Gita's teachings on duty, righteousness, and the nature of reality
              have universal appeal. It has been studied and revered by people of all backgrounds seeking wisdom on how to live
              a meaningful and purposeful life.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
