import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const token = request.headers.get('token')

    if (!token) {
      return NextResponse.json({ message: 'Token is required' }, { status: 401 })
    }

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorData = await response.text()
      return NextResponse.json({ message: 'Failed to add address', details: errorData }, { status: response.status })
    }

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Add address proxy error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
