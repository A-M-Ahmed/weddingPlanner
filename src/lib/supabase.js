import { createClient } from "@supabase/supabase-js";


const SUPABASE_url = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_url, SUPABASE_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true
    },
    realtime: {
        eventsPerSecond: 10
    }
})

export default supabase