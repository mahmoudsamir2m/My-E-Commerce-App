import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ status: 'error', message: 'Email is required' }, { status: 400 })
    }

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ status: 'error', message: data.message || 'Failed to send reset email' }, { status: response.status })
    }

    return NextResponse.json({ status: 'success', message: data.message || 'Reset email sent successfully' })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 })
  }
}
