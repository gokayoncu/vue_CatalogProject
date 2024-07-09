import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePassword = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl,supabasePassword)

export default supabase