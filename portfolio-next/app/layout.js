import './globals.css';
import { personalInfo } from '@/data/portfolioData';

export const metadata = {
  title: `${personalInfo.name} | Full Stack Developer and Hardware Engineer`,
  description: personalInfo.subtitle,
  keywords: ['Full Stack Developer', 'Hardware Engineer', 'Automation Testing', 'Data Analytics', 'Portfolio', 'Tamil Nadu'],
  authors: [{ name: personalInfo.name }],
  openGraph: {
    title: `${personalInfo.name} | Full Stack Developer and Hardware Engineer`,
    description: personalInfo.subtitle,
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
