import { CartResponse } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    console.log(req, req.headers)
    const token = req.headers.get("token");
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

     const response = await fetch(`${process.env.URL_API || 'https://ecommerce.routemisr.com/api/v1'}/cart`, {
                method: 'GET',
                headers: {
                    token: token
                }
            });
            const data : CartResponse = await response.json();

            return NextResponse.json(data);
}
