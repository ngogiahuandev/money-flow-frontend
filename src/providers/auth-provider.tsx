'use client';

import { LoadingScreen } from '@/components/shared/loading-screen';
import { useAuthStore } from '@/stores';
import { useEffect, useState } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const rehydrateAuth = async () => {
      await useAuthStore.persist.rehydrate();
      setIsLoading(false);
    };

    rehydrateAuth();
  }, []);

  if (isLoading) {
    return <LoadingScreen message='Loading user...' />;
  }

  return <>{children}</>;
}
