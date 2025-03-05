import AuthenticatedGuard from '@/guard/authenticated-guard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'MoneyFlow Dashboard',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className='pt-8'>
      <AuthenticatedGuard>{children}</AuthenticatedGuard>
    </section>
  );
}
