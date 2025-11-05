import './globals.css';

export const metadata = {
  title: 'CardiaCare Heart Hospital',
  description: 'World-class cardiac care with cutting-edge minimally invasive procedures and 24/7 emergency.',
  themeColor: '#b91c1c',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'CardiaCare Heart Hospital',
    description: 'World-class cardiac care with cutting-edge minimally invasive procedures and 24/7 emergency.',
    type: 'website',
    url: 'https://agentic-54bc2694.vercel.app'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
