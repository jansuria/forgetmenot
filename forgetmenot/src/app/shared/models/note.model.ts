export interface Note {
  id: number;
  userNote: string;
  createdAt: string;
}

export interface NoteState {
  notes: Note[];
  loading: boolean;
  gridViewable: boolean,
  error: unknown;
}
