import Menu from './components/ui/Menu'
import ReduxProvider from './components/utils/ReduxProvider'

import { vt323 } from './lib/fonts'

import '@/app/styles/globals.scss'

export const metadata = {
  title: 'Alex Peresson Portfolio',
  description: 'Welcome to my portfolio',
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
