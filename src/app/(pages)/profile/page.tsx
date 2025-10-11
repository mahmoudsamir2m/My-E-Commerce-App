'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Address } from '@/interfaces/address'

export default function Profile() {
  const { data: session, status, update } = useSession()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')
  const [addressName, setAddressName] = useState('')
  const [addressDetails, setAddressDetails] = useState('')
  const [addressPhone, setAddressPhone] = useState('')
  const [addressCity, setAddressCity] = useState('')
  const [addresses, setAddresses] = useState<Address[]>([])
  const [showAddressesLoading, setShowAddressesLoading] = useState(false)
  const [deletingAddresses, setDeletingAddresses] = useState<Set<string>>(new Set())
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '')
      setEmail(session.user.email || '')
      setPhone(session.user.phone || '')
    }
  }, [session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/users/updateMe/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': session?.token || ''
        },
        body: JSON.stringify({
          name,
          email,
          phone
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Profile updated successfully!')
        // Update the session to refresh user data
        await update()
      } else {
        setError(data.message || 'Failed to update profile')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }

    setLoading(false)
  }

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    console.log('Adding address with data:', {
      name: addressName,
      details: addressDetails,
      phone: addressPhone,
      city: addressCity
    })
    console.log('Token:', session?.token)

    try {
      const response = await fetch('/api/add-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': session?.token || ''
        },
        body: JSON.stringify({
          name: addressName,
          details: addressDetails,
          phone: addressPhone,
          city: addressCity
        })
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok) {
        setSuccess('Address added successfully!')
        // Clear form
        setAddressName('')
        setAddressDetails('')
        setAddressPhone('')
        setAddressCity('')
      } else {
        setError(data.message || 'Failed to add address')
      }
    } catch (err) {
      console.error('Error adding address:', err)
      setError('An error occurred. Please try again.')
    }

    setLoading(false)
  }

  const fetchAddresses = async () => {
    setError('')
    setShowAddressesLoading(true)

    try {
      const response = await fetch('/api/get-addresses', {
        method: 'GET',
        headers: {
          'token': session?.token || ''
        }
      })

      const data = await response.json()

      if (response.ok) {
        setAddresses(data.data || [])
      } else {
        setError(data.message || 'Failed to fetch addresses')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }

    setShowAddressesLoading(false)
  }

  const deleteAddress = async (id: string) => {
    setDeletingAddresses(prev => new Set([...prev, id]))
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`/api/remove-address/${id}`, {
        method: 'DELETE',
        headers: {
          'token': session?.token || ''
        }
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Address removed successfully!')
        // Refetch addresses
        fetchAddresses()
      } else {
        setError(data.message || 'Failed to remove address')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setDeletingAddresses(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': session?.token || ''
        },
        body: JSON.stringify({
          currentPassword,
          password: newPassword,
          rePassword
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Password changed successfully!')
        // Clear form
        setCurrentPassword('')
        setNewPassword('')
        setRePassword('')
      } else {
        setError(data.message || 'Failed to change password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className='flex justify-center items-start'>
      
    <div className="w-full max-w-6xl p-4 sm:p-8 bg-white shadow-xl rounded-lg">
        {/* <!-- Main Layout Grid: Navigation (Left) and Content (Right) --> */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          

            {/* <!-- LEFT COLUMN: Navigation Menu --> */}
            <div className="lg:col-span-1 border-b lg:border-r lg:border-b-0 pb-6 lg:pb-0 lg:pr-8">

                {/* <!-- Manage My Account Section --> */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Manage My Account</h3>
                    <ul className="space-y-3 text-base">
                        {/* <!-- Converted custom .nav-link.active style to direct classNamees --> */}
                        <li><a onClick={() => setActiveSection('profile')} className={activeSection === 'profile' ? "text-red-500 font-medium cursor-pointer" : "text-gray-600 hover:text-red-500 transition duration-150 cursor-pointer"}>Update Profile Data</a></li>
                        <li><a onClick={() => setActiveSection('password')} className={activeSection === 'password' ? "text-red-500 font-medium cursor-pointer" : "text-gray-600 hover:text-red-500 transition duration-150 cursor-pointer"}>Update Profile Password</a></li>
                        

                    </ul>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">My Address</h3>
                    <ul className="space-y-3 text-gray-600 text-base">
                        <li><a onClick={() => { setActiveSection('addAddress'); }} className={activeSection === 'addAddress' ? "text-red-500 font-medium cursor-pointer" : "text-gray-600 hover:text-red-500 transition duration-150 cursor-pointer"}>Add Address</a></li>
                        <li><a onClick={() => { setActiveSection('showAddresses'); fetchAddresses(); }} className={activeSection === 'showAddresses' ? "text-red-500 font-medium cursor-pointer" : "text-gray-600 hover:text-red-500 transition duration-150 cursor-pointer"}>Show My Addresses</a></li>
                    </ul>
                </div>
                {/* <!-- My Orders Section --> */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">My Orders</h3>
                    <ul className="space-y-3 text-gray-600 text-base">
                        <li><a onClick={() => setActiveSection('orders')} className={activeSection === 'orders' ? "text-red-500 font-medium cursor-pointer" : "text-gray-600 hover:text-red-500 transition duration-150 cursor-pointer"}>Orders Details</a></li>
                    </ul>
                </div>
            </div>

            {/* <!-- RIGHT COLUMN: Profile Editing Form or Orders --> */}
            <div className="lg:col-span-3">

                {/* <!-- Title --> */}
                <div className='flex justify-between'>
                  <h2 className="text-2xl font-semibold text-primary-red mb-8 border-b border-gray-100 pb-3">
                    {activeSection === 'profile' ? "Edit Your Profile" : activeSection === 'addAddress' ? "Add Address" : activeSection === 'showAddresses' ? "Your Addresses" : activeSection === 'password' ? "Change Password" : "Orders Details"}
                  </h2>
                  {status == 'authenticated' && <h2 className='text-sm text-red-500'><span className='text-black'>Welcome!</span> {session?.user.name}</h2>}
                </div>
                
                

                

                {activeSection === 'profile' ? (
                  <>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">{success}</p>}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-red focus:border-primary-red"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-red focus:border-primary-red"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-red focus:border-primary-red"
                            />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={loading}
                            className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                        </div>
                    </form>
                  </>
                ) : activeSection === 'addAddress' ? (
                  <>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">{success}</p>}

                    <form onSubmit={handleAddressSubmit} className="space-y-8">
                        <div>
                            <label htmlFor="addressName" className="block text-sm font-medium text-gray-700">Address Name</label>
                            <input
                                type="text"
                                id="addressName"
                                value={addressName}
                                onChange={(e) => setAddressName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-red focus:border-primary-red"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="addressDetails" className="block text-sm font-medium text-gray-700">Details</label>
                            <input
                                type="text"
                                id="addressDetails"
                                value={addressDetails}
                                onChange={(e) => setAddressDetails(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-red focus:border-primary-red"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="addressPhone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                id="addressPhone"
                                value={addressPhone}
                                onChange={(e) => setAddressPhone(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-red focus:border-primary-red"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="addressCity" className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                id="addressCity"
                                value={addressCity}
                                onChange={(e) => setAddressCity(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-red focus:border-primary-red"
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={loading}
                            className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
                        >
                            {loading ? 'Adding...' : 'Add Address'}
                        </button>
                        </div>
                    </form>
                  </>
                ) : activeSection === 'showAddresses' ? (
                  <>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {showAddressesLoading ? (
                      <p>Loading addresses...</p>
                    ) : addresses.length === 0 ? (
                      <p>No addresses found.</p>
                    ) : (
                      <div className="space-y-6">
                        {addresses.map((address, index) => (
                          <div key={address._id} className="border border-gray-200 rounded-md p-4 relative">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-medium">Address {index + 1}</h3>
                              <button
                                onClick={() => deleteAddress(address._id)}
                                disabled={deletingAddresses.has(address._id)}
                                className="text-red-500 hover:text-red-700 p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                title={deletingAddresses.has(address._id) ? "Deleting..." : "Delete Address"}
                              >
                                {deletingAddresses.has(address._id) ? (
                                  <svg
                                    className="animate-spin w-5 h-5 text-red-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                  </svg>
                                )}
                              </button>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Address Name</label>
                                <input
                                  type="text"
                                  value={address.name}
                                  disabled
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Details</label>
                                <input
                                  type="text"
                                  value={address.details}
                                  disabled
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                  type="tel"
                                  value={address.phone}
                                  disabled
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                  type="text"
                                  value={address.city}
                                  disabled
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : activeSection === 'password' ? (
                  <>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">{success}</p>}

                    <form onSubmit={handlePasswordSubmit} className="space-y-8">
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-red focus:border-primary-red"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-red focus:border-primary-red"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                            <input
                                type="password"
                                id="rePassword"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-red focus:border-primary-red"
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={loading}
                            className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
                        >
                            {loading ? 'Changing...' : 'Change Password'}
                        </button>
                        </div>
                    </form>
                  </>
                ) : (
                  <div className='flex justify-end'>
                    <Link href="/allorders" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 inline-block">View Orders</Link>
                  </div>
                )}
            </div>
        </div>
    </div>
    </div>

  )
}
