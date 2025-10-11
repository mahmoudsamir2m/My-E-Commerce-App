"use client"
import React, { useContext, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from '../ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '../ui/dropdown-menu';
import { HeartIcon, Loader2, Menu, SearchIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { CartContext } from '../Context/CartContext';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {

    const {isLoading, cartData} = useContext(CartContext);
    const session = useSession();
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    console.log("navbar session", session);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm('');
        }
    };
    
    

  return (
    <>
        <p className='bg-black text-white text-center text-sm py-2'>
            Summer Sal For All Swim Suits And Free Express Delivery-OFF 50%! <Link href="/products" className='underline'>ShopNow</Link>
        </p>
        <nav className='border-b bg-white shadow sticky top-0 z-10'>
            <div className='container mx-auto'>
                <div className='flex items-center justify-between py-4'>
                    <h1><Link href='/' >Exclusive</Link></h1>
                        

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="hidden md:flex items-center gap-8">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/" className='hover:bg-white hover:underline hover:text-black focus:bg-white focus:text-black'>Home</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/contact" className='hover:bg-white hover:underline hover:text-black focus:bg-white focus:text-black'>Contact</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/products" className='hover:bg-white hover:underline hover:text-black focus:bg-white focus:text-black'>Products</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        
                    </div>

                    <div className='hidden md:flex items-center gap-2 '>
                        
<DropdownMenu>
    <form onSubmit={handleSubmit} className='flex items-center '>
                            <input
                                type='text'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder='Search products...'
                                className='border px-2 py-1 w-64 border-r-0 '
                            />
                            <button type='submit' className=' text-black px-3 py-1 flex items-center border border-l-0'>
                                <SearchIcon size={24} />
                            </button>
                        </form>
                        <DropdownMenuTrigger className='outline-0 cursor-pointer'> <UserIcon /> </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {session.status == 'authenticated' ? <>
                                <Link href={"/profile"}>
                                    <DropdownMenuItem>profile</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem onClick={ ()=> signOut({
                                    callbackUrl: '/login'
                                })} className='cursor-pointer'>Logout</DropdownMenuItem>
                                </> : 
                                <>
                                <Link href={"/login"}>
                                    <DropdownMenuItem className='cursor-pointer'>Login</DropdownMenuItem>
                                </Link>
                                <Link href={"/register"}>
                                    <DropdownMenuItem className='cursor-pointer'>Register</DropdownMenuItem>
                                </Link>
                                </>
                                }
                                
                            </DropdownMenuContent>
                        </DropdownMenu>

                            {session.status == 'authenticated' && 

                            <>
                                <Link href={"/wishlist"}>
                                    <HeartIcon />
                                </Link>
                            <Link href={'/cart'} className='p-3 relative'>
                                <ShoppingCartIcon />
                                <Badge
                                className="h-5 min-w-5 rounded-full flex justify-center items-center absolute top-0 end-0"
                                variant="destructive"
                                >
                                
                                <span>{ isLoading ? <Loader2 className='animate-spin size-4'/> : cartData?.numOfCartItems}</span>
                                </Badge>
                            </Link>
                            </>}
                            
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg z-50 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-105 opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'}`}>
                    <div className="p-4 space-y-4">
                        <nav className="space-y-2">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-black hover:underline">Home</Link>
                            <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-black hover:underline">Products</Link>
                            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-black hover:underline">Contact</Link>
                        </nav>

                        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                            <input
                                type='text'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder='Search products...'
                                className='border rounded px-2 py-1 w-full'
                            />
                            <button type='submit' className='bg-black text-white px-3 py-1 rounded flex items-center justify-center gap-1 w-full'>
                                <SearchIcon size={16} />
                                Search
                            </button>
                        </form>

                        <div className='flex flex-col gap-2 pt-2 border-t'>
                            <DropdownMenu>
                                <DropdownMenuTrigger className='w-full text-left outline-0 cursor-pointer py-2'> <UserIcon className="inline mr-2" size={20} /> Account</DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full">
                                    {session.status == 'authenticated' ? <>
                                    <Link href={"/profile"} onClick={() => setIsMobileMenuOpen(false)}>
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem onClick={ () => { signOut({ callbackUrl: '/login' }); setIsMobileMenuOpen(false); }} className='cursor-pointer'>Logout</DropdownMenuItem>
                                    </> :
                                    <>
                                    <Link href={"/login"} onClick={() => setIsMobileMenuOpen(false)}>
                                        <DropdownMenuItem className='cursor-pointer'>Login</DropdownMenuItem>
                                    </Link>
                                    <Link href={"/register"} onClick={() => setIsMobileMenuOpen(false)}>
                                        <DropdownMenuItem className='cursor-pointer'>Register</DropdownMenuItem>
                                    </Link>
                                    </>
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>

                                {session.status == 'authenticated' &&
                                <>
                                    <Link href={"/wishlist"} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-black hover:underline">
                                        <HeartIcon size={20} /> Wishlist
                                    </Link>
                                    <Link href={'/cart'} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-black hover:underline relative">
                                        <ShoppingCartIcon size={20} />
                                        Cart
                                        <Badge
                                        className="h-5 min-w-5 rounded-full flex justify-center items-center absolute top-0 right-0 -translate-y-1/2 translate-x-1/2"
                                        variant="destructive"
                                        >
                                        <span>{ isLoading ? <Loader2 className='animate-spin size-3'/> : cartData?.numOfCartItems}</span>
                                        </Badge>
                                    </Link>
                                </>}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
    
  )
}
