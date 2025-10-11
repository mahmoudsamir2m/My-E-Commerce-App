"use client"
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"

const formSchema = z.object({
  newPassword: z
    .string()
    .nonempty("New password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    ),
  confirmPassword: z.string().nonempty("Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type FormFields = z.infer<typeof formSchema>

interface ResetPasswordFormProps {
  email: string
}

export function ResetPasswordForm({ email }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: FormFields) {
    setIsLoading(true)
    try {
      const response = await fetch('/api/reset-password', {
        method: 'PUT',
        body: JSON.stringify({ email, newPassword: values.newPassword }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      if (response.ok) {
        toast.success(data.message || 'Password reset successfully')
        router.push('/login')
      } else {
        toast.error(data.message || 'Failed to reset password')
      }
    } catch (error) {
      console.error('Reset password submit error:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-200 flex items-center justify-center p-4 font-sans">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl">
        {/* Left Section (Image) */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center p-8 rounded-l-2xl">
          <Image
            src="/images/75f394c0a1c7dc5b68a42239311e510f54d8cd59.jpg"
            alt="Shopping Illustration"
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Right Section (Form) */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Reset Password</h1>
          <p className="text-gray-600 mb-8 text-sm md:text-base">
            Enter your new password for {email}.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* New Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                        className="p-3 border-gray-300 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        {...field}
                        className="p-3 border-gray-300 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="py-6 px-10 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300 cursor-pointer"
                >
                  {isLoading && <Loader2 className="animate-spin" />} Reset Password
                </Button>
                <Link
                  href="/login"
                  className="text-red-500 hover:underline ml-4 text-sm font-medium whitespace-nowrap"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
