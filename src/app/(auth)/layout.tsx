import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authenticating',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className='py-16'>{children}</section>;
}
