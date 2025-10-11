"use client"

import React from 'react'
import { VerifyResetCodeForm } from './_Component/VerifyResetCodeForm/VerifyResetCodeForm'
import { useSearchParams } from 'next/navigation'

export default function VerifyResetCode() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  if (!email) {
    return <div>Email is required to verify reset code.</div>
  }

  return (
    <>
      <div>
        <VerifyResetCodeForm email={email} />
      </div>
    </>
  )
}
