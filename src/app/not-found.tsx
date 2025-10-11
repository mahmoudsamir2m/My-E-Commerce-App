import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="font-sans bg-white min-h-screen flex items-center justify-center p-4">

    {/* <!-- Error Content Container --> */}
    <div className="text-center max-w-lg">
        
        {/* <!-- Main Error Code and Message --> */}
        <h1 className="text-2xl sm:text-9xl font-extrabold text-gray-900 mb-6 tracking-tight">
            404 Not Found
        </h1>
        
        {/* <!-- Subtext/Description --> */}
        <p className="text-lg text-gray-700 mb-10 mx-auto max-w-xs">
            Your visited page not found. You may go home page.
        </p>

        {/* <!-- Call to Action Button --> */}
        <Link href="/" 
           className="inline-block bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-10 rounded-md shadow-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
            Back to home page
        </Link>
    </div>

</div>
  )
}
