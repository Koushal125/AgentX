"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/Sidebar"
import MetaAgentForm from "@/components/MetaAgentForm"
import WorkflowPreview from "@/components/WorkflowPreview"
import ProfileIcon from "@/components/ProfileIcon"

export interface WorkflowData {
  taskName: string
  description: string
  department: string
  trigger: string
  action: string
  escalation: string
  priority: string
  recurrence: string
}

interface WorkflowItem {
  name: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export default function DashboardPage() {
  const [formData, setFormData] = useState<WorkflowData | null>(null)
  const [recentChats, setRecentChats] = useState<WorkflowItem[]>([])
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    } else {
      router.push("/auth")
    }
  }, [router])

  // Load existing workflows from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (userData) {
      const user = JSON.parse(userData)
      if (user.workflows) {
        setRecentChats(user.workflows)
      }
    }
  }, [])

  // Save workflows to user data whenever recentChats changes
  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (userData) {
      const user = JSON.parse(userData)
      user.workflows = recentChats
      localStorage.setItem("userData", JSON.stringify(user))
    }
  }, [recentChats])

  const handlePreview = (data: WorkflowData) => {
    setFormData(data)
    const newWorkflow: WorkflowItem = {
      name: data.taskName || "Untitled Task",
      status: "pending",
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
    setRecentChats((prev) => [...prev, newWorkflow])
  }

  const handleApprove = () => {
    if (formData) {
      // Update the status of the most recent workflow to approved
      setRecentChats((prev) => {
        const updated = [...prev]
        const lastIndex = updated.length - 1
        if (lastIndex >= 0) {
          updated[lastIndex] = { ...updated[lastIndex], status: "approved" }
        }
        return updated
      })
      alert(`Workflow "${formData.taskName}" Approved Successfully by ${userData?.fullName || "User"}!`)
      setFormData(null)
    }
  }

  const handleReject = () => {
    if (formData) {
      // Update the status of the most recent workflow to rejected
      setRecentChats((prev) => {
        const updated = [...prev]
        const lastIndex = updated.length - 1
        if (lastIndex >= 0) {
          updated[lastIndex] = { ...updated[lastIndex], status: "rejected" }
        }
        return updated
      })
      alert(`Workflow "${formData.taskName}" Rejected`)
      setFormData(null)
    }
  }

  const handleDeleteChat = (index: number) => {
    setRecentChats((prev) => prev.filter((_, i) => i !== index))
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Agent <span style={{ color: "oklch(76.8% 0.233 130.85)" }}>X</span>
          </h1>
          <p className="text-gray-400 text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar chats={recentChats} onDelete={handleDeleteChat} />
        <ProfileIcon />
        <main className="flex-1 ml-72 px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, <span style={{ color: "oklch(76.8% 0.233 130.85)" }}>{userData.fullName}</span>!
              </h1>
              <p className="text-gray-400 text-lg">Create and manage your AI-powered workflows</p>
            </div>

            <div className="flex gap-8 items-start justify-center">
              <div className="w-full max-w-2xl">
                <MetaAgentForm onPreview={handlePreview} />
              </div>

              {formData && (
                <div className="w-full max-w-xl">
                  <WorkflowPreview data={formData} onApprove={handleApprove} onReject={handleReject} />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
