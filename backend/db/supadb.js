import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';


dotenv.config();

// Supabase details
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const connectToDb = async () => {
  try {
    // Test connection by verifying the client object
    if (supabase) {
      console.log('Supabase connection initialized successfully!');
    } else {
      console.error('Failed to initialize Supabase connection.');
    }
  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
};

export default connectToDb;

