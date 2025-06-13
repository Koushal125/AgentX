// 'use client';
// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from 'recharts';

// const dummyUser = {
//   name: 'Harsha Kamakshigari',
//   role: 'AI Agent Developer',
//   email: 'harsha@gmail.com',
//   avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Harsha',
// };

// const dummyWorkflows = [
//   'HR Onboarding Reminder',
//   'Weekly Infra Check Automation',
//   'Client Approval Notifier',
//   'Leave Escalation Workflow',
//   'Invoice Reminder Trigger',
// ];

// const agentStats = [
//   { name: 'Agent X', active: 5 },
//   { name: 'MetaBot', active: 3 },
//   { name: 'AutoFormBot', active: 6 },
//   { name: 'ReviewAgent', active: 2 },
//   { name: 'OnboardX', active: 4 },
// ];

// const ProfilePage = () => {
//   return (
//     <main className="min-h-screen bg-black text-white p-8 space-y-12">
//       {/* Profile Header */}
//       <div className="w-full bg-black/60 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl flex items-center gap-6">
//         <img
//           src={dummyUser.avatar}
//           alt="avatar"
//           className="w-24 h-24 rounded-full border-4 border-[oklch(76.8%_0.233_130.85)]"
//         />
//         <div>
//           <h2 className="text-3xl font-bold">{dummyUser.name}</h2>
//           <p className="text-[oklch(76.8%_0.233_130.85)]">{dummyUser.role}</p>
//           <p className="text-gray-400 text-sm">{dummyUser.email}</p>
//         </div>
//       </div>

//       {/* Workflows Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Recent Workflows */}
//         <div className="w-full bg-black/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 shadow-lg">
//           <h3 className="text-xl font-semibold mb-4">Recent Workflows</h3>
//           <ul className="space-y-3">
//             {dummyWorkflows.map((workflow, idx) => (
//               <li
//                 key={idx}
//                 className="bg-[oklch(76.8%_0.233_130.85)]/80 hover:bg-[oklch(76.8%_0.233_130.85)] text-black font-medium px-4 py-2 rounded-lg transition"
//               >
//                 {workflow}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Active Agent Chart */}
//         <div className="w-full bg-black/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 shadow-lg">
//           <h3 className="text-xl font-semibold mb-4">Active Agent Stats</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={agentStats} margin={{ top: 10, right: 20, bottom: 10, left: -20 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//               <XAxis dataKey="name" stroke="#ccc" />
//               <YAxis stroke="#ccc" />
//               <Tooltip />
//               <Bar dataKey="active" fill="oklch(70% 0.233 130.85)" 
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ProfilePage;
