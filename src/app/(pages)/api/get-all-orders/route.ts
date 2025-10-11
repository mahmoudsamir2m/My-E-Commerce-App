import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import jwt from 'jsonwebtoken'

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const decodedToken = jwt.decode(session.token) as { id: string };
        const userId = decodedToken?.id;
        if (!userId) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

        const response = await fetch(`${process.env.URL_API || 'https://ecommerce.routemisr.com/api/v1'}/orders/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        token: session.token
                    }
                });
                const data = await response.json();
                console.log('Orders data from backend:', data);

                return NextResponse.json(data);
    } catch (error) {
        console.error('Error decoding token:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
