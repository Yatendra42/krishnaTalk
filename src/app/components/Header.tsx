'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '../../../i18nConfig';
import { Search, BookOpen, Menu, X } from 'lucide-react';
import Logo from "../../../public/logo.png";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (currentLocale === i18nConfig.defaultLocale && !pathname.startsWith(`/${currentLocale}`)) {
      router.push('/' + newLocale + pathname);
    } else {
      router.push(pathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }
    
    router.refresh();
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo">
          <Image src={Logo} alt="GitaTalks" width={147} height={28} priority />
        </Link>

        {/* Desktop Nav */}
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
            value={currentLocale}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
            <option value="ru">Russian</option>
            <option value="bn">Bengali</option>
          </select>

          {/* Mobile Hamburger Button */}
          <button 
            className="header__hamburger" 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu width={24} height={24} />
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`header__mobile-overlay ${isMobileMenuOpen ? 'header__mobile-overlay--open' : ''}`} onClick={closeMobileMenu} aria-hidden="true" />
      
      {/* Mobile Nav Drawer */}
      <div className={`header__mobile-drawer ${isMobileMenuOpen ? 'header__mobile-drawer--open' : ''}`}>
        <div className="header__mobile-header">
          <Link href="/" className="header__logo" onClick={closeMobileMenu}>
            <Image src={Logo} alt="GitaTalks" width={126} height={24} />
          </Link>
          <button 
            className="header__close" 
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <X width={24} height={24} />
          </button>
        </div>
        
        <div className="header__mobile-content">
          <nav className="header__mobile-nav" aria-label="Mobile navigation">
            <Link
              href="/"
              className={`header__mobile-link ${isActive('/') && !pathname.includes('chapter') ? 'header__mobile-link--active' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className={`header__mobile-link ${isActive('/explore') ? 'header__mobile-link--active' : ''}`}
            >
              Chapters
            </Link>
            <Link
              href="/about"
              className={`header__mobile-link ${isActive('/about') ? 'header__mobile-link--active' : ''}`}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}