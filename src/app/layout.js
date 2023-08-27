import '@/app/styles/globals.scss'
import ReduxProvider from './components/utils/ReduxProvider'

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
        </ReduxProvider>
      </body>
    </html>
  )
}
