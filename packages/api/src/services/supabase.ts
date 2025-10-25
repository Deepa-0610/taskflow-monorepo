import { createClient } from '@supabase/supabase-js'

const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID || ''
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''

export const supabaseClient = createClient(url, publishableKey)