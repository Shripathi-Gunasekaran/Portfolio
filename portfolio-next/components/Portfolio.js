'use client';
import { useState } from 'react';
import Image from 'next/image';
import { projects } from '@/data/portfolioData';
import styles from './Portfolio.module.css';

const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>
          <span className={styles.labelLine} />
          <span className={styles.labelText}>PORTFOLIO</span>
        </div>
        <h2 className={styles.heading}>Case Study</h2>

        {/* Filter Pills */}
        <div className={styles.filters}>
          {allTags.slice(0, 7).map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`${styles.filterBtn} ${filter === tag ? styles.filterActive : ''}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.grid}>
          {filtered.map((project) => (
            <div key={project.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={340}
                  className={styles.image}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add(styles.noImage);
                  }}
                />
                <div className={styles.overlay}>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.overlayBtn}>
                    Live Demo →
                  </a>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.cardActions}>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                    View GitHub
                  </a>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
                    View project ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
