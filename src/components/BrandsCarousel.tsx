"use client"

import React from 'react';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
import Image from 'next/image';
import { CategoryI } from '@/interfaces/category';

interface BrandsCarouselProps {
  brands: CategoryI[];
}

export default function BrandsCarousel({ brands }: BrandsCarouselProps) {
  const autoplay = React.useMemo(() => Autoplay({ delay: 2000 }), []);

  return (
    <Carousel opts={{ loop: true }} plugins={[autoplay]}>
      <CarouselContent>
        {brands.map((brand) => (
          <CarouselItem key={brand._id} className="md:basis-1/3 lg:basis-1/5">
            <Card>
              <Link href={`/brands/${brand._id}`}>
                <Image src={brand.image} alt={brand.name} className='w-full object-contain' width={200} height={200} />
                <CardHeader>
                  <CardTitle className="text-sm">{brand.name}</CardTitle>
                </CardHeader>
              </Link>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='bg-gray-400' />
      <CarouselNext className='bg-gray-400' />
    </Carousel>
  );
}
