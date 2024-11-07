import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();

    // Set token in HttpOnly cookie for security
    return NextResponse.json(data, {
      headers: {
        'Set-Cookie': `token=${data.token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    });
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}
