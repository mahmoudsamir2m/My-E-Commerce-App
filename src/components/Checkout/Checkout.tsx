import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from 'next-auth/react'
import { CartContext } from '@/components/Context/CartContext'

export default function Checkout({cartId} : { cartId: string}) {
    const { data: session } = useSession()
    const { setCartData } = useContext(CartContext)

    const [details, setDetails] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    async function checkoutSession() {
        setIsProcessing(true);
        console.log('Checkout session started')
        if (!session?.token) {
            alert('Please login to proceed with checkout')
            setIsProcessing(false);
            return
        }
        console.log('Session token available:', !!session.token)
              const shippingAddress = {
                details: details,
                city: city,
                phone: phone,
              }
              console.log('Shipping address:', shippingAddress);


        const successUrl = process.env.NODE_ENV === 'production'
          ? 'https://route-e-commerce-mjrp.vercel.app/allorders?payment=success'
          : `${window.location.origin}/allorders?payment=success`;
        console.log('Making API request to:', `${process.env.URL_API || 'https://ecommerce.routemisr.com/api/v1'}/orders/checkout-session/${cartId}?url=${encodeURIComponent(successUrl)}`)
        const response = await fetch(`${process.env.URL_API || 'https://ecommerce.routemisr.com/api/v1'}/orders/checkout-session/${cartId}?url=${encodeURIComponent(successUrl)}`, {
            method: 'POST',
            body : JSON.stringify({shippingAddress}),
            headers: {
                    token : session.token,
                    "content-Type": "application/json"
                }
              });
              console.log('Response status:', response.status)
              const data = await response.json();
              console.log('Response data:', data)


              if (data.status == 'success') {
                console.log('Redirecting to:', data.session.url)
                // Ensure absolute URL for redirect to avoid path duplication
                location.href = new URL(data.session.url, window.location.origin).toString();

            } else {
                console.log('Checkout failed:', data.message || 'Unknown error')
                alert('Checkout failed: ' + (data.message || 'Unknown error'))
            }
        }

    async function cashOnDelivery() {
        setIsProcessing(true);
        if (!session?.token) {
            alert('Please login to proceed with checkout')
            setIsProcessing(false);
            return
        }
        const shippingAddress = {
            details: details,
            city: city,
            phone: phone,
        }
        console.log(shippingAddress);

        const response = await fetch('/api/create-cash-order', {
            method: 'POST',
            body: JSON.stringify({
                cartId,
                shippingAddress
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();

        if (data.status === 'success') {
            setCartData(null);
            location.href = `${window.location.origin}/allorders`;
        } else {
            alert('Failed to create order: ' + (data.message || 'Unknown error'));
            setIsProcessing(false);
        }
    }
    

  return (
    <>
        

        <Dialog>
      <form>
        <DialogTrigger asChild>
                <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-md transition-colors w-full cursor-pointer">
                        Proceed to checkout
                </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription>
                Please Add Shipping Address
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="details">Details</Label>
              <Input id="details" value={details} onChange={(e) => setDetails(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

          </div>
          <DialogFooter>
            <Button onClick={cashOnDelivery} disabled={isProcessing} type="button" className='cursor-pointer' variant="outline">Cash on delivery</Button>
            <Button onClick={checkoutSession} disabled={isProcessing} className='bg-red-500 hover:bg-red-600 cursor-pointer' type="button">Bank</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    </>
  )
}
