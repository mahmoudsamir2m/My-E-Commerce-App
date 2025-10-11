"use client"
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {signIn} from "next-auth/react"
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
import { useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  email: z.string().nonempty("Email is Required").email("Invalid email"),
  password: z
    .string()
    .nonempty("Password is Required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    ),
})

type FormFields = z.infer<typeof formSchema>

export function LoginForm() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();


  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: FormFields) {
    setIsLoading(true);
    const _response = await signIn('credentials', {
        callbackUrl: '/',
        redirect: true,
        email: values.email,
        password: values.password,
    });
    setIsLoading(false);
    
  }

  return (
    <div className="min-h-200 flex items-center justify-center p-4 font-sans">

      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full">
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
        {searchParams.get('error') ? <h2 className="font-bold text-red-500 my-5">{searchParams.get('error')}</h2> : ''}
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Log in to Exclusive</h1>
          <p className="text-gray-600 mb-8 text-sm md:text-base">
            Enter your details below
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

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="p-3 border-gray-300 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <Button
                  disabled={isLoading}
                    type="submit"
                    className="py-6 px-10 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300 cursor-pointer"
                  >
                    {isLoading && <Loader2 className="animate-spin"/>} Log In
                  </Button>
                  <Link
                    href="/forgot-password"
                    className="text-red-500 hover:underline ml-4 text-sm font-medium whitespace-nowrap"
                  >
                    Forget Password?
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    href="/register"
                    className="text-red-500 hover:underline text-sm font-medium"
                  >
                    Don&apos;t have an account? Register
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
