import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SupabaseService } from '../services/supabase';
import { Note } from '../../shared/models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private apiUrl = `${environment.apiUrl}/api/notes`;

  private readonly http = inject(HttpClient);
  private readonly supabaseService = inject(SupabaseService);

  private getHeaders(): Observable<HttpHeaders> {
    return from(this.supabaseService.getSession()).pipe(
      switchMap((session) => [
        new HttpHeaders({
          Authorization: `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        }),
      ]),
    );
  }

  getNotes(): Observable<Note[]> {
    return this.getHeaders().pipe(
      switchMap((headers) => this.http.get<Note[]>(this.apiUrl, { headers })),
    );
  }

  createNote(userNote: string): Observable<Note> {
    return this.getHeaders().pipe(
      switchMap((headers) => this.http.post<Note>(this.apiUrl, { userNote }, { headers })),
    );
  }

  deleteNote(id: number): Observable<void> {
    return this.getHeaders().pipe(
      switchMap((headers) => this.http.delete<void>(`${this.apiUrl}/${id}`, { headers })),
    );
  }
}
