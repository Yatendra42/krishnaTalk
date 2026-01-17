import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'About | Bhagavad Gita',
  description: 'Learn about the Bhagavad Gita, its history, significance, and teachings.',
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      <Header />
      
      <main id="main-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px' }}>
          About the Bhagavad Gita
        </h1>
        
        <div style={{ fontSize: '16px', lineHeight: 1.75, color: '#0a0a0a' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
              What is the Bhagavad Gita?
            </h2>
            <p style={{ marginBottom: '16px' }}>
              The Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the epic Mahabharata. 
              It is a sacred text of the Hindu religion and is considered one of the most important spiritual classics.
            </p>
            <p style={{ marginBottom: '16px' }}>
              The Gita is set in a narrative framework of a dialogue between Pandava prince Arjuna and his guide and charioteer Krishna. 
              At the start of the Dharma Yuddha (righteous war) between Pandavas and Kauravas, Arjuna is filled with moral dilemma and 
              despair about the violence and death the war will cause.
            </p>
          </section>
          
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
              Key Teachings
            </h2>
            <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Karma Yoga:</strong> The path of selfless action without attachment to results
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Bhakti Yoga:</strong> The path of devotion and love for the divine
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Jnana Yoga:</strong> The path of knowledge and wisdom
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Dharma:</strong> Understanding one's duty and righteous path in life
              </li>
            </ul>
          </section>
          
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
              Structure
            </h2>
            <p style={{ marginBottom: '16px' }}>
              The Bhagavad Gita is composed of 18 chapters, each focusing on different aspects of life, duty, and spirituality. 
              The chapters progress from Arjuna's initial confusion and despair to his eventual understanding and acceptance of his dharma.
            </p>
          </section>
          
          <section>
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
              Universal Relevance
            </h2>
            <p style={{ marginBottom: '16px' }}>
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
