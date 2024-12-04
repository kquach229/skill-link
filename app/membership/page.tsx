'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { SignInButton, useAuth } from '@clerk/nextjs';

interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: string;
}

const MembershipPage = () => {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { sessionId } = useAuth();

  // Fetching membership plans from the API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/plans');
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch membership plans');
        }
        const data = await response.json();
        console.log(data);
        setPlans(data);
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError('Unable to load membership plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <p className='text-center text-gray-500'>Loading membership plans...</p>
    );
  }

  if (error) {
    return <p className='text-center text-red-500'>{error}</p>;
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8'>
      <Card className='max-w-3xl w-full shadow-lg bg-white rounded-lg'>
        <CardHeader className='px-6 py-4'>
          <CardTitle className='text-2xl font-semibold text-gray-900'>
            Membership Plans
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6 px-6 py-4'>
          <h3 className='text-xl font-medium text-gray-700'>
            Choose the best plan for you
          </h3>

          {/* List of Membership Plans */}
          <div className='space-y-4'>
            {plans.map((plan) => (
              <div
                key={plan.id}
                className='flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-lg transition duration-200'>
                <div className='flex flex-col text-center sm:text-left'>
                  <h4 className='text-2xl font-semibold text-gray-800'>
                    {plan.name}
                  </h4>
                  <p className='text-gray-600'>{plan.description}</p>
                </div>
                <div className='mt-4 sm:mt-0 text-center sm:text-right'>
                  <p className='text-lg font-semibold text-gray-900'>
                    ${plan.price}
                  </p>
                  {!sessionId ? (
                    <SignInButton mode='modal'>
                      <Button
                        variant='outline'
                        className='mt-2 w-full sm:w-auto'>
                        Sign Up
                      </Button>
                    </SignInButton>
                  ) : (
                    <Button
                      variant='outline'
                      className='mt-2 w-full sm:w-auto'
                      onClick={() => router.push(`/membership/${plan.name}`)}>
                      Join Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className='flex justify-center mt-6 gap-4'>
            <Button
              variant='outline'
              className='w-full sm:w-auto'
              onClick={() => router.back()}>
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MembershipPage;
