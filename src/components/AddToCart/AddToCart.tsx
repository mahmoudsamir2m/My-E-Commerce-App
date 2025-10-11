"use client"
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { Loader2, ShoppingCartIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { CartContext } from '../Context/CartContext';
import { addToCartAction } from '@/app/(pages)/products/_action/addToCart.action';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AddToCart({productId, className } : {productId: string; className?: string}) {

    const [isLoading, setIsLoading] = useState(false);
    const { status } = useSession();
    const router = useRouter();

    const { getCart, setCartData } = useContext(CartContext);

    async function addProductToCart() {
        if (status !== 'authenticated') {
            router.push('/login');
            return;
        }
        setIsLoading(true);
        const data = await addToCartAction(productId);
        setCartData(data);
        data.status == 'success' && toast.success(data.message);
        setIsLoading(false);
        console.log(data);
            }

  return (
 
                        <Button disabled={isLoading} onClick={addProductToCart} className={className}> {isLoading ? <Loader2 className='animate-spin'/> : <ShoppingCartIcon/>}  Add To Cart</Button>
                    
  )
}
