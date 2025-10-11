import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'

export async function GET(_request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || !session.token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
      method: 'GET',
      headers: {
        'token': session.token as string
      }
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch addresses' }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Addresses fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
