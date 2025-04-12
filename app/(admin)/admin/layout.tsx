'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        
        if (!data.authenticated && pathname !== '/admin/login') {
          router.push('/admin/login');
        } else {
          setIsAuthenticated(data.authenticated);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Don't apply layout for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // The useEffect will redirect to login
  }

  // Admin has been authenticated, show the layout
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className="flex justify-between items-center py-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/">View Site</Link>
          </Button>
          <Button 
            variant="destructive" 
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              router.push('/admin/login');
            }}
          >
            Logout
          </Button>
        </div>
      </header>

      <Tabs defaultValue="projects" className="mt-6">
        <TabsList className="mb-8">
          <TabsTrigger 
            value="projects" 
            asChild
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Link href="/admin/dashboard">Projects</Link>
          </TabsTrigger>
          <TabsTrigger 
            value="testimonials" 
            asChild
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Link href="/admin/dashboard/testimonials">Testimonials</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <main className="mt-6 pb-16">{children}</main>
    </div>
  );
} 