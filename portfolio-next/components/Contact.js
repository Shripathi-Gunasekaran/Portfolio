'use client';
import { useState } from 'react';
import { contactInfo, personalInfo } from '@/data/portfolioData';
import styles from './Contact.module.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate send
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        {/* Left: Heading */}
        <div className={styles.left}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>CONTACTS</span>
          </div>
          <h2 className={styles.heading}>
            {contactInfo.heading}
            <br />
            <span className={styles.headingAccent}>{contactInfo.subheading}</span>
          </h2>
          <p className={styles.desc}>{contactInfo.description}</p>

          <div className={styles.contactDetails}>
            <a href={`mailto:${contactInfo.email}`} className={styles.contactItem}>
              <span className={styles.contactIcon}>✉</span>
              <span>{contactInfo.email}</span>
            </a>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <span>{contactInfo.location}</span>
            </div>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
              <span className={styles.contactIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.57C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/></svg>
              </span>
              <span>github.com/Shripathi-Gunasekaran</span>
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div className={styles.right}>
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className={styles.input}
                required
                autoComplete="name"
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={styles.input}
                required
                autoComplete="email"
              />
            </div>
            <div className={styles.formGroup}>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                className={`${styles.input} ${styles.textarea}`}
                rows={5}
                required
              />
            </div>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Message Sent!' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
