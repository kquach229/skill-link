'use client';
import { useAuth, useUser } from '@clerk/nextjs';

export const useAuthentication = () => {
  const { isSignedIn } = useAuth();
  const { user: clerkUserObj } = useUser();
  return {
    isSignedIn,
    clerkUserObj,
  };
};
