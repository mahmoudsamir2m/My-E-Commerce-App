'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Loading from '@/app/loading'
import { OrderResponse } from '@/interfaces/order'
import { Package, Truck, CreditCard } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function AllOrders() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [ordersData, setOrdersData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/login')
      return
    }
    fetchOrders()
  }, [session, status, router])

  async function fetchOrders() {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/get-all-orders')
      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }
      const data = await response.json()
      setOrdersData(data)
    } catch (error) {
      console.error('Orders fetch error:', error)
      setError(error.message)
      toast.error('Failed to load orders')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return <Loading />
  }

  if (!session) {
    return null // Redirect handled in useEffect
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error loading orders: {error}</div>
  }

  const orders = ordersData || []

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-4">Start shopping to place your first order!</p>
            <Link
              href="/products"
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order._id} className="w-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order #{order._id.slice(-8)}</CardTitle>
                      <CardDescription>
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">EGP {order.totalOrderPrice}</p>
                      <p className={`text-sm ${order.isDelivered ? 'text-green-600' : 'text-yellow-600'}`}>
                        {order.isDelivered ? 'Delivered' : 'Processing'}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Order Items */}
                    <div className="lg:col-span-2">
                      <h3 className="font-semibold mb-4">Items</h3>
                      <div className="space-y-4">
                        {order.cartItems.map((item, index) => (
                          <div key={index} className="flex items-center space-x-4 border-b pb-4">
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title}
                              width={80}
                              height={80}
                              className="rounded-md object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.product.title}</h4>
                              <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                              <p className="text-sm text-gray-600">Price: EGP {item.price}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">EGP {item.price * item.count}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Truck size={16} />
                          Shipping Address
                        </h3>
                        <p className="text-sm text-gray-600">
                          {order.shippingAddress.details}, {order.shippingAddress.city}
                        </p>
                        <p className="text-sm text-gray-600">{order.shippingAddress.phone}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <CreditCard size={16} />
                          Payment Method
                        </h3>
                        <p className="text-sm text-gray-600 capitalize">{order.paymentMethodType}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
