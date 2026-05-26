import {createClient} from '@supabase/supabase-js';

const supbaseProjectUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabaseClient = createClient(supbaseProjectUrl, supabasePublishableKey);