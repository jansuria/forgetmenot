import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async createNote(userId: string, note: string) {
    const { data, error } = await this.supabase
      .from('notes')
      .insert({ user_id: userId, note })
      .select();
    if (error) throw error;
    console.log(data);
    return data;
  }
}
