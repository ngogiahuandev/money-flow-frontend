import LoginForm from '@/app/(auth)/login/_components/login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function Page() {
  return (
    <div className=''>
      <Card className='mx-auto max-w-xl border-none bg-transparent shadow-none backdrop-blur-sm'>
        <CardHeader>
          <CardTitle className='text-4xl'>Login</CardTitle>
          <CardDescription>Fill in your details to login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className='text-sm'>
            <span className='text-muted-foreground'>Don't have an account? </span>
            <Link href='/register' className='text-blue-500 hover:underline'>
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
