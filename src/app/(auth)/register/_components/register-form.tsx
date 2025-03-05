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
import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '@/api/auth';
import { useAuthStore } from '@/stores';
import { toast } from 'sonner';
import { LoginResponse } from '@/types';
import { useRouter } from 'next/navigation';

const schema = z
  .object({
    email: z.string().email(),
    username: z
      .string()
      .min(3)
      .regex(/^[a-zA-Z0-9]+$/, {
        message:
          'Username can only contain letters and numbers, no spaces or special characters allowed',
      }),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function RegisterForm() {
  const { login } = useAuthStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: AuthApi.register,
    onSuccess: data => {
      toast.success('Account created successfully');
      login(data.user, data.tokens);
      router.push('/dashboard');
    },
    onError: (error: any) => {
      if (error.response?.status === 409) {
        toast.error('Username or email already exists');
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
                <FormDescription>Enter your email address.</FormDescription>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='johndoe' {...field} disabled={mutation.isPending} />
              </FormControl>
              {form.formState.errors.username ? (
                <FormMessage />
              ) : (
                <FormDescription>Choose a username (minimum 3 characters).</FormDescription>
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
                <FormDescription>Choose a password (minimum 6 characters).</FormDescription>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder='Confirm password'
                  {...field}
                  disabled={mutation.isPending}
                />
              </FormControl>
              {form.formState.errors.confirmPassword ? (
                <FormMessage />
              ) : (
                <FormDescription>Confirm your password.</FormDescription>
              )}
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' isLoading={mutation.isPending}>
          Register
        </Button>
      </form>
    </Form>
  );
}
