import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from '@clerk/nextjs';
const Navbar = () => {
  return (
    <nav className='flex justify-between px-5 py-5'>
      <div>
        <Link href='/'>
          <Image
            height={150}
            width={150}
            src={'/images/skill_link_logo.svg'}
            alt='logo'
          />
        </Link>
      </div>
      <div className='flex gap-5 items-center'>
        <Link className='text-sm' href='/our-story'>
          Our Story
        </Link>
        <Link className='text-sm' href='/membership'>
          Membership
        </Link>
        <SignedOut>
          <SignInButton>
            <Button className='bg-primaryColor'>Get Started</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <SignOutButton>
            <UserButton />
          </SignOutButton>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
