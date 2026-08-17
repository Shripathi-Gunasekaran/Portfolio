'use client';
import { useState } from 'react';
import { testimonials } from '@/data/portfolioData';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>
          <span className={styles.labelLine} />
          <span className={styles.labelText}>TESTIMONIAL</span>
        </div>
        <h2 className={styles.heading}>What Clients Say</h2>

        <div className={styles.slider}>
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`${styles.card} ${i === current ? styles.cardActive : ''}`}
            >
              <div className={styles.stars}>
                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
              </div>
              <blockquote className={styles.quote}>"{t.text}"</blockquote>
              <div className={styles.author}>
                <div className={styles.authorAvatar}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <button onClick={prev} className={styles.controlBtn} aria-label="Previous testimonial">‹</button>
          <button onClick={next} className={styles.controlBtn} aria-label="Next testimonial">›</button>
        </div>
      </div>
    </section>
  );
}
