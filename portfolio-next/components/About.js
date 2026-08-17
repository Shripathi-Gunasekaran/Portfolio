'use client';
import { useEffect, useRef } from 'react';
import { personalInfo, stats } from '@/data/portfolioData';
import styles from './About.module.css';

function useCountUp(ref, target, suffix = '') {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = ref.current;
            if (!el) return;
            const duration = 1800;
            const start = performance.now();
            const step = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(eased * target) + suffix;
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, target, suffix]);
}

function StatCounter({ value, suffix, label }) {
  const ref = useRef(null);
  useCountUp(ref, value, suffix);
  return (
    <div className={styles.statItem}>
      <span ref={ref} className={styles.statValue}>0</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        {/* Left: Services list */}
        <div className={styles.left}>
          <div className={styles.serviceList}>
            {['Website Development', 'App Development', 'Website Hosting', 'Data Analytics'].map((s) => (
              <div key={s} className={styles.serviceItem}>
                <span className={styles.serviceIcon}>→</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: About content */}
        <div className={styles.right}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>ABOUT ME</span>
          </div>
          <h2 className={styles.heading}>About me</h2>
          <p className={styles.bio}>
            {personalInfo.subtitle}
            {' '}I am passionate about improving lives through technology and constantly looking to learn new things every day. Currently pursuing my {personalInfo.degree} in {personalInfo.location}.
          </p>

          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
