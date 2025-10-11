import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

export default function Footerbar() {
  return (
    <footer className="bg-black text-white pt-20">
        <div className="container mx-auto px-4 max-w-7xl">
            
            {/* <!-- TOP SECTION: 5-Column Grid (Responsive) --> */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 pb-16 border-b border-gray-800">

                {/* <!-- 1. EXCLUSIVE (SUBSCRIBE) --> */}
                <div>
                    <h3 className="text-2xl font-bold mb-6">Exclusive</h3>
                    <p className="text-xl font-semibold mb-4">Subscribe</p>
                    <p className="text-sm text-gray-400 mb-4">Get 10% off your first order</p>
                    
                    {/* <!-- Email Subscription Input --> */}
                    <div className="email-input-group flex border-b border-white items-center pb-1">
                        <input type="email" placeholder="Enter your email" className="bg-transparent border-none text-white placeholder-gray-400 focus:outline-none w-full text-sm py-1 pr-2" />
                        {/* <!-- Icon Placeholder (using simple SVG for the send arrow) --> */}
                        <IoIosSend />
                    </div>
                </div>

                {/* <!-- 2. SUPPORT --> */}
                <div>
                    <p className="text-xl font-semibold mb-6">Support</p>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
                        <li><a href="mailto:exclusive@gmail.com" className="hover:text-primary-red">exclusive@gmail.com</a></li>
                        <li><a href="tel:+88015-88888-9999" className="hover:text-primary-red">+88015-88888-9999</a></li>
                    </ul>
                </div>

                {/* <!-- 3. ACCOUNT --> */}
                <div>
                    <p className="text-xl font-semibold mb-6">Account</p>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-primary-red transition duration-150 text-gray-400">My Account</a></li>
                        <li><a href="#" className="hover:text-primary-red transition duration-150 text-gray-400">Login / Register</a></li>
                        <li><a href="#" className="hover:text-primary-red transition duration-150 text-gray-400">Cart</a></li>
                        <li><a href="#" className="hover:text-primary-red transition duration-150 text-gray-400">Wishlist</a></li>
                        <li><a href="#" className="hover:text-primary-red transition duration-150 text-gray-400">Shop</a></li>
                    </ul>
                </div>

                {/* <!-- 4. QUICK LINK --> */}
                <div>
                    <p className="text-xl font-semibold mb-6">Quick Link</p>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-primary-red transition duration-150 text-gray-400">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-primary-red transition duration-150 text-gray-400">Terms Of Use</a></li>
                        <li><a href="#" className="hover:text-primary-red transition duration-150 text-gray-400">FAQ</a></li>
                        <li><a href="#" className="hover:text-primary-red transition duration-150 text-gray-400">Contact</a></li>
                    </ul>
                </div>

                {/* <!-- 5. DOWNLOAD APP --> */}
                <div>
                    <p className="text-xl font-semibold mb-6">Download App</p>
                    <p className="text-xs text-gray-400 mb-2">Save $3 with App New User Only</p>
                    
                    <div className="flex items-start space-x-2">
                        {/* <!-- QR Code Placeholder --> */}
                        <img src="https://placehold.co/100x100/1A1A1A/FAFAFA?text=QR+Code" alt="QR Code" className="w-24 h-24" />
                        
                        <div className="flex flex-col space-y-1 mt-1">
                            {/* <!-- Google Play Badge Placeholder --> */}
                            <button className='cursor-pointer border rounded p-1 flex items-center gap-0.5'>

                              <FaGooglePlay />
                                <h4>Google Play</h4>
                            </button>
                            {/* <!-- App Store Badge Placeholder --> */}
                            
                            <button className='cursor-pointer border rounded p-1 flex items-center gap-0.5'>

                              <FaApple />
                                <h4>App Store</h4>
                            </button>
                        </div>
                    </div>

                    {/* <!-- Social Media Icons (using text/Unicode as placeholders) --> */}
                    <div className="flex space-x-6 mt-6 text-xl">
                        <a href="#" className="hover:text-primary-red transition duration-150"><FaFacebookF /></a> 
                        <a href="#" className="hover:text-primary-red transition duration-150"><CiTwitter /></a>
                        <a href="#" className="hover:text-primary-red transition duration-150"><FaInstagram /></a> 
                        <a href="#" className="hover:text-primary-red transition duration-150"><FaLinkedinIn /></a> 
                    </div>
                </div>
            </div>

            {/* <!-- BOTTOM SECTION: COPYRIGHT --> */}
            <div className="text-center py-6">
                <p className="text-sm text-gray-500">&copy; Copyright Rimel 2022. All right reserved.</p>
            </div>

        </div>
    </footer>
  )
}
