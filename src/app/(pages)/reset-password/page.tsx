"use client"

import React from 'react'
import { ResetPasswordForm } from './_Component/ResetPasswordForm/ResetPasswordForm'
import { useSearchParams } from 'next/navigation'

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  if (!email) {
    return <div>Email is required to reset password.</div>
  }

  return (
    <>
      <div>
        <ResetPasswordForm email={email} />
      </div>
    </>
  )
}
