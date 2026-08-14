import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import { AppShell } from '@/components/app-shell'
import './globals.css'

const instrument = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-instrument',
  display: 'swap',
})

const jbmono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jbmono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'chytré menu — týden, makra, nákup',
  description:
    'Plánovač jídelníčku, který počítá makra za vás. Týdenní mřížka, recepty a nákupní seznam po regálech.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0c1310' },
    { media: '(prefers-color-scheme: light)', color: '#f0f4ef' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="cs"
      suppressHydrationWarning
      className={`bg-background ${instrument.variable} ${jbmono.variable}`}
    >
      <head>
        {/* Restore the saved theme before first paint so navigation never flips it back. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('cm-theme');var d=s?s==='dark':!window.matchMedia('(prefers-color-scheme: light)').matches;var r=document.documentElement;r.classList.toggle('dark',d);r.classList.toggle('light',!d)}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
