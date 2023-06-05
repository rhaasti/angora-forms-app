/* eslint-disable react/react-in-jsx-scope */

import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      </head>
      <body className={inter.className} >
        <header className="fixed top-0 left-0 right-0 flex justify-evenly bg-white p-6 shadow-xl z-50">
          <nav className="justify-start">
            <Link href="/" className="text-lg font-sans font-bold mr-10 whitespace-nowrap">Angora Forms</Link>
            <Link href="/docs" className="text-sm me-8 hover:underline">Docs</Link>
          </nav>
          <nav className="justify-end">
            <Link href="/formBuilder" className="text-sm me-8 hover:underline">Form Builder</Link>
            <span className="text-lg font-bold"></span>
            <Link href="/login" className="text-sm mx-6 me-8 hover:underline">Login</Link>
            <Link href="/componentBank" className="text-sm mx-6 me-8 hover:underline">Component Bank</Link>
            <span className="text-lg"></span>
            <Link href="/signup" className="text-sm bg-red-600 me-8 mx-8 hover:bg-red-400 text-white py-1 px-3 border-b-4 border-red-700 hover:border-red-700 rounded">Signup</Link>
          </nav>
        </header>
        <div>
          {children}
        </div>
        <footer>
          <h1>hi</h1>
        </footer>
      </body>
    </html>
  );
}

