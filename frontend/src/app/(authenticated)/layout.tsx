'use client';

import { Toaster } from '@/components/ui/toaster';
import { ApolloWrapper } from '@/lib/apollo-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
    }
  }, [router]);

  return (
    <ApolloWrapper>
      {children}
      <Toaster />
    </ApolloWrapper>
  )
}
