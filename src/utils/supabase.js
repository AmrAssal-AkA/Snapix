import {createClient} from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;


    if (!supabaseUrl || !supabasePublishableKey) {
        throw new Error("Missing Supabase URL or Publishable Key. Please check your environment variables.");
    }


export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
});