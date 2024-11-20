import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // .env 파일에서 가져옴
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // .env 파일에서 가져옴

// 디버깅용 로그
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
