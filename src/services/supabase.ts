import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

const supabaseUrl = 'https://sqvelnvvyapcyvkpuimq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxdmVsbnZ2eWFwY3l2a3B1aW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4NDYwNzcsImV4cCI6MjAyNDQyMjA3N30.brKM1BCQKj964spaTYQ0yYYifFViPgcQvHSZu_ziKOs';
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
