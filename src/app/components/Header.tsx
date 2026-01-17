'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };
  
  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo">
          <span className="header__logo-icon" aria-hidden="true">🕉️</span>
          <span className="header__logo-text">
            Bhagavad Gita
          </span>
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          <Link 
            href="/"
            className={`header__link ${isActive('/') && !pathname.includes('chapter') ? 'header__link--active' : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/explore"
            className={`header__link ${isActive('/explore') ? 'header__link--active' : ''}`}
          >
            Chapters
          </Link>
          <Link 
            href="/about"
            className={`header__link ${isActive('/about') ? 'header__link--active' : ''}`}
          >
            About
          </Link>
        </nav>

        <div className="header__actions">
          <div className="header__search">
            <Search className="header__search-icon" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search verses..."
              className="header__search-input"
              aria-label="Search verses"
            />
          </div>
          
          <select 
            className="header__language"
            aria-label="Select language"
            defaultValue="english"
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="sanskrit">Sanskrit</option>
          </select>
        </div>
      </div>
    </header>
  );
}