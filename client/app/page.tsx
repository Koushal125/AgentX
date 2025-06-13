// 'use client';

// import React, { useState } from 'react';
// import MetaAgentForm from '@/components/MetaAgentForm';
// import WorkflowPreview from '@/components/WorkflowPreview';

// export default function Page() {
//   const [workflowData, setWorkflowData] = useState<Record<string, string> | null>(null);

//   const handlePreview = async (formData: Record<string, string>) => {

//     setTimeout(() => {
//       setWorkflowData(formData);
//     }, 500);

//   };

//   const handleApprove = () => {
//     alert('Workflow Approved!');
//     setWorkflowData(null);
//   };

//   const handleReject = () => {
//     alert('Workflow Rejected.');
//     setWorkflowData(null);
//   };

//   return (
//     <div className="min-h-screen bg-neutral-800 text-white p-10 flex flex-col lg:flex-row gap-6 justify-center items-start">
//       <MetaAgentForm onPreview={handlePreview} />
//       {workflowData && (
//         <WorkflowPreview
//           data={workflowData}
//           onApprove={handleApprove}
//           onReject={handleReject}
//         />
//       )}
//     </div>
//   );
// }
'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MetaAgentForm from '@/components/MetaAgentForm';
import WorkflowPreview from '@/components/WorkflowPreview';
import ProfileIcon from '@/components/ProfileIcon';

export default function HomePage() {
  const [formData, setFormData] = useState<Record<string, string> | null>(null);
  const [recentChats, setRecentChats] = useState<string[]>([]);

  const handlePreview = (data: Record<string, string>) => {
    setFormData(data);
    setRecentChats((prev) => [...prev, data.taskName || 'Untitled Task']);
  };

  const handleApprove = () => {
    alert('Approved');
  };

  const handleReject = () => {
    alert('Rejected');
    setFormData(null);
  };

  return (
    <div className="bg-black min-h-screen text-white pl-64 relative">
      <Sidebar chats={recentChats} />
      <ProfileIcon />
      <main className="p-6 flex gap-6 justify-center items-start">
        <MetaAgentForm onPreview={handlePreview} />
        {formData && (
          <WorkflowPreview
            data={formData}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </main>
    </div>
  );
}
