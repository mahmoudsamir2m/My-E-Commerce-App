import { CategoryI } from '@/interfaces/category';
import { ProductI } from '@/interfaces/product';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
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
import StarIcon from '@/components/Icons/StarIcon';
import AddToWishlist from '@/components/AddToWishlist/AddToWishlist';
import AddToCart from '@/components/AddToCart/AddToCart';
import BrandsCarousel from '@/components/BrandsCarousel';


function getRandomProducts(products: ProductI[], count: number): ProductI[] {
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default async function Home() {
  const categoriesResponse = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
    next: { revalidate: 10 * 60 }
  });
  const { data: categories }: { data: CategoryI[] } = await categoriesResponse.json();

  const brandsResponse = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
    next: { revalidate: 10 * 60 }
  });
  const { data: brands }: { data: CategoryI[] } = await brandsResponse.json();

  const productsResponse = await fetch(`${process.env.URL_API || 'https://ecommerce.routemisr.com/api/v1'}/products`, {
    next: { revalidate: 10 * 60 }
  });
  const { data: products }: { data: ProductI[] } = await productsResponse.json();

  const randomProducts = getRandomProducts(products, 10);

  return (
    <>

      <section className='mt-15'>
        <div className='flex gap-3 items-center'>
          <span className='w-8 h-10 bg-red-600 rounded'></span>
          <span className='font-bold text-red-600'>Products</span>
        </div>
        <h1 className='my-5 font-bold'>Best Products</h1>
        <Carousel>
          <CarouselContent>
            {randomProducts.map((product) => {
              const fullStars = Math.floor(product.ratingsAverage);
              const hasHalfStar = product.ratingsAverage % 1 >= 0.5;
              return (
                <CarouselItem key={product._id} className="md:basis-1/3 lg:basis-1/5">
                  <Card>
                    <Link href={`/products/${product._id}`}>
                      <Image src={product.imageCover} alt={product.title} className='w-full' width={200} height={200} />
                      <CardHeader>
                      <CardTitle className="text-sm">{product.title.split(" ").slice(0, 2).join(" ")}</CardTitle>
                        <CardDescription className="text-xs">{product.category.name}</CardDescription>
                        <CardAction className="text-xs">{product.brand.name}</CardAction>
                      </CardHeader>
                    </Link>
                    <CardContent>
                      <div className="flex justify-between">
                        <div className='flex'>
                          {Array.from({ length: fullStars }).map((_, i) => (
                            <StarIcon key={`full-${i}`} className="w-3 h-3" />
                          ))}
                          {hasHalfStar && (
                            <StarHalf key="half" className="w-3 h-3 text-yellow-400" />
                          )}
                          <p className="text-xs">{product.ratingsAverage}</p>
                        </div>
                        <AddToWishlist productId={product._id} product={product} />
                      </div>
                      <p className='pt-1 text-sm'>Price : <span className='text font-bold'>{product.price} EGP</span></p>
                    </CardContent>
                    <CardFooter className='gap-1'>
                      <AddToCart productId={product._id} className='grow md:grow-0 px-4 bg-black w-full rounded-b-none cursor-pointer text-sm' />
                    </CardFooter>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className='bg-gray-400' />
          <CarouselNext className='bg-gray-400' />
        </Carousel>
            <div className='flex justify-center mt-5 mb-8'>
          <Link className='bg-red-500 hover:bg-red-600 text-white p-3.5 rounded' href={'/products'}>View All Products</Link>
            </div>
        
      </section>

        <div className='border my-15'></div>

      <section>
        <div className='flex gap-3 items-center'>
          <span className='w-8 h-10 bg-red-600 rounded'></span>
          <span className='font-bold text-red-600'>Categories</span>
        </div>
        <h1 className='my-5 font-bold'>Browse By Category</h1>
        <Carousel>
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem key={category._id} className="md:basis-1/3 lg:basis-1/5">
                <Card>
                  <Link href={`/categories/${category._id}`}>
                    <Image src={category.image} alt={category.name} className='w-full object-contain' width={200} height={200} />
                    <CardHeader>
                      <CardTitle className="text-sm">{category.name}</CardTitle>
                    </CardHeader>
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='bg-gray-400' />
          <CarouselNext className='bg-gray-400' />
        </Carousel>
      </section>

        <div className='border my-15'></div>

      <section>
        <div className='flex gap-3 items-center'>
          <span className='w-8 h-10 bg-red-600 rounded'></span>
          <span className='font-bold text-red-600'>Brands</span>
        </div>
        <h1 className='my-5 font-bold'>Shop By Brand</h1>
        <BrandsCarousel brands={brands} />
      </section>

      <section className="bg-white font-sans text-black p-8 sm:p-12">

    <div className="max-w-7xl mx-auto py-12 md:py-20">
        
        {/* <!-- Feature Grid Container (1 column on mobile, 3 columns on tablet/desktop) --> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 lg:gap-20">
            
            {/* <!-- Feature 1: Delivery --> */}
            <div className="text-center">
                {/* <!-- Icon Circle: w-20 h-20 (80px), centered (mx-auto), flex container, rounded, bordered, with hover effect --> */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-soft-gray bg-primary-black mx-auto mb-6 
                            transition-transform duration-300 ease-in-out hover:scale-105 bg-gray-200">
                    
                    {/* <!-- Icon: Truck. Set to w-8 h-8 (32px) and white text color --> */}
                    <div className='bg-black rounded-4xl p-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
</svg>

                    </div>
                    
                </div>
                {/* <!-- Main Heading --> */}
                <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wider mb-2">
                    FREE AND FAST DELIVERY
                </h3>
                {/* <!-- Detail Text --> */}
                <p className="text-sm sm:text-base text-gray-600">
                    Free delivery for all orders over $140
                </p>
            </div>

            {/* <!-- Feature 2: Customer Service --> */}
            <div className="text-center">
                <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-soft-gray bg-primary-black mx-auto mb-6 
                            transition-transform duration-300 ease-in-out hover:scale-105 bg-gray-200">
                    
                    {/* <!-- Icon: Headphones --> */}
                    <div className='bg-black rounded-4xl p-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>

                    </div>
                    

                </div>
                {/* <!-- Main Heading --> */}
                <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wider mb-2">
                    24/7 CUSTOMER SERVICE
                </h3>
                {/* <!-- Detail Text --> */}
                <p className="text-sm sm:text-base text-gray-600">
                    Friendly 24/7 customer support
                </p>
            </div>

            {/* <!-- Feature 3: Money Back Guarantee --> */}
            <div className="text-center">
                <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-soft-gray bg-primary-black mx-auto mb-6 
                            transition-transform duration-300 ease-in-out hover:scale-105 bg-gray-200">
                    
                    {/* <!-- Icon: Shield Check --> */}
                    <div className='bg-black rounded-4xl p-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
</svg>

                    </div>
                    

                </div>
                {/* <!-- Main Heading --> */}
                <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wider mb-2">
                    MONEY BACK GUARANTEE
                </h3>
                {/* <!-- Detail Text --> */}
                <p className="text-sm sm:text-base text-gray-600">
                    We return money within 30 days
                </p>
            </div>

        </div>
    </div>

    </section>
  </>
  );
}
