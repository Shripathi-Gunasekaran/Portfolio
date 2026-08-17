import { features } from '@/data/portfolioData';
import styles from './Features.module.css';

export default function Features() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>
          <span className={styles.labelLine} />
          <span className={styles.labelText}>FEATURES</span>
        </div>
        <h2 className={styles.heading}>What I Do</h2>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`${styles.card} ${index === 0 ? styles.cardActive : ''}`}
            >
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
              <div className={styles.cardCorner} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
