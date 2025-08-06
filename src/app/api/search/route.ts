import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const search = body.search

  return NextResponse.json({
    message: `You searched for "${search}"`,
  })
}