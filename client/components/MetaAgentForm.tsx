// import React, { useState } from 'react';

// type MetaAgentFormProps = {
//   onPreview: (data: Record<string, string>) => void;
// };

// const MetaAgentForm: React.FC<MetaAgentFormProps> = ({ onPreview }) => {
//   const [form, setForm] = useState({
//     taskName: '',
//     description: '',
//     department: '',
//     trigger: '',
//     action: '',
//     escalation: '',
//     priority: 'Medium',
//     recurrence: 'One-time',
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onPreview(form);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="relative bg-black/60 p-6 rounded-2xl w-full max-w-xl shadow-lg ring-1 ring-white/10 backdrop-blur-lg transition-all duration-300 hover:shadow-2xl"
//     >
//       {/* Glass overlay */}
//       <div className="absolute inset-0 rounded-2xl bg-white/5 pointer-events-none z-0" />

//       <h2 className="text-2xl font-semibold text-center text-white mb-4 relative z-10">
//         Agent <span style={{ color: 'oklch(76.8% 0.233 130.85)' }}>X</span>
//       </h2>

//       {[
//         { name: 'taskName', type: 'text', placeholder: 'Task Name' },
//         { name: 'description', type: 'textarea', placeholder: 'What should this task do?', rows: 3 },
//         { name: 'department', type: 'text', placeholder: 'Target Department' },
//         { name: 'trigger', type: 'text', placeholder: 'Trigger Condition' },
//         { name: 'action', type: 'text', placeholder: 'Action' },
//         { name: 'escalation', type: 'text', placeholder: 'Escalation Logic' },
//       ].map((field) => (
//         <div key={field.name} className="mb-3 relative z-10">
//           {field.type === 'textarea' ? (
//             <textarea
//               name={field.name}
//               placeholder={field.placeholder}
//               value={(form as any)[field.name]}
//               onChange={handleChange}
//               rows={field.rows}
//               className="w-full p-2 rounded-md bg-black/70 border border-white/10 text-white placeholder-gray-400 backdrop-blur-md"
//             />
//           ) : (
//             <input
//               name={field.name}
//               type="text"
//               placeholder={field.placeholder}
//               value={(form as any)[field.name]}
//               onChange={handleChange}
//               className="w-full p-2 rounded-md bg-black/70 border border-white/10 text-white placeholder-gray-400 backdrop-blur-md"
//             />
//           )}
//         </div>
//       ))}

//       <div className="flex gap-4 mt-4 relative z-10">
//         <div className="flex-1">
//           <label className="block mb-1 text-sm text-gray-300">Priority</label>
//           <select
//             name="priority"
//             value={form.priority}
//             onChange={handleChange}
//             className="w-full p-2 rounded-md bg-black/70 border border-white/10 text-white backdrop-blur-md"
//           >
//             <option>Low</option>
//             <option>Medium</option>
//             <option>High</option>
//           </select>
//         </div>

//         <div className="flex-1">
//           <label className="block mb-1 text-sm text-gray-300">Recurrence</label>
//           <select
//             name="recurrence"
//             value={form.recurrence}
//             onChange={handleChange}
//             className="w-full p-2 rounded-md bg-black/70 border border-white/10 text-white backdrop-blur-md"
//           >
//             <option>One-time</option>
//             <option>Daily</option>
//             <option>Weekly</option>
//           </select>
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="mt-6 w-full px-4 py-2 font-semibold rounded-md transition duration-200 text-black backdrop-blur-md"
//         style={{
//           backgroundColor: 'oklch(76.8% 0.233 130.85)',
//         }}
//       >
//         Generate Workflow
//       </button>
//     </form>
//   );
// };

// export default MetaAgentForm;
'use client'
import { useState } from 'react'
import type React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { WorkflowData } from '@/app/dashboard/form/page'

type MetaAgentFormProps = {
  onPreview: (data: WorkflowData) => void
}

