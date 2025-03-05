import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { Header } from '@/components/shared/header';
import QueryClientProvider from '@/providers/query-client-provider';
import { Toaster } from '@/components/ui/sonner';
import AuthProvider from '@/providers/auth-provider';
import { ScrollArea } from '@/components/ui/scroll-area';

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
            <ScrollArea className='h-screen'>
              <Header />
              <AuthProvider>
                <main className='mx-auto max-w-[1200px] px-4 pt-16'>{children}</main>
              </AuthProvider>
            </ScrollArea>
            <Toaster richColors position='bottom-right' />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
