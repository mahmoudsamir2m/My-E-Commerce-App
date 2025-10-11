"use client"
import React, { useState } from 'react'
import { HeartIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { ProductI } from '@/interfaces/product';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// Use internal API route to add to wishlist so we can leverage server-side session

export default function AddToWishlist({productId, product} : {productId: string, product: ProductI}) {

    const [isLoading, setIsLoading] = useState(false);
    const { status } = useSession();
    const router = useRouter();

    async function addProductToWishlist() {
        if (status !== 'authenticated') {
            router.push('/login');
            return;
        }
        console.log(product);
        setIsLoading(true);
        try {
            const res = await fetch('/api/add-wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId })
            })

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed')
            if (data.status === 'success') {
                toast.success(data.message || 'Added to wishlist');
            } else {
                toast.error(data.message || 'Failed to add to wishlist');
            }
        } catch (error) {
            toast.error('Failed to add to wishlist');
            console.error(error);
        }
        setIsLoading(false);
    }

  return (
    isLoading ? <Loader2 className='animate-spin size-6' /> : <HeartIcon onClick={addProductToWishlist} className='cursor-pointer size-6' />
  )
}
