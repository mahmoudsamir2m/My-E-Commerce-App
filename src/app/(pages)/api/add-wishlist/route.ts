import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || !session.token) {
    return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { productId } = body

    if (!productId) {
      return NextResponse.json({ status: 'error', message: 'productId is required' }, { status: 400 })
    }

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
      headers: {
        token: session.token as string,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ status: 'error', message: data.message || 'Failed to add to wishlist' }, { status: response.status })
    }

    return NextResponse.json({ status: 'success', message: data.message || 'Added to wishlist', data })
  } catch (error) {
    console.error('Add wishlist error:', error)
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 })
  }
}
