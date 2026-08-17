'use client';
import Image from 'next/image';
import { personalInfo } from '@/data/portfolioData';
import styles from './Hero.module.css';

export default function Hero() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        {/* Left: Text */}
        <div className={styles.heroText}>
          <div className={styles.greeting}>
            <span className={styles.wave}>👋</span> {personalInfo.greeting}
          </div>
          <h1 className={styles.name}>
            <span className={styles.nameAccent}>{personalInfo.highlightName}</span>
          </h1>
          <h2 className={styles.title}>{personalInfo.title}</h2>
          <p className={styles.subtitle}>{personalInfo.subtitle}</p>

          <div className={styles.actions}>
            <a
              href="#portfolio"
              className={styles.btnPrimary}
              onClick={(e) => handleScroll(e, '#portfolio')}
            >
              My Work <span>→</span>
            </a>
            <a
              href={personalInfo.resumeUrl}
              className={styles.btnOutline}
              target="_blank"
              rel="noopener noreferrer"
            >
              My Resume
            </a>
          </div>
        </div>

        {/* Right: Profile Image */}
        <div className={styles.heroImage}>
          <div className={styles.imageRing}>
            <div className={styles.imageInner}>
              <Image
                src={personalInfo.profileImage}
                alt={`Portrait of ${personalInfo.name}`}
                width={320}
                height={320}
                className={styles.photo}
                priority
                onError={(e) => { e.target.src = '/profile-placeholder.svg'; }}
              />
            </div>
          </div>
          <div className={styles.orbDecor1} />
          <div className={styles.orbDecor2} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
