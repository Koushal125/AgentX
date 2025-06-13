// import React from 'react';

// type Props = {
//   data: Record<string, string>;
//   onApprove: () => void;
//   onReject: () => void;
// };

// const WorkflowPreview: React.FC<Props> = ({ data, onApprove, onReject }) => {
//   return (
//     <div className="relative w-full max-w-xl p-6 rounded-2xl shadow-xl border border-white/10 bg-gradient-to-br from-gray-700/40 to-gray-900/30 backdrop-blur-md ring-1 ring-white/10 transition-all duration-300 hover:shadow-2xl">
//       {/* Optional gloss layer */}
//       <div className="absolute inset-0 rounded-2xl bg-white/5 pointer-events-none" />

//       <h2 className="text-2xl font-semibold mb-4 text-white text-center z-10 relative">Workflow Preview</h2>

//       <ul className="space-y-3 text-sm text-gray-300 z-10 relative">
//         {Object.entries(data).map(([key, value]) => (
//           <li key={key}>
//             <span className="font-medium text-gray-400 capitalize">
//               {key.replace(/([A-Z])/g, ' $1')}:
//             </span>{' '}
//             <span className="text-white">{value}</span>
//           </li>
//         ))}
//       </ul>

//       <div className="mt-6 flex gap-4 z-10 relative">
//         <button
//           onClick={onApprove}
//           className="bg-green-500/80 hover:bg-green-600 text-white px-4 py-2 rounded-md w-full transition duration-200 font-bold backdrop-blur-sm"
//         >
//           Approve
//         </button>
//         <button
//           onClick={onReject}
//           className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-md w-full transition duration-200 font-bold backdrop-blur-sm"
//         >
//           Reject
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WorkflowPreview;
import React from 'react';

type Props = {
  data: Record<string, string>;
  onApprove: () => void;
  onReject: () => void;
};

const WorkflowPreview: React.FC<Props> = ({ data, onApprove, onReject }) => {
  return (
    <div className="relative w-full max-w-xl p-6 rounded-2xl shadow-xl border border-white/10 bg-black/60 backdrop-blur-lg ring-1 ring-white/10 transition-all duration-300 hover:shadow-2xl">
      {/* Glass gloss overlay */}
      <div className="absolute inset-0 rounded-2xl bg-white/5 pointer-events-none" />

      <h2 className="text-2xl font-semibold mb-4 text-white text-center relative z-10">
        Workflow Preview
      </h2>

      <ul className="space-y-3 text-sm text-gray-300 relative z-10">
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <span className="font-medium text-gray-400 capitalize">
              {key.replace(/([A-Z])/g, ' $1')}:
            </span>{' '}
            <span className="text-white">{value}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-4 relative z-10">
        <button
          onClick={onApprove}
          className="px-4 py-2 w-full rounded-md transition duration-200 backdrop-blur-sm text-black font-semibold"
          style={{
            backgroundColor: 'oklch(76.8% 0.233 130.85)',
          }}
        >
          Approve
        </button>
        <button
          onClick={onReject}
          className="px-4 py-2 w-full rounded-md transition duration-200 backdrop-blur-sm text-white border border-white/30 hover:bg-white/10"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default WorkflowPreview;
