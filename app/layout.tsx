import type { Metadata, Viewport } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'GuoYing | Digital Craftsman',
    template: '%s | GuoYing',
  },
  description: 'Digital Craftsman based in Vietnam. Portfolio of web development, 3D experiences, and creative coding.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f0e7db' },
    { media: '(prefers-color-scheme: dark)', color: '#202023' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${robotoMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('profile-ui');if(s){var t=JSON.parse(s).state.theme;if(t==='dark')document.documentElement.classList.add('dark');}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col font-sans text-ink dark:text-stone-200 transition-colors duration-500">
            <Navbar />
            <main className="grow">
              <div className="page-shell">{children}</div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
