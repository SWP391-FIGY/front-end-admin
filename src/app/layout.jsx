'use client';

import React from 'react';

import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';

import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import PageLayout from '@/layout/pageLayout';
import AuthProvider from '@/providers/authProvider';

import './globals.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'tippy.js/dist/tippy.css';

const queryClient = new QueryClient();
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isMounted, setIsMounted] = React.useState(false);
  const path = usePathname();

  // this is to prevent the server and hydrate warning but don't use it for any project
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const ignoreLayoutPaths = ['/auth/login', '/'];

  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${inter.className} some-class-name`}>
          <QueryClientProvider client={queryClient}>
            {isMounted && <>{ignoreLayoutPaths.includes(path) ? <>{children}</> : <PageLayout>{children}</PageLayout>}</>}
          </QueryClientProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
