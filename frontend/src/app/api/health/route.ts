import { NextResponse } from 'next/server';

/**
 * Health check endpoint supporting HEAD and GET HTTP methods.
 * Responds with HTTP 200 OK and X-Health-Status header.
 */
export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Health-Status': 'OK',
      'Cache-Control': 'no-cache, no-store',
    },
  });
}

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      service: 'itsoftlab360-frontend',
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        'X-Health-Status': 'OK',
      },
    }
  );
}
