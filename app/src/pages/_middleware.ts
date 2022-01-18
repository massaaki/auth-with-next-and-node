import { NextResponse } from 'next/server';

export function middleware(req) {
  console.log('Im a middleware!y')

  return NextResponse.next();

}