// 'use client';
// import React from 'react';

// type SidebarProps = {
//   chats: string[];
// };

// const Sidebar: React.FC<SidebarProps> = ({ chats }) => {
//   return (
//     <aside className="fixed left-0 top-0 h-screen w-64 bg-black/70 border-r border-gray-800 backdrop-blur-md z-40 p-4 flex flex-col">
//       <h2 className="text-white text-xl font-semibold mb-4">Recent Workflows</h2>
//       <ul className="flex-1 overflow-y-auto space-y-2">
//         {chats.slice(-10).reverse().map((chat, index) => (
//           <li
//             key={index}
//             className="truncate text-center font-medium p-1 text-gray-300 bg-lime-700 rounded rounded-l hover:text-white cursor-pointer text-sm"
//           >
//             {chat}
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;
'use client';
import React from 'react';

type SidebarProps = {
  chats: string[];
  onDelete: (index: number) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ chats, onDelete }) => {
  return (
    <aside className="fixed left-1 ml-3 mt-3 top-0 h-178 w-64 bg-black/70 border border-gray-800 backdrop-blur-md z-40 p-4 flex flex-col rounded rounded-2xl shadow-xl">
      <h2 className="text-white text-xl font-semibold mb-4">Recent Workflows<span className='text-lime-500'>.</span></h2>
      <hr className='py-3 text-gray-400'></hr>
      <ul className="flex-1 overflow-y-auto space-y-2">
        {chats.slice(-10).reverse().map((chat, idx) => {
          const originalIndex = chats.length - 1 - idx;
          return (
            <li
              key={originalIndex}
              className="group relative truncate text-center font-medium p-2 text-black bg-[oklch(76.8%_0.233_130.85)]/80 rounded-l hover:text-white cursor-pointer text-sm transition-colors duration-200"
            >
              {chat}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(originalIndex);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded hidden group-hover:block transition-all"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
