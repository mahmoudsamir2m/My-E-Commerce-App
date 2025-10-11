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
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const formSchema = z.object({
  email: z.string().nonempty("Email is Required").email("Invalid email"),
})

type FormFields = z.infer<typeof formSchema>

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: FormFields) {
    setIsLoading(true)
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: values.email }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      if (response.ok) {
        toast.success(data.message || 'Reset email sent successfully')
        router.push(`/verify-reset-code?email=${values.email}`)
        form.reset()
      } else {
        toast.error(data.message || 'Failed to send reset email')
      }
    } catch (error) {
      console.error('Forgot password submit error:', error)
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Forgot Password</h1>
          <p className="text-gray-600 mb-8 text-sm md:text-base">
            Enter your email address and we will send you a link to reset your password.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
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
                  {isLoading && <Loader2 className="animate-spin" />} Send Reset Email
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
