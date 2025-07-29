import type { Metadata } from 'next';
import { Share_Tech_Mono } from 'next/font/google'; // Импортируем Share Tech Mono
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReduxProvider from "@/store/Provider";

// Настройка Share Tech Mono
const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-sharetechmono', // CSS переменная (по желанию)
});

export const metadata: Metadata = {
  title: 'Rick and Morty AI Chat',
  description: 'Talk with Rick Sanchez from Rick and Morty',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${shareTechMono.variable} font-mono bg-gray-900`}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer/>
        </ReduxProvider>
      </body>
    </html>
  );
}
