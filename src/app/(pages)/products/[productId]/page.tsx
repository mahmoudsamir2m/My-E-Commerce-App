import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductI } from '@/interfaces';
import StarIcon from '@/components/Icons/StarIcon';
import { StarHalf } from 'lucide-react';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import AddToCart from '@/components/AddToCart/AddToCart';
import AddToWishlist from '@/components/AddToWishlist/AddToWishlist';
import { Params } from 'next/dist/server/request/params';


export default async function ProductDetails({params} : {params: Params}   ) {

    const { productId } = await params;

    const response = await fetch(`${process.env.URL_API || 'https://ecommerce.routemisr.com/api/v1'}/products/${productId}`);
    const { data : product } : { data: ProductI } = await response.json();

    const fullStars = Math.floor(product.ratingsAverage);
    const hasHalfStar = product.ratingsAverage % 1 >= 0.5;

  return (
            <Card className='grid md:grid-cols-3 items-center'>
                <div className='col-span-1'>
                    <ProductSlider images={product.images} altContent={product.title} />
                    
                </div>
                <div className="md:col-span-2 space-y-4">
                    <CardHeader>
                        <CardTitle className='text-2xl'>{product.title}</CardTitle>
                        <div className='flex'>
                            {Array.from({ length: fullStars }).map((_, i) => (
                            <StarIcon key={`full-${i}`} />
                            ))}
                                {hasHalfStar && (
                                <StarHalf key="half" className="size-6 text-yellow-400" />
                            )}
                                <div className='flex gap-3'>
                                    <p>{product.ratingsAverage}</p>
                                    ({product.ratingsQuantity} Reviews)
                                    <span>|</span>
                                    <p>
                                        ({product.quantity}){" "}
                                        {product.quantity > 0 ? (
                                            <span className="text-green-400">In Stock</span>
                                        ) : (
                                            <span className="text-red-500">Out of Stock</span>
                                        )}
                                    </p>
                                </div>
                        </div>
                        <p className='flex gap-1 items-center'>EGP <span className='text-xl font-semibold'>{product.price}</span></p>
                    </CardHeader>
                    <CardContent>
                        {product.description}
                    </CardContent>
                    <CardFooter className='gap-1'>
                        <AddToWishlist productId={product.id} product={product} />
                        <AddToCart productId={product.id} className='grow md:grow-0 px-8 bg-red-500 hover:bg-red-600 cursor-pointer' />
                    </CardFooter>
                    
                </div>
            </Card>
  )
}
