'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '@/api/auth';
import { useAuthStore } from '@/stores';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginForm() {
  const { login } = useAuthStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: data => {
      login(data.user, data.tokens);
      toast.success('Login successful');
      router.push('/dashboard');
    },
    onError: (error: AxiosError<null>) => {
      if (error.response?.status === 401) {
        toast.error('Invalid Credentials');
      } else {
        toast.error('An error occurred');
      }
    },
  });

  const onSubmit = (payload: z.infer<typeof schema>) => {
    mutation.mutate(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pt-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='email@example.com' {...field} disabled={mutation.isPending} />
              </FormControl>
              {form.formState.errors.email ? (
                <FormMessage />
              ) : (
                <FormDescription>This is your email.</FormDescription>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='Password' {...field} disabled={mutation.isPending} />
              </FormControl>
              {form.formState.errors.password ? (
                <FormMessage />
              ) : (
                <FormDescription>This is your password.</FormDescription>
              )}
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' isLoading={mutation.isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
