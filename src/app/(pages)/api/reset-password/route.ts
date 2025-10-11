import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, newPassword } = body

    if (!email || !newPassword) {
      return NextResponse.json({ status: 'error', message: 'Email and new password are required' }, { status: 400 })
    }

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
      method: 'PUT',
      body: JSON.stringify({ email, newPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ status: 'error', message: data.message || 'Failed to reset password' }, { status: response.status })
    }

    return NextResponse.json({ status: 'success', message: data.message || 'Password reset successfully' })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 })
  }
}
