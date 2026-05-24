'use client';

import { useState, useEffect } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button 
        className="sidebar-mobile-toggle" 
        onClick={() => setIsOpen(true)}
        aria-label="Open chapters menu"
      >
        <BookOpen width={20} height={20} />
        <span>Chapters</span>
      </button>

      <div 
        className={`sidebar-mobile-overlay ${isOpen ? 'sidebar-mobile-overlay--open' : ''}`} 
        onClick={() => setIsOpen(false)} 
        aria-hidden="true"
      />
      
      <div className={`sidebar-wrapper ${isOpen ? 'sidebar-wrapper--open' : ''}`}>
        <div className="sidebar-wrapper__header">
          <h3>Chapters</h3>
          <button 
            className="sidebar-wrapper__close" 
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X width={24} height={24} />
          </button>
        </div>
        <div className="sidebar-wrapper__content" onClick={(e) => {
          // If they click a link inside, close the drawer
          if ((e.target as HTMLElement).closest('a')) {
            setIsOpen(false);
          }
        }}>
          {children}
        </div>
      </div>
    </>
  );
}
