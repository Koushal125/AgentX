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
//       className="bg-neutral-800 p-6 rounded-2xl space-y-4 w-full max-w-xl"
//     >
//       <h2 className="text-2xl font-semibold text-center text-white">Agent <span className='text-lime-500'>X</span></h2>

//       <input
//         name="taskName"
//         type="text"
//         placeholder="Task Name"
//         value={form.taskName}
//         onChange={handleChange}
//         className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
//       />

//       <textarea
//         name="description"
//         placeholder="What should this task do?"
//         value={form.description}
//         onChange={handleChange}
//         rows={3}
//         className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
//       />

//       <input
//         name="department"
//         type="text"
//         placeholder="Target Department"
//         value={form.department}
//         onChange={handleChange}
//         className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
//       />

//       <input
//         name="trigger"
//         type="text"
//         placeholder="Trigger Condition"
//         value={form.trigger}
//         onChange={handleChange}
//         className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
//       />

//       <input
//         name="action"
//         type="text"
//         placeholder="Action"
//         value={form.action}
//         onChange={handleChange}
//         className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
//       />

//       <input
//         name="escalation"
//         type="text"
//         placeholder="Escalation Logic"
//         value={form.escalation}
//         onChange={handleChange}
//         className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
//       />

//       <div className="flex gap-4">
//         <div className="flex-1">
//           <label className="block mb-1 text-sm text-gray-300">Priority</label>
//           <select
//             name="priority"
//             value={form.priority}
//             onChange={handleChange}
//             className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
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
//             className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
//           >
//             <option>One-time</option>
//             <option>Daily</option>
//             <option>Weekly</option>
//           </select>
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
//       >
//         Generate Workflow
//       </button>
//     </form>
//   );
// };

// export default MetaAgentForm;
import React, { useState } from 'react';

type MetaAgentFormProps = {
  onPreview: (data: Record<string, string>) => void;
};

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
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPreview(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-black/60 p-6 rounded-2xl w-full max-w-xl shadow-lg ring-1 ring-white/10 backdrop-blur-lg transition-all duration-300 hover:shadow-2xl"
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 rounded-2xl bg-white/5 pointer-events-none z-0" />

      <h2 className="text-2xl font-semibold text-center text-white mb-4 relative z-10">
        Agent <span style={{ color: 'oklch(76.8% 0.233 130.85)' }}>X</span>
      </h2>

      {[
        { name: 'taskName', type: 'text', placeholder: 'Task Name' },
        { name: 'description', type: 'textarea', placeholder: 'What should this task do?', rows: 3 },
        { name: 'department', type: 'text', placeholder: 'Target Department' },
        { name: 'trigger', type: 'text', placeholder: 'Trigger Condition' },
        { name: 'action', type: 'text', placeholder: 'Action' },
        { name: 'escalation', type: 'text', placeholder: 'Escalation Logic' },
      ].map((field) => (
        <div key={field.name} className="mb-3 relative z-10">
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              placeholder={field.placeholder}
              value={(form as any)[field.name]}
              onChange={handleChange}
              rows={field.rows}
              className="w-full p-2 rounded-md bg-black/70 border border-white/10 text-white placeholder-gray-400 backdrop-blur-md"
            />
          ) : (
            <input
              name={field.name}
              type="text"
              placeholder={field.placeholder}
              value={(form as any)[field.name]}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-black/70 border border-white/10 text-white placeholder-gray-400 backdrop-blur-md"
            />
          )}
        </div>
      ))}

      <div className="flex gap-4 mt-4 relative z-10">
        <div className="flex-1">
          <label className="block mb-1 text-sm text-gray-300">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-black/70 border border-white/10 text-white backdrop-blur-md"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block mb-1 text-sm text-gray-300">Recurrence</label>
          <select
            name="recurrence"
            value={form.recurrence}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-black/70 border border-white/10 text-white backdrop-blur-md"
          >
            <option>One-time</option>
            <option>Daily</option>
            <option>Weekly</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full px-4 py-2 font-semibold rounded-md transition duration-200 text-black backdrop-blur-md"
        style={{
          backgroundColor: 'oklch(76.8% 0.233 130.85)',
        }}
      >
        Generate Workflow
      </button>
    </form>
  );
};

export default MetaAgentForm;
