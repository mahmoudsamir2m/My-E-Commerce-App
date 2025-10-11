"use client"
import Loading from '@/app/loading';
import { WishlistResponse } from '@/interfaces/Wishlist';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CartContext } from '@/components/Context/CartContext';

export default function Wishlist() {
  const { data: session, status } = useSession();
  const { getCart } = useContext(CartContext);
  const router = useRouter();
  const [wishlistData, setWishlistData] = useState<WishlistResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
      return;
    }
    fetchWishlist();
  }, [session, status, router]);

  async function fetchWishlist() {
    setIsLoading(true);
    try {
      const response = await fetch('/api/get-wishlist');
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }
      const data: WishlistResponse = await response.json();
      setWishlistData(data);
    } catch (error) {
      console.error('Wishlist fetch error:', error);
      toast.error('Failed to load wishlist');
    } finally {
      setIsLoading(false);
    }
  }

  async function removeWishlistItem(itemId: string) {
    setRemovingId(itemId);
    try {
      const response = await fetch('/api/remove-wishlist', {
        method: 'DELETE',
        body: JSON.stringify({ productId: itemId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.status === 'success') {
        toast.success('Item removed from wishlist');
        fetchWishlist(); // Refetch to update
      } else {
        throw new Error(data.message || 'Failed to remove item');
      }
    } catch (error) {
      console.error('Remove wishlist error:', error);
      toast.error('Failed to remove item');
    } finally {
      setRemovingId(null);
    }
  }

  async function addToCart(productId: string) {
    if (!session?.token) {
      toast.error('Please login to add to cart');
      return;
    }
    try {
      const response = await fetch('/api/add-cart', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.status === 'success') {
        toast.success('Added to cart');
        getCart();
        // Optionally remove from wishlist or navigate to cart
      } else {
        throw new Error(data.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Failed to add to cart');
    }
  }

  if (status === 'loading' || isLoading) {
    return <Loading />;
  }

  if (!session) {
    return null; // Redirect handled in useEffect
  }

  const wishlistItems = wishlistData?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
            <Link
              href="/products"
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <Image
                    src={item.imageCover}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    width={300}
                    height={192}
                  />
                  <button
                    onClick={() => removeWishlistItem(item._id)}
                    disabled={removingId === item._id}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:opacity-50"
                  >
                    {removingId === item._id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Trash2 size={16} className='cursor-pointer'/>
                    )}
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">EGP {item.price}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(item._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    
    </div>
  );
}
