import { CartResponse } from "@/interfaces";
import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

     const response = await fetch(`${process.env.URL_API || 'https://ecommerce.routemisr.com/api/v1'}/cart`, {
                method: 'GET',
                headers: {
                    token: session.token
                }
            });
            const data : CartResponse = await response.json();

            return NextResponse.json(data);
}
