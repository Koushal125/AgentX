// // 'use client';
// // import React from 'react';

// // type SidebarProps = {
// //   chats: string[];
// // };

// // const Sidebar: React.FC<SidebarProps> = ({ chats }) => {
// //   return (
// //     <aside className="fixed left-0 top-0 h-screen w-64 bg-black/70 border-r border-gray-800 backdrop-blur-md z-40 p-4 flex flex-col">
// //       <h2 className="text-white text-xl font-semibold mb-4">Recent Workflows</h2>
// //       <ul className="flex-1 overflow-y-auto space-y-2">
// //         {chats.slice(-10).reverse().map((chat, index) => (
// //           <li
// //             key={index}
// //             className="truncate text-center font-medium p-1 text-gray-300 bg-lime-700 rounded rounded-l hover:text-white cursor-pointer text-sm"
// //           >
// //             {chat}
// //           </li>
// //         ))}
// //       </ul>
// //     </aside>
// //   );
// // };

// // export default Sidebar;
// 'use client';
// import React from 'react';

// type SidebarProps = {
//   chats: string[];
//   onDelete: (index: number) => void;
// };

// const Sidebar: React.FC<SidebarProps> = ({ chats, onDelete }) => {
//   return (
//     <aside className="fixed left-1 ml-3 mt-3 top-0 h-178 w-64 bg-black/70 border border-gray-800 backdrop-blur-md z-40 p-4 flex flex-col rounded rounded-2xl shadow-xl">
//       <h2 className="text-white text-xl font-semibold mb-4">Recent Workflows<span className='text-lime-500'>.</span></h2>
//       <hr className='py-3 text-gray-400'></hr>
//       <ul className="flex-1 overflow-y-auto space-y-2">
//         {chats.slice(-10).reverse().map((chat, idx) => {
//           const originalIndex = chats.length - 1 - idx;
//           return (
//             <li
//               key={originalIndex}
//               className="group relative truncate text-center font-medium p-2 text-black bg-[oklch(76.8%_0.233_130.85)]/80 rounded-l hover:text-white cursor-pointer text-sm transition-colors duration-200"
//             >
//               {chat}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onDelete(originalIndex);
//                 }}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded hidden group-hover:block transition-all"
//               >
//                 Delete
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;
"use client"
import { TrashIcon, ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import type React from "react"

type WorkflowStatus = "pending" | "approved" | "rejected"

interface WorkflowItem {
  name: string
  status: WorkflowStatus
  createdAt: string
}

type SidebarProps = {
  chats: WorkflowItem[]
  onDelete: (index: number) => void
}

const Sidebar: React.FC<SidebarProps> = ({ chats, onDelete }) => {
  const getWorkflowIcon = (name: string) => {
    if (name.toLowerCase().includes("hr") || name.toLowerCase().includes("onboard")) return "👥"
    if (name.toLowerCase().includes("email") || name.toLowerCase().includes("notification")) return "📧"
    if (name.toLowerCase().includes("approval") || name.toLowerCase().includes("review")) return "✅"
    if (name.toLowerCase().includes("reminder") || name.toLowerCase().includes("alert")) return "⏰"
    if (name.toLowerCase().includes("report") || name.toLowerCase().includes("analytics")) return "📊"
    return "⚡"
  }

  const getStatusIcon = (status: WorkflowStatus) => {
    switch (status) {
      case "approved":
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />
      case "rejected":
        return <TrashIcon className="w-4 h-4 text-red-500" />
      case "pending":
      default:
        return <ClockIcon className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: WorkflowStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      case "pending":
      default:
        return "bg-yellow-500"
    }
  }

  const getStatusText = (status: WorkflowStatus) => {
    switch (status) {
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      case "pending":
      default:
        return "Pending"
    }
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-neutral-900/95 backdrop-blur-md border-r border-neutral-800 p-6 flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Recent Workflows
          <span style={{ color: "oklch(76.8% 0.233 130.85)" }}>.</span>
        </h2>
        <div className="h-px bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800 mt-3"></div>
      </div>

      <div className="flex-1 overflow-hidden">
        {chats.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">
            <div className="text-6xl mb-4 opacity-50">📋</div>
            <p className="text-lg font-medium">No workflows yet</p>
            <p className="text-sm text-gray-600 mt-2">Create your first workflow to get started</p>
          </div>
        ) : (
          <ul className="space-y-3 overflow-y-auto h-full custom-scrollbar pr-2">
            {chats
              .slice(-10)
              .reverse()
              .map((chat, idx) => {
                const originalIndex = chats.length - 1 - idx
                return (
                  <li
                    key={originalIndex}
                    className="group relative bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-600 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-start gap-3">
                      {/* Workflow Icon */}
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                        style={{ backgroundColor: "oklch(76.8% 0.233 130.85)" }}
                      >
                        {getWorkflowIcon(chat.name)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-semibold text-sm truncate pr-2">{chat.name}</h3>
                          <span className={`w-2 h-2 rounded-full ${getStatusColor(chat.status)}`}></span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            {getStatusIcon(chat.status)}
                            <span>{chat.createdAt}</span>
                          </div>
                          <span className="text-xs font-medium">{getStatusText(chat.status)}</span>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete(originalIndex)
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                        title="Delete workflow"
                      >
                        <TrashIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </li>
                )
              })}
          </ul>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
