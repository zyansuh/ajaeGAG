// src/service/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// 환경 변수에서 Supabase URL과 키 가져오기
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseKey)
