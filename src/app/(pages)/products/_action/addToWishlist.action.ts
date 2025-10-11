'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

export async function addToWishlistAction(productId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.token) {
        throw new Error('Unauthorized')
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
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
