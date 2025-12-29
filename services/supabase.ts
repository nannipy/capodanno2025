
import { createClient } from '@supabase/supabase-js';
import { Dish } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export const fetchDishes = async (): Promise<Dish[]> => {
    const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .order('timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching dishes:', error);
        return [];
    }

    // Ensure dietary is properly parsed if it comes back as string/json
    return (data || []).map(d => ({
        ...d,
        dietary: typeof d.dietary === 'string' ? JSON.parse(d.dietary) : d.dietary
    }));
};

export const addDish = async (dish: Dish): Promise<Dish | null> => {
    const { data, error } = await supabase
        .from('dishes')
        .insert([dish])
        .select()
        .single();

    if (error) {
        console.error('Error adding dish:', error);
        alert('Errore durante il salvataggio del piatto');
        return null;
    }

    return data;
};
