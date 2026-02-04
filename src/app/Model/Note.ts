  export interface NoteChecklistItem {
    id: number;
    text: string;
    checked: boolean;
  }
  
  export interface Note {
    id: number;
    title: string;
    content?: string;
    type: 'text' | 'checklist';
    checklistItems?: NoteChecklistItem[];
    date: Date;
    tag: string;
    favorited: boolean;
  }
  