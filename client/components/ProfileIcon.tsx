'use client';
import React from 'react';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const ProfileIcon = () => {
  return (
    <Link href="/Profile">
      <div className="fixed top-4 right-4 z-50 hover:scale-105 transition-transform cursor-pointer">
        <UserCircleIcon className="h-9 w-9 text-white/80 hover:text-white" />
      </div>
    </Link>
  );
};

export default ProfileIcon;

