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
import { SuccessSignupResponse, FailedSignupResponse } from "@/interfaces/signup"

const formSchema = z.object({
  name: z.string().nonempty("Name is Required"),
  email: z.string().nonempty("Email is Required").email("Invalid email"),
  password: z
    .string()
    .nonempty("Password is Required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    ),
  rePassword: z.string().nonempty("Re-enter Password is Required"),
  phone: z.string().nonempty("Phone is Required"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"],
})

type FormFields = z.infer<typeof formSchema>

export function RegisterForm() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  })

  async function onSubmit(values: FormFields) {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/signup`, {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          rePassword: values.rePassword,
          phone: values.phone,
        }),
        headers: {"Content-Type": "application/json"}
      });
      const payload: SuccessSignupResponse | FailedSignupResponse = await response.json();

      if ('token' in payload) {
        // Success, redirect to login
        router.push('/login');
      } else {
        setError(payload.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
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
          {error && <h2 className="font-bold text-red-500 my-5">{error}</h2>}
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Sign up to Exclusive</h1>
          <p className="text-gray-600 mb-8 text-sm md:text-base">
            Enter your details below
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        {...field}
                        className="p-3 border-gray-300 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {/* Re-enter Password */}
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-enter Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Re-enter your password"
                        {...field}
                        className="p-3 border-gray-300 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
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
                  {isLoading && <Loader2 className="animate-spin"/>} Sign Up
                </Button>
                <Link
                  href="/login"
                  className="text-red-500 hover:underline ml-4 text-sm font-medium whitespace-nowrap"
                >
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
