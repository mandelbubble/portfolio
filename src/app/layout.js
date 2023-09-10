import Menu from './components/ui/Menu'
import ReduxProvider from './components/utils/ReduxProvider'

import { vt323 } from './lib/fonts'

import '@/app/styles/globals.scss'

export const metadata = {
  siteName: 'Alex Peresson porfolio',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript', 'Three.js', 'WebGL'],
  colorScheme: 'dark',
  creator: 'Alex Peresson',
  authors: [{ name : 'Alex'}],
  title: {
    default : 'Alex Peresson',
    template : '%s | Alex Peresson'
  },
  description: 'Software engineer portfolio',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={vt323.className}>
        <ReduxProvider>
          {children}
          <Menu/>
        </ReduxProvider>
      </body>
    </html>
  )
}
