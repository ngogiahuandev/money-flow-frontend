import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { Header } from '@/components/shared/header';
import QueryClientProvider from '@/providers/query-client-provider';
import { Toaster } from '@/components/ui/sonner';
import AuthProvider from '@/providers/auth-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <QueryClientProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <AuthProvider>
              <main className='mx-auto max-w-[1200px] pt-16'>{children}</main>
            </AuthProvider>
            <Toaster richColors position='bottom-right' />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
