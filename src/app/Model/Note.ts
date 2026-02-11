export interface NoteModel {
  id: number;
  userId: number;
  title: string;
  content?: string;
  date: string | Date;
  tag: string;
  favorited: boolean;
}
  