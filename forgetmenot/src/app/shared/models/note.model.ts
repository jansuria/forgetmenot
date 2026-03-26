export interface Note {
  userId: string;
  note: string;
}

export interface NoteState {
  notes: Note[];
  loading: boolean;
  error: unknown;
}
