'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const OurStoryPage = () => {
  const router = useRouter();

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8'>
      {/* Story Header Section */}
      <Card className='max-w-3xl w-full shadow-lg bg-white rounded-lg mb-12'>
        <CardHeader className='px-6 py-4'>
          <CardTitle className='text-3xl font-semibold text-gray-900'>
            Our Story
          </CardTitle>
        </CardHeader>
        <CardContent className='px-6 py-4'>
          <p className='text-lg text-gray-700'>
            We started with a simple mission: to change the way people interact
            with technology. What began as a small idea has now grown into a
            passionate community of individuals who are dedicated to making a
            difference in the world.
          </p>
        </CardContent>
      </Card>

      {/* Mission Section */}
      <section className='max-w-3xl w-full mb-12 px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
          Our Mission
        </h2>
        <p className='text-lg text-gray-700'>
          Our mission is to create innovative, user-centered solutions that
          empower individuals and businesses to thrive in a digital-first world.
          We believe in making technology accessible and impactful for everyone,
          regardless of their background or experience.
        </p>
      </section>

      {/* Values Section */}
      <section className='max-w-3xl w-full mb-12 px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
          Our Values
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div className='bg-white shadow-sm p-6 rounded-lg'>
            <h3 className='text-xl font-semibold text-gray-800'>Integrity</h3>
            <p className='text-gray-700'>
              We operate with the highest standards of honesty and transparency
              in all aspects of our business.
            </p>
          </div>
          <div className='bg-white shadow-sm p-6 rounded-lg'>
            <h3 className='text-xl font-semibold text-gray-800'>Innovation</h3>
            <p className='text-gray-700'>
              We embrace creativity and the pursuit of new ideas to solve
              challenges and build better solutions.
            </p>
          </div>
          <div className='bg-white shadow-sm p-6 rounded-lg'>
            <h3 className='text-xl font-semibold text-gray-800'>
              Collaboration
            </h3>
            <p className='text-gray-700'>
              We believe in the power of teamwork, fostering an environment
              where diverse ideas and perspectives thrive.
            </p>
          </div>
          <div className='bg-white shadow-sm p-6 rounded-lg'>
            <h3 className='text-xl font-semibold text-gray-800'>
              Customer-Centricity
            </h3>
            <p className='text-gray-700'>
              Our customers are at the heart of everything we do. We strive to
              understand their needs and exceed their expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='max-w-3xl w-full mb-12 px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
          Meet Our Team
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-white shadow-md p-6 rounded-lg text-center'>
            <Image
              src='/images/bob_dylan.jpg'
              width={300}
              height={300}
              alt='Team Member 1'
              className='w-32 h-32 object-cover rounded-full mx-auto mb-4'
            />
            <h3 className='text-lg font-semibold text-gray-800'>John Doe</h3>
            <p className='text-gray-700'>CEO & Co-Founder</p>
          </div>
          <div className='bg-white shadow-md p-6 rounded-lg text-center'>
            <Image
              src='/images/vince_carter.jpg'
              width={300}
              height={300}
              alt='Team Member 1'
              className='w-32 h-32 object-cover rounded-full mx-auto mb-4'
            />
            <h3 className='text-lg font-semibold text-gray-800'>Jane Smith</h3>
            <p className='text-gray-700'>Chief Technology Officer</p>
          </div>
          <div className='bg-white shadow-md p-6 rounded-lg text-center'>
            <Image
              src='/images/mr_beat.jpg'
              width={300}
              height={300}
              alt='Team Member 1'
              className='w-32 h-32 object-cover rounded-full mx-auto mb-4'
            />
            <h3 className='text-lg font-semibold text-gray-800'>
              Alex Johnson
            </h3>
            <p className='text-gray-700'>Head of Marketing</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='max-w-3xl w-full px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
          Join Us in Our Mission
        </h2>
        <p className='text-lg text-gray-700 mb-4'>
          If you're passionate about technology, innovation, and making a
          positive impact, we'd love to have you on our team. Reach out to learn
          more about opportunities to collaborate with us.
        </p>
        <Button
          variant='solid'
          className='w-full sm:w-auto'
          onClick={() => router.push('/contact')}>
          Get In Touch
        </Button>
      </section>
    </div>
  );
};

export default OurStoryPage;