const MetaAgentForm: React.FC<MetaAgentFormProps> = ({ onPreview }) => {
  const [form, setForm] = useState({
    taskName: '',
    description: '',
    department: '',
    trigger: '',
    action: '',
    escalation: '',
    priority: 'Medium',
    recurrence: 'One-time',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const workflowData: WorkflowData = {
      ...form,
    }
    onPreview(workflowData)
  }

  return (
    <div className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Agent <span style={{ color: 'oklch(76.8% 0.233 130.85)' }}>X</span>
        </h2>
        <p className="text-gray-400 text-lg">Create Workflow Automation</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Task Name (Full Width) */}
        <div>
          <label className="block text-lg font-semibold text-gray-300 mb-3">Task Name</label>
          <Input
            name="taskName"
            type="text"
            placeholder="Enter task name"
            value={form.taskName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 text-lg"
            style={{ '--tw-ring-color': 'oklch(76.8% 0.233 130.85)' } as React.CSSProperties}
          />
        </div>

        {/* Row 2: Description (Full Width) */}
        <div>
          <label className="block text-lg font-semibold text-gray-300 mb-3">Description</label>
          <Textarea
            name="description"
            placeholder="What should this task do?"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 text-lg resize-none"
          />
        </div>

        {/* Row 3: Department and Trigger (Side by Side) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-3">Target Department</label>
            <Input
              name="department"
              type="text"
              placeholder="Enter target department"
              value={form.department}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 text-lg"
              style={{ '--tw-ring-color': 'oklch(76.8% 0.233 130.85)' } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-3">Trigger Condition</label>
            <Input
              name="trigger"
              type="text"
              placeholder="Enter trigger condition"
              value={form.trigger}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 text-lg"
              style={{ '--tw-ring-color': 'oklch(76.8% 0.233 130.85)' } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Row 4: Action and Escalation (Side by Side) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-3">Action</label>
            <Input
              name="action"
              type="text"
              placeholder="Enter action"
              value={form.action}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 text-lg"
              style={{ '--tw-ring-color': 'oklch(76.8% 0.233 130.85)' } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-3">Escalation Logic</label>
            <Input
              name="escalation"
              type="text"
              placeholder="Enter escalation logic"
              value={form.escalation}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 text-lg"
              style={{ '--tw-ring-color': 'oklch(76.8% 0.233 130.85)' } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Row 5: Priority and Recurrence (Side by Side) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-3">Priority Level</label>
            <Select value={form.priority} onValueChange={(value) => handleSelectChange('priority', value)}>
              <SelectTrigger className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white rounded-xl text-lg h-auto">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 border-neutral-700 rounded-xl">
                <SelectItem value="Low" className="text-white hover:bg-neutral-700 py-3 text-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Low Priority
                  </div>
                </SelectItem>
                <SelectItem value="Medium" className="text-white hover:bg-neutral-700 py-3 text-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    Medium Priority
                  </div>
                </SelectItem>
                <SelectItem value="High" className="text-white hover:bg-neutral-700 py-3 text-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    High Priority
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-300 mb-3">Recurrence</label>
            <Select value={form.recurrence} onValueChange={(value) => handleSelectChange('recurrence', value)}>
              <SelectTrigger className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white rounded-xl text-lg h-auto">
                <SelectValue placeholder="Select recurrence" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 border-neutral-700 rounded-xl">
                <SelectItem value="One-time" className="text-white hover:bg-neutral-700 py-3 text-lg">
                  ⚡ One-time
                </SelectItem>
                <SelectItem value="Daily" className="text-white hover:bg-neutral-700 py-3 text-lg">
                  📅 Daily
                </SelectItem>
                <SelectItem value="Weekly" className="text-white hover:bg-neutral-700 py-3 text-lg">
                  📆 Weekly
                </SelectItem>
                <SelectItem value="Monthly" className="text-white hover:bg-neutral-700 py-3 text-lg">
                  🗓️ Monthly
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-4 text-lg font-bold text-black transition-all duration-200 hover:scale-[1.02] rounded-xl mt-8"
          style={{ backgroundColor: 'oklch(76.8% 0.233 130.85)' }}
        >
          Generate Workflow
        </Button>
      </form>
    </div>
  )
}

export default MetaAgentForm
