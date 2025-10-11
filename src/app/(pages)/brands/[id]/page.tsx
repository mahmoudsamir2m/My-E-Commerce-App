import { ProductI } from '@/interfaces/product';
import React from 'react';
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
import { Button } from '@/components/ui/button';
import AddToCart from '@/components/AddToCart/AddToCart';
import AddToWishlist from '@/components/AddToWishlist/AddToWishlist';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function BrandProducts({ params }: PageProps) {
  const { id } = await params;

  const response = await fetch(`${process.env.URL_API || 'https://ecommerce.routemisr.com/api/v1'}/products?brand=${id}`, {
    next: { revalidate: 10*60 }
  });
  const { data : products } : { data: ProductI[] } = await response.json();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <h2 className="text-2xl font-semibold mb-4">No products for this brand</h2>
        <p className="text-gray-600 mb-6">Check out all products instead.</p>
        <Link href="/products">
          <Button className="px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600">
            Go to Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
      {
        products.map((product) => {
          const fullStars = Math.floor(product.ratingsAverage);
          const hasHalfStar = product.ratingsAverage % 1 >= 0.5;
          return (
            <div key={product.id} className="">
                <Card>
                <Link href={`/products/${product.id}`}>
                <Image src={product.imageCover} alt={product.title} className='w-full' width={300} height={300} />
                <CardHeader>
                  <CardTitle>{product.title.split(" ", 2)}</CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                  <Link href={`/brands/${product.brand._id}`}>
                    <CardAction className="cursor-pointer hover:underline">{product.brand.name}</CardAction>
                  </Link>
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

  )
}
