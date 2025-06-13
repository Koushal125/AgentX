'use client';

import React, { useState } from 'react';
import MetaAgentForm from '@/components/MetaAgentForm';
import WorkflowPreview from '@/components/WorkflowPreview';

export default function Page() {
  const [workflowData, setWorkflowData] = useState<Record<string, string> | null>(null);

  const handlePreview = async (formData: Record<string, string>) => {

    setTimeout(() => {
      setWorkflowData(formData);
    }, 500);

  };

  const handleApprove = () => {
    alert('Workflow Approved!');
    setWorkflowData(null);
  };

  const handleReject = () => {
    alert('Workflow Rejected.');
    setWorkflowData(null);
  };

  return (
    <div className="min-h-screen bg-neutral-800 text-white p-10 flex flex-col lg:flex-row gap-6 justify-center items-start">
      <MetaAgentForm onPreview={handlePreview} />
      {workflowData && (
        <WorkflowPreview
          data={workflowData}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}
