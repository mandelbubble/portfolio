import Menu from './components/ui/Menu'
import ReduxProvider from './components/utils/ReduxProvider'

import '@/app/styles/globals.scss'

export const metadata = {
  title: 'Alex Peresson Portfolio',
  description: 'Welcome to my portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          <Menu/>
        </ReduxProvider>
      </body>
    </html>
  )
}
