import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__section-title">About</h3>
            <p className="footer__section-text">
              The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata,
              containing a conversation between Prince Arjuna and Lord Krishna.
            </p>
          </div>

          <div className="footer__section">
            <h3 className="footer__section-title">Quick Links</h3>
            <nav className="footer__links">
              <Link href="/" className="footer__link">Home</Link>
              <Link href="/explore" className="footer__link">All Chapters</Link>
              <Link href="/about" className="footer__link">About</Link>
            </nav>
          </div>

          <div className="footer__section">
            <h3 className="footer__section-title">Resources</h3>
            <nav className="footer__links">
              <a href="#" className="footer__link">Glossary</a>
              <a href="#" className="footer__link">Commentary</a>
              <a href="#" className="footer__link">Downloads</a>
            </nav>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__bottom-text">
            © {new Date().getFullYear()} GitaTalks. All rights reserved.
          </p>
          <p className="footer__bottom-text" style={{ marginTop: '8px' }}>
            Website designed and developed by <strong><a href="https://yatendrajain.com" target="_blank" rel="noopener noreferrer">Yatendra Jain</a></strong>
          </p>
        </div>
      </div>
    </footer>
  );
}