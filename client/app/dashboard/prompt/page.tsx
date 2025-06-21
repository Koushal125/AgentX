'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function PromptPage() {
  const [prompt, setPrompt] = useState('')
  const [jsonResult, setJsonResult] = useState<any>(null)

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value)
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()

    const trimmed = prompt.trim()
    if (!trimmed) {
      toast.error('Prompt cannot be empty')
      return
    }

    toast.success('Prompt submitted successfully!', {
      description: `Prompt: "${trimmed}"`,
    })

    try {
      const backend = process.env.NEXT_PUBLIC_BACKEND
      const response = await fetch(`${backend}/json-gen/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: trimmed }),
      })

      if (!response.ok) throw new Error('Failed to generate JSON')

      const data = await response.json()
      setJsonResult(data)
      setPrompt('')
    } catch (error) {
      toast.error('Failed to fetch response')
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 px-4 py-10 gap-6">
      {/* Prompt Form */}
      <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg p-10 w-full max-w-2xl text-center space-y-6">
        <h1 className="text-3xl font-bold text-white">Enter Your Prompt</h1>
        <p className="text-gray-400">Type a workflow idea or command below to get started.</p>

        <Input
          className="w-full text-lg px-6 py-5 h-16 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="e.g. Automate email follow-ups after form submission"
        />

        <Button type="submit" className="w-full py-4 text-lg font-bold text-black transition-all duration-200 hover:scale-[1.02] rounded-xl" style={{ backgroundColor: 'oklch(76.8% 0.233 130.85)' }}>
          Submit Prompt
        </Button>
      </form>

      {/* JSON Result Panel */}
      {jsonResult && (
        <div className="bg-neutral-900 border text-wrap border-neutral-700 rounded-xl shadow-lg p-6 w-full max-w-2xl text-left overflow-auto text-sm text-green-300 font-mono whitespace-pre-wrap">
          <h2 className="text-xl font-semibold text-white mb-4">Generated JSON</h2>
          <pre className="overflow-x-auto">{JSON.stringify(jsonResult, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
