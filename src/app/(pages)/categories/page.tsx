import React from 'react';
import BrandsCarousel from '@/components/BrandsCarousel';
import { CategoryI } from '@/interfaces/category';

export default async function Categories() {
  const categoriesResponse = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
    next: { revalidate: 10 * 60 }
  });
  const { data: categories }: { data: CategoryI[] } = await categoriesResponse.json();

  return (
    <section className="p-8">
      <div className="flex gap-3 items-center mb-4">
        <span className="w-8 h-10 bg-red-600 rounded"></span>
        <h1 className="font-bold text-red-600 text-2xl">Categories</h1>
      </div>
      <h2 className="my-5 font-bold text-xl">Browse By Category</h2>
      <BrandsCarousel brands={categories} />
    </section>
  );
}
