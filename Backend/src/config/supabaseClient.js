const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();


// Prefer the service role key on the backend so requests bypass RLS when appropriate.
// Set SUPABASE_SERVICE_ROLE_KEY in the backend .env (do NOT expose it to the frontend).
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

const supabase = createClient(
    process.env.SUPABASE_URL,
    supabaseKey
);


module.exports = supabase;