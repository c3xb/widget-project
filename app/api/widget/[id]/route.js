import { NextRequest, NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const id = params.id;
  // TODO: Fetch widget configuration for this id and return NextResponse.json(...)
}