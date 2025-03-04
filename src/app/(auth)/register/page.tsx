import RegisterForm from '@/app/(auth)/register/_components/register-form';
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
          <CardTitle className='text-4xl'>Register</CardTitle>
          <CardDescription>Create a new account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <p className='text-sm'>
            <span className='text-muted-foreground'>Already have an account? </span>
            <Link href='/login' className='text-blue-500 hover:underline'>
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
