import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import AuthenMenu from '@/components/shared/authen-menu';

type MenuItem = {
  title: string;
  href: string;
  description?: string;
  children?: {
    title: string;
    href: string;
    description: string;
  }[];
};

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    description: 'View your financial dashboard',
  },
  {
    title: 'Transactions',
    href: '/transactions',
    description: 'Manage your transactions',
    children: [
      {
        title: 'All Transactions',
        href: '/transactions',
        description: 'View all your financial transactions',
      },
      {
        title: 'Add Transaction',
        href: '/transactions/new',
        description: 'Add a new transaction',
      },
    ],
  },
  {
    title: 'Reports',
    href: '/reports',
    description: 'View financial reports',
  },
];

export function Header() {
  return (
    <header className='fixed top-0 right-0 left-0 z-50 border-b bg-transparent backdrop-blur-sm'>
      <div className='mx-auto flex h-16 max-w-[1200px] items-center justify-between'>
        <div className='flex items-center gap-8'>
          <Link href='/' className='text-xl font-bold'>
            MoneyFlow
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map(item => (
                <NavigationMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2'>
                          {item.children.map(child => (
                            <Link key={child.href} href={child.href} legacyBehavior passHref>
                              <NavigationMenuLink className='block space-y-1 p-3 leading-none'>
                                <div className='font-base text-sm leading-none'>{child.title}</div>
                                <p className='text-muted-foreground line-clamp-2 text-sm'>
                                  {child.description}
                                </p>
                              </NavigationMenuLink>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className='p-2'>{item.title}</NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className='flex items-center gap-4'>
          <ThemeToggle />
          <AuthenMenu />
        </div>
      </div>
    </header>
  );
}
