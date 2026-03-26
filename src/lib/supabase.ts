import { createClient } from '@supabase/supabase-js';

// Derived from the provided JWT ref: topqtufiivzplbqcladol
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://topqtufiivzplbqcladol.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Admin client using service role key for backend/privileged operations
 */
export const supabaseAdmin = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

/**
 * Example function to sync staff data to Supabase
 * @param staffData Array of staff objects
 */
export const syncStaffToSupabase = async (staffData: any[]) => {
  if (!supabase || !supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Skipping sync.');
    alert('Supabase credentials not found. Please set them in the Settings menu.');
    return;
  }

  const { data, error } = await supabase
    .from('staff')
    .upsert(staffData, { onConflict: 'id' });

  if (error) {
    console.error('Error syncing to Supabase:', error);
    throw error;
  }

  return data;
};
