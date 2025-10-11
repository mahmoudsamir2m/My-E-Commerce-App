import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <Loader2 className='animate-spin size-20' />
    </div>
  )
}
