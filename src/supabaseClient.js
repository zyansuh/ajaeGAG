import { createClient } from '@supabase/supabase-js';

const supabaseUrl = '(수파베이스 프로젝트 url)';
const supabaseAnonKey = '(Supabase Anon Key)'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);