import { createClient } from '@supabase/supabase-js';

// 본인 것 사용하기
const supabaseUrl = 'https://gotfpvrpusieiwuktrjg.supabase.co'; 
// vite에서 env 사용하는 법
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase