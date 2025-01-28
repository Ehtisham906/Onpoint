import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';


dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const connectToDb = async () => {
  try {
    if (supabase) {
      console.log('Supabase connection initialized successfully!');
    } else {
      console.error('Failed to initialize Supabase connection.');
    }
  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
};


