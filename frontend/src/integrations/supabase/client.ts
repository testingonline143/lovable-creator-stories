// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://quyueshcewujjtjztqxh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eXVlc2hjZXd1amp0anp0cXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MjMxMDgsImV4cCI6MjA2ODA5OTEwOH0.-QKAOgwLtfWgayDMRfb66LD1vTzNGsjXIrFQM9aKue4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});