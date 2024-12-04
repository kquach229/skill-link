import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { SignedOut, SignInButton } from '@clerk/nextjs';

const HeroComponent = () => {
  return (
    <div className='h-[100vh] flex flex-col justify-center items-center p-5 md:flex-row md:justify-around'>
      <div className='mb-20 gap-2 text-center md:text-left'>
        <h1 className='text-6xl font-bold text-primaryColor'>Skilllink</h1>
        <p>Share articles and exchange skills</p>

        <Button
          className='text-primaryColor w-[250px] mt-5 hover:bg-primaryColor'
          variant='outline'>
          Get Started
        </Button>
      </div>
      <div>
        <Image
          className='w-[250px] md:w-[800px]'
          src={'/images/learning.svg'}
          width={500}
          height={300}
          alt='learning'
        />
      </div>
    </div>
  );
};

export default HeroComponent;
