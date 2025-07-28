import type { Metadata } from 'next';
import { Orbitron } from 'next/font/google'; // Импортируем нужный шрифт
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReduxProvider from "@/store/Provider";

// Настройка Inter

// Настройка Orbitron
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'], // Укажи нужные начертания
  variable: '--font-orbitron', // Опционально: для использования в CSS-переменных
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
      {/* Добавляем класс шрифта в body или html */}
      <body className={`${orbitron.variable} bg-gray-900`}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer/>
        </ReduxProvider>
      </body>
    </html>
  );
}