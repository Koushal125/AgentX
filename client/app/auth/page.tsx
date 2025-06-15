"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { EyeIcon, EyeSlashIcon, CheckIcon, XMarkIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"

interface PasswordStrength {
  score: number
  feedback: string[]
  color: string
}

interface User {
  id: string
  fullName: string
  email: string
  password: string
  role: string
  joinDate: string
  isVerified: boolean
  resetToken?: string
  resetTokenExpiry?: string
}

interface LoginAttempt {
  email: string
  attempts: number
  lastAttempt: number
  lockedUntil?: number
}

interface AlertDialog {
  isOpen: boolean
  title: string
  message: string
  type: "success" | "error" | "info"
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  })
  const [errors, setErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([])
  const [alertDialog, setAlertDialog] = useState<AlertDialog>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  })
  const router = useRouter()

  // Load login attempts from localStorage
  useEffect(() => {
    const attempts = localStorage.getItem("loginAttempts")
    if (attempts) {
      setLoginAttempts(JSON.parse(attempts))
    }
  }, [])

  // Show alert dialog
  const showAlert = (title: string, message: string, type: "success" | "error" | "info" = "info") => {
    setAlertDialog({
      isOpen: true,
      title,
      message,
      type,
    })
  }

  // Close alert dialog
  const closeAlert = () => {
    setAlertDialog({
      isOpen: false,
      title: "",
      message: "",
      type: "info",
    })
  }

  // Input sanitization function
  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/[<>"'%;()&+]/g, "") // Remove potential SQL injection characters
      .replace(/(\b(ALTER|CREATE|DELETE|DROP|EXEC|EXECUTE|INSERT|SELECT|UNION|UPDATE|OR|AND)\b)/gi, "") // Remove SQL keywords
  }

  // Email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length <= 254
  }

  // Password strength checker
  const checkPasswordStrength = (password: string): PasswordStrength => {
    let score = 0
    const feedback: string[] = []

    if (password.length >= 8) score += 1
    else feedback.push("At least 8 characters")

    if (/[A-Z]/.test(password)) score += 1
    else feedback.push("One uppercase letter")

    if (/[a-z]/.test(password)) score += 1
    else feedback.push("One lowercase letter")

    if (/\d/.test(password)) score += 1
    else feedback.push("One number")

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1
    else feedback.push("One special character")

    let color = "#ef4444"
    if (score >= 3) color = "#f59e0b"
    if (score >= 4) color = "#10b981"

    return { score, feedback, color }
  }

  // Get or create user database
  const getUserDatabase = (): User[] => {
    const users = localStorage.getItem("userDatabase")
    return users ? JSON.parse(users) : []
  }

  // Save user database
  const saveUserDatabase = (users: User[]) => {
    localStorage.setItem("userDatabase", JSON.stringify(users))
  }

  // Check if user is locked out
  const isUserLockedOut = (email: string): boolean => {
    const attempt = loginAttempts.find((a) => a.email === email)
    if (!attempt) return false

    if (attempt.lockedUntil && Date.now() < attempt.lockedUntil) {
      return true
    }

    return false
  }

  // Update login attempts
  const updateLoginAttempts = (email: string, success: boolean) => {
    const newAttempts = [...loginAttempts]
    const existingIndex = newAttempts.findIndex((a) => a.email === email)

    if (success) {
      // Remove attempts on successful login
      if (existingIndex !== -1) {
        newAttempts.splice(existingIndex, 1)
      }
    } else {
      // Increment failed attempts
      if (existingIndex !== -1) {
        newAttempts[existingIndex].attempts += 1
        newAttempts[existingIndex].lastAttempt = Date.now()

        // Lock account after 5 failed attempts for 15 minutes
        if (newAttempts[existingIndex].attempts >= 5) {
          newAttempts[existingIndex].lockedUntil = Date.now() + 15 * 60 * 1000 // 15 minutes
        }
      } else {
        newAttempts.push({
          email,
          attempts: 1,
          lastAttempt: Date.now(),
        })
      }
    }

    setLoginAttempts(newAttempts)
    localStorage.setItem("loginAttempts", JSON.stringify(newAttempts))
  }

  // Get remaining attempts
  const getRemainingAttempts = (email: string): number => {
    const attempt = loginAttempts.find((a) => a.email === email)
    return attempt ? Math.max(0, 5 - attempt.attempts) : 5
  }

  // Get lockout time remaining
  const getLockoutTimeRemaining = (email: string): number => {
    const attempt = loginAttempts.find((a) => a.email === email)
    if (!attempt?.lockedUntil) return 0
    return Math.max(0, attempt.lockedUntil - Date.now())
  }

  const passwordStrength = checkPasswordStrength(formData.password)

  const validateForm = () => {
    const newErrors: string[] = []

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(formData.email.toLowerCase())
    const sanitizedPassword = sanitizeInput(formData.password)
    const sanitizedFullName = sanitizeInput(formData.fullName)

    // Email validation
    if (!sanitizedEmail) {
      newErrors.push("Email is required")
    } else if (!isValidEmail(sanitizedEmail)) {
      newErrors.push("Please enter a valid email address")
    }

    // Password validation
    if (!sanitizedPassword) {
      newErrors.push("Password is required")
    } else if (isLogin && sanitizedPassword.length < 6) {
      newErrors.push("Password must be at least 6 characters long")
    }

    // Additional validation for signup
    if (!isLogin) {
      if (!sanitizedFullName) {
        newErrors.push("Full name is required")
      } else if (sanitizedFullName.length < 2) {
        newErrors.push("Full name must be at least 2 characters long")
      }

      if (passwordStrength.score < 3) {
        newErrors.push("Password is too weak. Please choose a stronger password.")
      }

      if (sanitizedPassword !== formData.confirmPassword) {
        newErrors.push("Passwords don't match")
      }
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const handleLogin = (sanitizedEmail: string, sanitizedPassword: string) => {
    // Check if user is locked out
    if (isUserLockedOut(sanitizedEmail)) {
      const timeRemaining = getLockoutTimeRemaining(sanitizedEmail)
      const minutesRemaining = Math.ceil(timeRemaining / (1000 * 60))
      setErrors([`Account locked. Try again in ${minutesRemaining} minutes.`])
      return false
    }

    const users = getUserDatabase()
    const user = users.find((u) => u.email === sanitizedEmail && u.password === sanitizedPassword)

    if (user) {
      // Successful login
      updateLoginAttempts(sanitizedEmail, true)

      const userData = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        joinDate: user.joinDate,
        isAuthenticated: true,
        workflows: [],
      }
      localStorage.setItem("userData", JSON.stringify(userData))

      showAlert("Welcome Back!", `Successfully signed in as ${user.fullName}`, "success")
      setTimeout(() => {
        closeAlert()
        router.push("/dashboard")
      }, 2000)
      return true
    } else {
      // Failed login
      updateLoginAttempts(sanitizedEmail, false)
      const remaining = getRemainingAttempts(sanitizedEmail)

      if (remaining > 0) {
        setErrors([`Invalid email or password. ${remaining} attempts remaining.`])
      } else {
        setErrors(["Account locked due to too many failed attempts. Try again in 15 minutes."])
      }
      return false
    }
  }

  const handleSignup = (sanitizedEmail: string, sanitizedPassword: string, sanitizedFullName: string) => {
    const users = getUserDatabase()

    // Check if user already exists
    if (users.find((u) => u.email === sanitizedEmail)) {
      setErrors(["An account with this email already exists. Please sign in instead."])
      return false
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      fullName: sanitizedFullName,
      email: sanitizedEmail,
      password: sanitizedPassword,
      role: "AI Agent Developer",
      joinDate: new Date().toISOString(),
      isVerified: true, // In real app, this would be false until email verification
    }

    users.push(newUser)
    saveUserDatabase(users)

    // Auto-login after signup
    const userData = {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
      joinDate: newUser.joinDate,
      isAuthenticated: true,
      workflows: [],
    }
    localStorage.setItem("userData", JSON.stringify(userData))

    showAlert(
      "Account Created!",
      `Welcome to Agent X, ${sanitizedFullName}! Your account has been created successfully.`,
      "success",
    )
    setTimeout(() => {
      closeAlert()
      router.push("/dashboard")
    }, 2000)
    return true
  }

  const handleForgotPassword = (sanitizedEmail: string) => {
    const users = getUserDatabase()
    const userIndex = users.findIndex((u) => u.email === sanitizedEmail)

    if (userIndex === -1) {
      setErrors(["No account found with this email address."])
      return
    }

    // Generate reset token (in real app, this would be sent via email)
    const resetToken = Math.random().toString(36).substring(2, 15)
    const resetTokenExpiry = new Date(Date.now() + 3600000).toISOString() // 1 hour

    users[userIndex].resetToken = resetToken
    users[userIndex].resetTokenExpiry = resetTokenExpiry
    saveUserDatabase(users)

    // Show reset token in dialog
    showAlert(
      "Password Reset Link Sent!",
      `A password reset link has been sent to ${sanitizedEmail}.\n\nFor demo purposes, your reset token is: ${resetToken}\n\nThis would normally be sent via email.`,
      "info",
    )
    setShowForgotPassword(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(formData.email.toLowerCase())
    const sanitizedPassword = sanitizeInput(formData.password)
    const sanitizedFullName = sanitizeInput(formData.fullName)

    try {
      if (showForgotPassword) {
        handleForgotPassword(sanitizedEmail)
        setIsLoading(false)
        return
      }

      if (isLogin) {
        handleLogin(sanitizedEmail, sanitizedPassword)
      } else {
        handleSignup(sanitizedEmail, sanitizedPassword, sanitizedFullName)
      }
    } catch (error) {
      setErrors(["An error occurred. Please try again."])
      showAlert("Error", "An unexpected error occurred. Please try again.", "error")
    }

    setIsLoading(false)
  }

  const remainingAttempts = getRemainingAttempts(formData.email)
  const lockoutTime = getLockoutTimeRemaining(formData.email)

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Agent <span style={{ color: "oklch(76.8% 0.233 130.85)" }}>X</span>
          </h1>
          <p className="text-gray-400 text-lg">AI-Powered Workflow Automation</p>
        </div>

        <Card className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              {showForgotPassword ? "Reset Password" : isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <p className="text-gray-400 text-center">
              {showForgotPassword
                ? "Enter your email to receive a reset link"
                : isLogin
                  ? "Sign in to your account"
                  : "Sign up to get started"}
            </p>
          </CardHeader>
          <CardContent>
            {/* Rate Limiting Warning */}
            {lockoutTime > 0 && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                <div className="flex items-center gap-2">
                  <ShieldExclamationIcon className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-semibold">
                    Account locked for {Math.ceil(lockoutTime / (1000 * 60))} more minutes
                  </span>
                </div>
              </div>
            )}

            {/* Remaining Attempts Warning */}
            {isLogin && remainingAttempts < 5 && remainingAttempts > 0 && (
              <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-xl">
                <div className="flex items-center gap-2">
                  <XMarkIcon className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">{remainingAttempts} login attempts remaining</span>
                </div>
              </div>
            )}

            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <XMarkIcon className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-semibold">Please fix the following errors:</span>
                </div>
                <ul className="space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-red-300 text-sm ml-7">
                      • {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && !showForgotPassword && (
                <div>
                  <label className="block text-lg font-semibold text-gray-300 mb-3">Full Name</label>
                  <Input
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 text-lg"
                    style={{ "--tw-ring-color": "oklch(76.8% 0.233 130.85)" } as React.CSSProperties}
                  />
                </div>
              )}

              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-3">Email Address</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  maxLength={254}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 text-lg"
                  style={{ "--tw-ring-color": "oklch(76.8% 0.233 130.85)" } as React.CSSProperties}
                />
              </div>

              {!showForgotPassword && (
                <div>
                  <label className="block text-lg font-semibold text-gray-300 mb-3">Password</label>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={isLogin ? "Enter your password" : "Create a strong password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={isLogin ? 6 : 8}
                      maxLength={128}
                      className="w-full px-4 py-3 pr-12 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 text-lg"
                      style={{ "--tw-ring-color": "oklch(76.8% 0.233 130.85)" } as React.CSSProperties}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator - Only show during signup */}
                  {!isLogin && formData.password && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 bg-neutral-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(passwordStrength.score / 5) * 100}%`,
                              backgroundColor: passwordStrength.color,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium" style={{ color: passwordStrength.color }}>
                          {passwordStrength.score < 3 ? "Weak" : passwordStrength.score < 4 ? "Good" : "Strong"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {[
                          "At least 8 characters",
                          "One uppercase letter",
                          "One lowercase letter",
                          "One number",
                          "One special character",
                        ].map((requirement, index) => {
                          const isMet = !passwordStrength.feedback.includes(requirement)
                          return (
                            <div key={requirement} className="flex items-center gap-2 text-sm">
                              {isMet ? (
                                <CheckIcon className="w-4 h-4 text-green-500" />
                              ) : (
                                <XMarkIcon className="w-4 h-4 text-red-500" />
                              )}
                              <span className={isMet ? "text-green-400" : "text-gray-400"}>{requirement}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!isLogin && !showForgotPassword && (
                <div>
                  <label className="block text-lg font-semibold text-gray-300 mb-3">Confirm Password</label>
                  <div className="relative">
                    <Input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      maxLength={128}
                      className="w-full px-4 py-3 pr-12 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 text-lg"
                      style={{ "--tw-ring-color": "oklch(76.8% 0.233 130.85)" } as React.CSSProperties}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                      <XMarkIcon className="w-4 h-4" />
                      Passwords do not match
                    </p>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-green-400 text-sm mt-2 flex items-center gap-2">
                      <CheckIcon className="w-4 h-4" />
                      Passwords match
                    </p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading || lockoutTime > 0}
                className="w-full py-4 text-lg font-bold text-black transition-all duration-200 hover:scale-[1.02] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ backgroundColor: "oklch(76.8% 0.233 130.85)" }}
              >
                {isLoading
                  ? "Processing..."
                  : showForgotPassword
                    ? "Send Reset Link"
                    : isLogin
                      ? "Sign In"
                      : "Create Account"}
              </Button>
            </form>

            {!showForgotPassword && (
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin)
                      setErrors([])
                      setFormData({ email: "", password: "", confirmPassword: "", fullName: "" })
                    }}
                    className="font-semibold hover:underline transition-all duration-200"
                    style={{ color: "oklch(76.8% 0.233 130.85)" }}
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            )}

            {isLogin && !showForgotPassword && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            {showForgotPassword && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false)
                    setErrors([])
                    setFormData({ email: "", password: "", confirmPassword: "", fullName: "" })
                  }}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Back to sign in
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>

      {/* Alert Dialog */}
      <Dialog open={alertDialog.isOpen} onOpenChange={closeAlert}>
        <DialogContent className="bg-neutral-900 border-neutral-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {alertDialog.type === "success" && <CheckIcon className="w-5 h-5 text-green-500" />}
              {alertDialog.type === "error" && <XMarkIcon className="w-5 h-5 text-red-500" />}
              {alertDialog.type === "info" && <ShieldExclamationIcon className="w-5 h-5 text-blue-500" />}
              {alertDialog.title}
            </DialogTitle>
            <DialogDescription className="text-gray-300 whitespace-pre-line">{alertDialog.message}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button
              onClick={closeAlert}
              className="px-6 py-2 text-black font-semibold rounded-lg"
              style={{ backgroundColor: "oklch(76.8% 0.233 130.85)" }}
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
