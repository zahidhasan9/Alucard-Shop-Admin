'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function withAuth(WrappedComponent) {
  return function ProtectedComponent(props) {
    const { isAuthenticated } = useSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/authentication/sign-in/');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Optional: return loading spinner
    }

    return <WrappedComponent {...props} />;
  };
}
