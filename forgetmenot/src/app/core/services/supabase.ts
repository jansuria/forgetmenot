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
    return data;
  }

  async getUserNotes(userId: string) {
    const { data, error } = await this.supabase.from('notes').select('*').eq('user_id', userId);
    if (error) throw error;
    return data.map((note) => ({ userId: note.user_id, note: note.note }));
  }

  async deleteUserNote(userId: string, note: string) {
    const { data, error } = await this.supabase
      .from('notes')
      .delete()
      .eq('user_id', userId)
      .eq('note', note)
      .select();
    if (error) throw error;
    return data;
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    return this.supabase.auth.getUser();
  }
}
