import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { cartId, shippingAddress } = await request.json();

        if (!cartId || !shippingAddress) {
            return NextResponse.json({ error: 'Missing cartId or shippingAddress' }, { status: 400 })
        }

        const response = await fetch(`${process.env.URL_API || 'https://ecommerce.routemisr.com/api/v1'}/orders/${cartId}`, {
            method: 'POST',
            headers: {
                token: session.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ shippingAddress })
        });

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error creating cash order:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
