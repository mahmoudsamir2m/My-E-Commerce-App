import { ProductI } from '@/interfaces/product';
import React from 'react'
import Image from 'next/image';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StarHalf } from 'lucide-react';
import Link from 'next/link';
import StarIcon from '@/components/Icons/StarIcon';
import AddToCart from '@/components/AddToCart/AddToCart';
import AddToWishlist from '@/components/AddToWishlist/AddToWishlist';

export default async function Products({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

  const params = await searchParams;

  const response = await fetch(`${process.env.URL_API || 'https://ecommerce.routemisr.com/api/v1'}/products`, {
    next: { revalidate: 10*60 }
  });
  const { data : products } : { data: ProductI[] } = await response.json();

  const search = (params.search as string)?.toLowerCase() || '';
  const filteredProducts = search ? products.filter(p => p.title.toLowerCase().includes(search)) : products;

  return (
    <>
      {search && <h1 className='text-2xl font-bold mb-4'>Search results for &apos;{search}&apos;</h1>}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
        {
          filteredProducts.map((product) => {
          const fullStars = Math.floor(product.ratingsAverage);
          const hasHalfStar = product.ratingsAverage % 1 >= 0.5;
          return (
            <div key={product.id} className="">
                <Card>
                <Link href={`/products/${product.id}`}>
                <Image src={product.imageCover} alt={product.title} className='w-full' width={300} height={300} />
                <CardHeader>
                  <div className='mt-3'>
                    <CardTitle className='mb-2'>{product.title.split(" ", 2)}</CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                  </div>

                  <CardAction className="cursor-pointer hover:underline mt-3">{product.brand.name}</CardAction>
                </CardHeader>
                      </Link>
                <CardContent>
                  <div className="flex justify-between">
                    <div className='flex'>
                      {Array.from({ length: fullStars }).map((_, i) => (
                      <StarIcon key={`full-${i}`} />
                    ))}
                      {hasHalfStar && (
                      <StarHalf key="half" className="size-6 text-yellow-400" />
                    )}
                      <p>{product.ratingsAverage}</p>
                    </div>
                    <AddToWishlist productId={product._id} product={product} />
                  </div>
                  <p className='pt-2'>Price : <span className='text font-bold'>{product.price} EGP</span></p>
                </CardContent>
                <CardFooter className='gap-1'>
                        <AddToCart productId={product.id} className='grow md:grow-0 px-8 bg-black w-full rounded-b-none cursor-pointer' />
                    </CardFooter>
              </Card>
            </div>
          );
        })
      }
    </div>
    </>
  )
}
