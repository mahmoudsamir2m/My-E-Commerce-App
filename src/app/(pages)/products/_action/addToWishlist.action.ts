'use server'


export async function addToWishlistAction(productId: string,token:string|undefined) {
    if (!token) {
        throw new Error('Unauthorized')
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            method: 'POST',
            body : JSON.stringify({productId}),
            headers: {
                token : token,
                "content-Type": "application/json"
            }
        });

        const data = await response.json();

        return data;

}
