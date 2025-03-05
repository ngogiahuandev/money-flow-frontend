'use client';

import { AuthApi } from '@/api/auth';
import { LoadingScreen } from '@/components/shared/loading-screen';
import { useAuthStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, setUser } = useAuthStore();

  useEffect(() => {
    const rehydrateAuth = async () => {
      await useAuthStore.persist.rehydrate();
      AuthApi.me()
        .then(data => {
          setUser(data);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    rehydrateAuth();
  }, []);

  if (isLoading) {
    return <LoadingScreen message='Loading user...' />;
  }

  return <>{children}</>;
}
