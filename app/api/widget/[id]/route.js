import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request, { params }) {
  const { id } = await params;

  // Fetch the latest approved review from Supabase
  const { data, error } = await supabase
    .from('reviews')
    .select('customer_name, content, rating')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
   

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return the fetched record
  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}