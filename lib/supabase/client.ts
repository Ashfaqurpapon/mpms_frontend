import { createBrowserClient } from '@supabase/ssr'
import { api } from '../api-lib'
import { ApiRouteConstant } from '../api-route-constant'

export function createClient() {
  const url = ApiRouteConstant.BASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      'Supabase URL and/or Anonymous Key are not configured. Please check your environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
    )
  }

  return createBrowserClient(url, key)
}
