// // import React from 'react';

// // type Props = {
// //   data: Record<string, string>;
// //   onApprove: () => void;
// //   onReject: () => void;
// // };

// // const WorkflowPreview: React.FC<Props> = ({ data, onApprove, onReject }) => {
// //   return (
// //     <div className="relative w-full max-w-xl p-6 rounded-2xl shadow-xl border border-white/10 bg-gradient-to-br from-gray-700/40 to-gray-900/30 backdrop-blur-md ring-1 ring-white/10 transition-all duration-300 hover:shadow-2xl">
// //       {/* Optional gloss layer */}
// //       <div className="absolute inset-0 rounded-2xl bg-white/5 pointer-events-none" />

// //       <h2 className="text-2xl font-semibold mb-4 text-white text-center z-10 relative">Workflow Preview</h2>

// //       <ul className="space-y-3 text-sm text-gray-300 z-10 relative">
// //         {Object.entries(data).map(([key, value]) => (
// //           <li key={key}>
// //             <span className="font-medium text-gray-400 capitalize">
// //               {key.replace(/([A-Z])/g, ' $1')}:
// //             </span>{' '}
// //             <span className="text-white">{value}</span>
// //           </li>
// //         ))}
// //       </ul>

// //       <div className="mt-6 flex gap-4 z-10 relative">
// //         <button
// //           onClick={onApprove}
// //           className="bg-green-500/80 hover:bg-green-600 text-white px-4 py-2 rounded-md w-full transition duration-200 font-bold backdrop-blur-sm"
// //         >
// //           Approve
// //         </button>
// //         <button
// //           onClick={onReject}
// //           className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-md w-full transition duration-200 font-bold backdrop-blur-sm"
// //         >
// //           Reject
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default WorkflowPreview;
// import React from 'react';

// type Props = {
//   data: Record<string, string>;
//   onApprove: () => void;
//   onReject: () => void;
// };

// const WorkflowPreview: React.FC<Props> = ({ data, onApprove, onReject }) => {
//   return (
//     <div className="relative w-full max-w-xl p-6 rounded-2xl shadow-xl border border-white/10 bg-black/60 backdrop-blur-lg ring-1 ring-white/10 transition-all duration-300 hover:shadow-2xl">
//       {/* Glass gloss overlay */}
//       <div className="absolute inset-0 rounded-2xl bg-white/5 pointer-events-none" />

//       <h2 className="text-2xl font-semibold mb-4 text-white text-center relative z-10">
//         Workflow Preview
//       </h2>

//       <ul className="space-y-3 text-sm text-gray-300 relative z-10">
//         {Object.entries(data).map(([key, value]) => (
//           <li key={key}>
//             <span className="font-medium text-gray-400 capitalize">
//               {key.replace(/([A-Z])/g, ' $1')}:
//             </span>{' '}
//             <span className="text-white">{value}</span>
//           </li>
//         ))}
//       </ul>

//       <div className="mt-6 flex gap-4 relative z-10">
//         <button
//           onClick={onApprove}
//           className="px-4 py-2 w-full rounded-md transition duration-200 backdrop-blur-sm text-black font-semibold"
//           style={{
//             backgroundColor: 'oklch(76.8% 0.233 130.85)',
//           }}
//         >
//           Approve
//         </button>
//         <button
//           onClick={onReject}
//           className="px-4 py-2 w-full rounded-md transition duration-200 backdrop-blur-sm text-white border border-white/30 hover:bg-white/10"
//         >
//           Reject
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WorkflowPreview;

"use client"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WorkflowData } from "@/app/dashboard/page"

type Props = {
  data: WorkflowData
  onApprove: () => void
  onReject: () => void
}

const WorkflowPreview: React.FC<Props> = ({ data, onApprove, onReject }) => {
  const formatKey = (key: string) => {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500 text-white"
      case "medium":
        return "bg-yellow-500 text-black"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const basicFields = {
    taskName: data.taskName,
    description: data.description,
    department: data.department,
    trigger: data.trigger,
    action: data.action,
    escalation: data.escalation,
    priority: data.priority,
    recurrence: data.recurrence,
  }

  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardHeader>
        <CardTitle className="text-3xl text-center text-white tracking-tight">Workflow Preview</CardTitle>
        <p className="text-gray-400 text-lg text-center">Review your automation workflow</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Workflow Details in Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Object.entries(basicFields).map(([key, value]) => (
            <div key={key} className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">{formatKey(key)}</span>
                {key === "priority" && (
                  <Badge className={`${getPriorityColor(value)} text-xs font-semibold px-2 py-1 rounded-full`}>
                    {value}
                  </Badge>
                )}
                {key === "recurrence" && (
                  <Badge className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">{value}</Badge>
                )}
              </div>
              <p className="text-white text-base font-medium leading-relaxed">{value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-6">
          <Button
            onClick={onApprove}
            className="flex-1 py-4 text-lg font-bold text-black transition-all duration-200 hover:scale-[1.02] rounded-xl"
            style={{ backgroundColor: "oklch(76.8% 0.233 130.85)" }}
          >
            Approve Workflow
          </Button>
          <Button
            onClick={onReject}
            variant="outline"
            className="flex-1 py-4 text-lg font-bold border-2 border-neutral-600 text-white hover:bg-neutral-800 hover:scale-[1.02] rounded-xl"
          >
            Reject Workflow
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default WorkflowPreview
