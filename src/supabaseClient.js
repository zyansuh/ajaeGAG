import { createClient } from '@supabase/supabase-js'

// 본인 것 사용하기
const supabaseUrl = 'https://flbaynnqwzzeweliqljp.supabase.co'
// vite에서 env 사용하는 법
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

