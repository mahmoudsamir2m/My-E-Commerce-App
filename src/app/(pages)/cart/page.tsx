"use client"
import Loading from '@/app/loading';
import Checkout from '@/components/Checkout/Checkout';
import { CartContext } from '@/components/Context/CartContext';
import { CartResponse } from '@/interfaces';
import { Loader2, TrashIcon } from 'lucide-react';
import Link from 'next/link'
import Image from 'next/image'
import React, { useContext } from 'react'
import { useState } from "react"
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function Cart() {
  const { data: session } = useSession()

  const [showMessage, setShowMessage] = useState(false);
  const { cartData, isLoading, getCart, setCartData } = useContext(CartContext)

  const [removingId, setRemovingId] = useState<string | null>(null);
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  if (cartData == null || (cartData?.data?.products && typeof cartData?.data?.products[0]?.product == 'string')) {getCart()}

  const handleApply = () => {
    setShowMessage(true);
  };

  async function removeCartItem(productId: string) {
    if (!session?.token) {
      toast.error("Please login to manage cart")
      return
    }
    setRemovingId(productId);
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        method: 'DELETE',
        headers: {
                token : session.token,

            }
          });
          const data: CartResponse = await response.json();

          if (data.status == 'success') {
            toast.success("Product Removed Successfully");
            setCartData(data);
          }
          setRemovingId(null);
        }

  async function clearCart() {
    if (!session?.token) {
      toast.error("Please login to manage cart")
      return
    }
    setIsClearing(true);
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/`, {
        method: 'DELETE',
        headers: {
                token : session.token,

            }
          });
          const data: CartResponse = await response.json();

          if (data.message == 'success') {
            setCartData(null);
          }
          setIsClearing(false);
        }

  async function updatCartItemCount(productId: string, count : number) {
    if (!session?.token) {
      toast.error("Please login to manage cart")
      return
    }
    setUpdateId(productId);
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        method: 'PUT',
        body : JSON.stringify({count}),
        headers: {
                token : session.token,
                "content-Type": "application/json"
            }
          });
          const data: CartResponse = await response.json();

          if (data.status == 'success') {
            toast.success("Product Quantity Updated Successfully");
            setCartData(data);
          }
          setUpdateId(null);
        }

        


  return (
    <>
    {isLoading || typeof cartData?.data.products[0]?.product == 'string' ? <Loading /> : (cartData?.numOfCartItems ?? 0) > 0 ? <div className='mt-10'>      

      {/* Main Cart Content */}
      <div className="px-4 sm:px-8 md:px-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Table Section */}
          <div className="lg:col-span-2">
            {/* Table Headers */}
            <div className="hidden sm:grid grid-cols-6 gap-4 font-semibold p-4 shadow sticky top-20 self-start bg-white z-10">
              <div className="col-span-2">Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
              <div>Remove</div>
            </div>

            {/* Product */}
            {cartData?.data.products.map((item) => 
            <div key={item._id} className="grid grid-cols-1 sm:grid-cols-6 items-center gap-4 py-6 border-b border-gray-200">
              <div className="flex items-center space-x-4 col-span-2">
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="rounded-sm w-16"
                  width={64}
                  height={64}
                />
                <span className="font-medium">{item.product.title.split(" ", 3).join(" ")}</span>
              </div>
              <div className="text-gray-500">EGP {item.price}</div>
              <div className="flex items-center space-x-2">
      {/* Decrease Button */}
      <button
        onClick={() => updatCartItemCount(item.product._id, item.count - 1)}
        disabled={item.count === 1}
        className={`size-8 rounded-lg border transition 
          ${item.count === 1 
            ? "opacity-50 cursor-not-allowed" 
            : "hover:bg-red-500 hover:text-white cursor-pointer"}`}
      >
        -
      </button>

      {/* Count Display */}
      <span className="w-8 text-center">{updateId === item.product._id ? <Loader2 className='animate-spin' /> : item.count}</span>

      {/* Increase Button */}
      <button
        onClick={() => updatCartItemCount(item.product._id, item.count + 1)}
        className="size-8 rounded-lg border hover:bg-green-500 hover:text-white cursor-pointer"
      >
        +
      </button>
    </div>
              <div className="font-medium">EGP {item.price * item.count}</div>
              <div className="flex items-center">
                <button onClick={() => removeCartItem(item.product.id)} className="text-red-500 hover:text-red-700 cursor-pointer">
                  {removingId == item.product.id ? <Loader2 className='animate-spin' /> : <TrashIcon size={22}/> } 

                </button>
              </div>
            </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <Link
                href="/products"
                className="border border-gray-300 hover:bg-gray-100 text-gray-800 py-3 px-6 rounded-md transition-colors "
              >
                Return To Shop
              </Link>
              <button onClick={clearCart} className="flex gap-2 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-md transition-colors cursor-pointer">
                {isClearing && <Loader2 className='animate-spin' />} Clear Cart
              </button>
            </div>
          </div>

          {/* Coupon and Totals Section */}
          <div className="lg:col-span-1 flex flex-col space-y-8 sticky top-20 self-start">
            {/* Coupon Code */}
            <div className="flex flex-col sm:flex-row items-stretch sm:space-x-4 mt-8 lg:mt-0">
              <input
                type="text"
                placeholder="Coupon Code"
                className="flex-grow border border-gray-400 rounded-sm p-3 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <button onClick={handleApply} className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-md transition-colors mt-4 sm:mt-0 cursor-pointer">
                Apply Coupon
              </button>
              
            </div>
            {showMessage && (
              <p className="text-red-600">Coupon Not Available</p>
            )}

            {/* Cart Total */}
            <div className="border border-gray-400 rounded-sm p-6">
              <h2 className="text-2xl font-semibold mb-4">Cart Total</h2>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Subtotal:</span>
                <span className="font-medium">EGP {cartData?.data.totalCartPrice}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Shipping:</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between py-2 mb-4">
                <span>Total:</span>
                <span className="font-medium">EGP {cartData?.data.totalCartPrice}</span>
              </div>
              <Checkout cartId={cartData?.cartId ?? ''}/>
            </div>
          </div>
        </div>
      </div>
    </div> : <div className="flex flex-col justify-center items-center gap-6">
      <h2 className='text-center text-2xl mt-20'>Your Cart Is Empty, </h2>
      <Link href={'/products'} className='bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-md transition-colors'>Go Shopping</Link>
      </div> }
      </>

  )
}
