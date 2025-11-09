import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: 'VUEDU BOOK BANK - Virtual University Textbooks',
    template: '%s | VUEDU BOOK BANK'
  },
  description: 'Buy and sell hardcopy textbooks for all Virtual University subjects. Find books for 377+ course codes including CS, Math, Physics, Business, and more.',
  keywords: [
    'Virtual University books',
    'VU textbooks',
    'Pakistani textbooks',
    'Computer Science books',
    'Mathematics books', 
    'Physics books',
    'Business books',
    'CS101', 'MTH101', 'PHY101', 'BUS101',
    'used books Pakistan',
    'student books marketplace'
  ],
  authors: [{ name: 'VUEDU BOOK BANK' }],
  creator: 'VUEDU BOOK BANK',
  publisher: 'VUEDU BOOK BANK',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'VUEDU BOOK BANK - Virtual University Textbooks',
    description: 'Buy and sell hardcopy textbooks for all Virtual University subjects. Find books for 377+ course codes.',
    url: 'http://localhost:3000',
    siteName: 'VUEDU BOOK BANK',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VUEDU BOOK BANK - Virtual University Textbooks'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VUEDU BOOK BANK - Virtual University Textbooks',
    description: 'Buy and sell hardcopy textbooks for all Virtual University subjects.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification-token-here', // Replace with actual Google verification token
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
