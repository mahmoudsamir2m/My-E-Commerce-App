"use client"
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'

export default function ProductSlider({images, altContent} : {images: string[], altContent: string}) {
  return (
    <Carousel opts={{loop : true}} plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}>
      <CarouselContent>
        {images.map((img, index) => 
        <CarouselItem key={index}>
            <Image src={img} alt={altContent} width={400} height={400} /> 
        </CarouselItem>)}
        
        
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
