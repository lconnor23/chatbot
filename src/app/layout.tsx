import './globals.css'
import { Inter } from 'next/font/google'
import Chat from '../components/Chat'
import Providers from '../components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Homefinder Chatbot',
  description: 'Affordable, sustainable homes for everyone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        <Chat />
        {children}
      </Providers>
        </body>
    </html>
  )
}
