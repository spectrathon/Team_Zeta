import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://dkkcgngfjmvyzibmbmgy.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRra2Nnbmdmam12eXppYm1ibWd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxNTQwNDMsImV4cCI6MjAyNzczMDA0M30.u9hrcKHzedkoyxOrqvoEpYhfNJYbVkmNdZZ1b-adYzk"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase 