import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SupabaseService } from '../services/supabase';

@Injectable({
  providedIn: 'root',
})
export class CommandsService {
  private apiUrl = `${environment.apiUrl}/api/commands`;

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

  dispatchCommand(input: string): Observable<unknown> {
    return this.getHeaders().pipe(
      switchMap((headers) => this.http.post<unknown>(this.apiUrl, { input }, { headers })),
    );
  }
}
