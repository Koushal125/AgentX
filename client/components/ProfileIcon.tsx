// 'use client';
// import React from 'react';
// import Link from 'next/link';
// import { UserCircleIcon } from '@heroicons/react/24/solid';

// const ProfileIcon = () => {
//   return (
//     <Link href="/Profile">
//       <div className="fixed top-4 right-4 z-50 hover:scale-105 transition-transform cursor-pointer">
//         <UserCircleIcon className="h-9 w-9 text-white/80 hover:text-white" />
//       </div>
//     </Link>
//   );
// };

// export default ProfileIcon;

"use client"
import Link from "next/link"
import { UserCircleIcon } from "@heroicons/react/24/outline"

const ProfileIcon = () => {
  return (
    <Link href="/Profile">
      <div className="fixed top-6 right-6 z-50 p-3 bg-neutral-900/80 backdrop-blur-lg border border-neutral-800 rounded-full hover:scale-110 hover:bg-neutral-800 transition-all duration-200 cursor-pointer shadow-lg">
        <UserCircleIcon className="h-6 w-6 text-white/80 hover:text-white" />
      </div>
    </Link>
  )
}

export default ProfileIcon
