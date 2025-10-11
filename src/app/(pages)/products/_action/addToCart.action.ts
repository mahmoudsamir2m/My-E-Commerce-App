'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

export async function addToCartAction(productId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.token) {
        throw new Error('Unauthorized')
    }

    const response = await fetch(`${process.env.URL_API || 'https://ecommerce.routemisr.com/api/v1'}/cart`, {
            method: 'POST',
            body : JSON.stringify({productId}),
            headers: {
                token : session.token,
                "content-Type": "application/json"
            }
        });

        const data = await response.json();

        return data;

}
