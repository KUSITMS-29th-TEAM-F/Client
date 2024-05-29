import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  return NextResponse.json({ token: cookies().get('access_token') });
}

export async function POST(request: Request) {
  const { code } = await request.json();

  cookies().set('access_token', code, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json(cookies().get('access_token'));
}
