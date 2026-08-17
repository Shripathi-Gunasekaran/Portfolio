import { techStack } from '@/data/portfolioData';
import styles from './TechStack.module.css';

export default function TechStack() {
  return (
    <section className={styles.techSection}>
      <div className={styles.container}>
        <div className={styles.track}>
          {/* Render twice for seamless loop */}
          {[...techStack, ...techStack].map((tech, i) => (
            <div key={i} className={styles.techItem}>
              <span className={styles.techDot} />
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
