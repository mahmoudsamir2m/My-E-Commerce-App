'use client'

import React, { ReactNode } from 'react'
import dynamic from 'next/dynamic'

const CartContextProvider = dynamic(() => import("@/components/Context/CartContext"), { ssr: false });
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import Navbar from '../Navbar/Navbar';
import Footerbar from '../Footerbar/Footerbar';

export default function Provider({children} : {children : ReactNode}) {
  return (
    <SessionProvider>
          <CartContextProvider>
          <Navbar />
            <main className="container mx-auto py-4 flex-grow">
              <Toaster/>
              {children}
            </main>
          <Footerbar />
        </CartContextProvider>
        </SessionProvider>
  )
}
