import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project URL and Anon API key
const supabaseUrl = 'https://supabase.co'
const supabaseAnonKey = 'your-anon-public-api-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
