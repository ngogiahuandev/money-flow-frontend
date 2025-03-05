'use client';

import React from 'react';
import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';

export default function QueryClientProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();
  return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>;
}
