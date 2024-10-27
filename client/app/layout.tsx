import type { Metadata } from 'next'
import localFont from 'next/font/local'
import ReactQueryClientProvider from './providers/ReactQueryClientProvider'
import { AppStoreProvider } from './providers/AppStoreProvider'
import MainLayout from './components/MainLayout'
import Header from './components/Header'
import PageContainer from './components/PageContainer'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Client',
  description: 'A generic client app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReactQueryClientProvider>
          <AppStoreProvider>
            <MainLayout>
              <Header />
              <PageContainer>{children}</PageContainer>
            </MainLayout>
          </AppStoreProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}
