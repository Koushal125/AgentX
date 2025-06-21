'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function CenteredOptions() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const router = useRouter()

  const handleOption = (option: string) => {
    setSelectedOption(option)
    router.push(`/dashboard/${option}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 px-4">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg p-10 w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold text-white">Choose Your Workflow</h1>
        <p className="text-gray-400">Select an option to continue to your dashboard.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-lg" onClick={() => handleOption('form')}>
            📝 Form
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-lg" onClick={() => handleOption('prompt')}>
            💬 Prompt
          </Button>
        </div>
      </div>
    </div>
  )
}
