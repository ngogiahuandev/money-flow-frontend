'use client';

import { ErrorScreen } from '@/components/shared/error-screen';
import { useAuthStore } from '@/stores';
import React from 'react';

export default function AuthenticatedGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <ErrorScreen message='You are not authenticated' />;
}
