import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        data?.message ||
        data?.errors?.msg ||
        "Signup failed. Please check your data and try again.";

      return NextResponse.json({ message }, { status: response.status });
    }

    // نجاح العملية
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Signup proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
