import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resetCode } = body

    if (!resetCode) {
      return NextResponse.json({ status: 'error', message: 'Reset code is required' }, { status: 400 })
    }

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
      method: 'POST',
      body: JSON.stringify({ resetCode }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ status: 'error', message: data.message || 'Failed to verify reset code' }, { status: response.status })
    }

    return NextResponse.json({ status: 'success', message: data.message || 'Reset code verified successfully', data })
  } catch (error) {
    console.error('Verify reset code error:', error)
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 })
  }
}
