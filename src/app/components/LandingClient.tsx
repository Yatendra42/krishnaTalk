'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VideoPlayer } from '@/app/components/VideoPlayer';
import { Volume2, VolumeX, BookOpen, Library, ScrollText, Headphones, Users, ChevronRight } from 'lucide-react';
import '@/styles/components/landing.scss';

interface LandingClientProps {
    chapters: any[];
}

export function LandingClient({ chapters }: LandingClientProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [v, setV] = useState(0);

    useEffect(() => {
        setV(Date.now());
    }, []);

    const toggleSound = () => {
        if (!videoRef.current) return;

        if (isMuted) {
            videoRef.current.muted = false;
            videoRef.current.volume = 0.7; // 70% volume
            setIsMuted(false);
        } else {
            videoRef.current.muted = true;
            setIsMuted(true);
        }
    };

    return (
        <main className="landing">
            {/* Hero - LEFT aligned */}
            <section className="landing-hero">
                <VideoPlayer
                    ref={videoRef}
                    src="/assets/video/bg.mp4"
                    className="landing-hero__video"
                />
                <div className="landing-hero__container">
                    <div className="landing-hero__content">
                        <h1>Discover the Eternal Wisdom of the Bhagavad Gita</h1>
                        <p>Explore the divine conversation between Lord Krishna and Arjuna. Read verse-by-verse with Sanskrit, translation, and commentary.</p>
                        <div className="landing-hero__btns">
                            <Link href="/chapter/1" className="btn btn--white">Read Gita</Link>
                            <Link href="/explore" className="btn btn--outline">Explore</Link>
                            <button
                                className="landing-hero__sound-btn"
                                onClick={toggleSound}
                                aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}
                            >
                                {isMuted ? (
                                    <VolumeX width={24} height={24} />
                                ) : (
                                    <Volume2 width={24} height={24} />
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* Companion */}
            <section className="landing-companion">
                <h2>Your Complete Study Companion</h2>
                <p className="landing-companion__sub">Everything you need to understand the Bhagavad Gita</p>

                <div className="landing-companion__grid">
                    <div className="landing-companion__large">
                        <BookOpen className="landing-companion__icon" />
                        <h3>Complete Sacred Text</h3>
                        <p>Access all 700 verses across 18 chapters with original Sanskrit, accurate transliteration, and clear English translations</p>
                        <div className="landing-companion__tags">
                            <span>Sanskrit</span>
                            <span>English</span>
                            <span>Audio</span>
                        </div>
                    </div>

                    <div className="landing-companion__small">
                        <img src="/assets/images/image-krishan.jpg" alt="Krishna" />
                    </div>

                    {/* <div className="landing-companion__small"><span>🎧</span><h4>Learn & Recite</h4><p>Sanskrit audio for every verse</p></div>
                    <div className="landing-companion__small"><span>💡</span><h4>Explore Deeply</h4><p>Commentary</p></div>
                    <div className="landing-companion__small"><span>📱</span><h4>Anytime</h4><p>All devices</p></div> */}


                </div>
            </section>

            {/* Stats with icons */}
            <section className="landing-stats">
                <div className="landing-stats__item">
                    <div className="landing-stats__icon"><Library /></div>
                    <div className="landing-stats__num">18</div>
                    <div className="landing-stats__label">Chapters</div>
                </div>
                <div className="landing-stats__item">
                    <div className="landing-stats__icon"><ScrollText /></div>
                    <div className="landing-stats__num">700+</div>
                    <div className="landing-stats__label">Verses</div>
                </div>
                <div className="landing-stats__item">
                    <div className="landing-stats__icon"><Headphones /></div>
                    <div className="landing-stats__num">2+</div>
                    <div className="landing-stats__label">Hrs</div>
                </div>
                <div className="landing-stats__item">
                    <div className="landing-stats__icon"><Users /></div>
                    <div className="landing-stats__num">5000+</div>
                    <div className="landing-stats__label">Readers</div>
                </div>
            </section>

            {/* Journey - SOLID colored blocks */}
            <section className="landing-journey">
                <h2>A Journey Through Divine Wisdom</h2>
                <p>Explore the sacred chapters that have guided millions through life</p>

                <div className="landing-journey__items">
                    <div className="landing-journey__card">
                        <div className="landing-journey__card-image">
                            <img src={`/assets/images/chapter_bg_${chapters[0].number}.jpg${v ? `?v=${v}` : ''}`} alt={chapters[0].title} />
                            <div className="landing-journey__verse-badge">{chapters[0].verseCount + " Verses"}</div>
                        </div>
                        <div className="landing-journey__card-content">
                            <span className="landing-journey__category">Foundation</span>
                            <h3 className="landing-journey__title">{chapters[0].title}</h3>
                            <p className="landing-journey__description">{chapters[0].subtitle}</p>
                            <Link href="/chapter/1" className="landing-journey__start-btn">
                                Start Reading
                                <ChevronRight width={16} height={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="landing-journey__card">

                        <div className="landing-journey__card-content">
                            <span className="landing-journey__category">Philosophy</span>
                            <h3 className="landing-journey__title">{chapters[1].title}</h3>
                            <p className="landing-journey__description">{chapters[1].subtitle}</p>
                            <Link href="/chapter/2" className="landing-journey__start-btn">
                                Start Reading
                                <ChevronRight width={16} height={16} />
                            </Link>
                        </div>
                        <div className="landing-journey__card-image">
                            <img src={`/assets/images/chapter_bg_${chapters[1].number}.jpg${v ? `?v=${v}` : ''}`} alt={chapters[1].title} />
                            <div className="landing-journey__verse-badge">{chapters[1].verseCount + " Verses"}</div>
                        </div>
                    </div>

                    <div className="landing-journey__card">
                        <div className="landing-journey__card-image">
                            <img src={`/assets/images/chapter_bg_${chapters[2].number}.jpg${v ? `?v=${v}` : ''}`} alt={chapters[2].title} />
                            <div className="landing-journey__verse-badge">{chapters[2].verseCount + " Verses"}</div>
                        </div>
                        <div className="landing-journey__card-content">
                            <span className="landing-journey__category">Practice</span>
                            <h3 className="landing-journey__title">{chapters[2].title}</h3>
                            <p className="landing-journey__description">{chapters[2].subtitle}</p>
                            <Link href="/chapter/3" className="landing-journey__start-btn">
                                Start Reading
                                <ChevronRight width={16} height={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* All Chapters - bordered grid */}
            <section className="landing-all">
                <h2>Explore All 18 Chapters</h2>
                <div className="landing-all__grid">
                    {chapters.slice(3).map(ch => (
                        <Link key={ch.number} href={`/chapter/${ch.number}`} className="landing-all__cell">
                            <span className="landing-all__num">{ch.number}</span>
                            <h4>{ch.title}</h4>
                            <p>{ch.verseCount} verses</p>
                        </Link>
                    ))}
                </div>
                <Link href="/explore" className="btn btn--secondary">View All Chapters</Link>
            </section>

            {/* CTA */}
            <section className="landing-cta">
                <h2>Begin Your Spiritual Journey Today</h2>
                <p>Start reading the eternal wisdom of the Bhagavad Gita</p>
                <div>
                    <Link href="/chapter/1" className="btn btn--white">Start Reading</Link>
                    <Link href="/explore" className="btn btn--outline-white">Explore</Link>
                </div>
            </section>

            {/* Song */}
            <section className="landing-song">
                <h2>The Song of the Divine</h2>
                <p>The Bhagavad Gita is a 700-verse Hindu scripture that is part of the ancient Sanskrit epic Mahabharata. It presents a conversation between Prince Arjuna and Lord Krishna on the battlefield of Kurukshetra.</p>
            </section>
        </main>
    );
}
