import { CircleAlertIcon } from 'lucide-react';
import React from 'react';

interface ErrorScreenProps {
  message: string;
}

export function ErrorScreen({ message }: ErrorScreenProps) {
  return (
    <div className='bg-background/90 fixed inset-0 flex h-screen w-screen items-center justify-center backdrop-blur-3xl'>
      <div className='text-center'>
        <CircleAlertIcon className='text-primary inline-block size-8' />
        <p className='text-foreground mt-4'>{message}</p>
      </div>
    </div>
  );
}
