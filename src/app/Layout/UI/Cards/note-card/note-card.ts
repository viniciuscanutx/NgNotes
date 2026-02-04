import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faShareFromSquare,
  faHeart,
  faTag,
  faSquare,
  faSquareCheck,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { Note, NoteChecklistItem } from '../../../../Model/Note';

@Component({
  selector: 'app-note-card',
  imports: [FontAwesomeModule, DatePipe],
  templateUrl: './note-card.html',
  styleUrl: './note-card.scss',
})

export class NoteCard {

  @Input() note!: Note;
  @Output() toggleFavorite = new EventEmitter<Note>();
  @Output() shareNote = new EventEmitter<Note>();
  @Output() toggleChecklistItem = new EventEmitter<{ note: Note; item: NoteChecklistItem }>();
  @Output() editNote = new EventEmitter<Note>();

  iconShare = faShareFromSquare;
  iconEdit = faPencil;
  iconHeart = faHeart;
  iconTag = faTag;
  iconSquare = faSquare;
  iconSquareCheck = faSquareCheck;

  getCardColorClass(): string {
    const tagColors: Record<string, string> = {
      'Design': 'color-design',
      'Medicine': 'color-medicine',
      'Sport': 'color-sport',
      'Finance': 'color-finance',
      'Work': 'color-work',
    };
    return tagColors[this.note.tag] || 'color-default';
  }

  onToggleFavorite(): void {
    this.toggleFavorite.emit(this.note);
  }

  onShareNote(): void {
    this.shareNote.emit(this.note);
  }

  onEditNote(): void {
    this.editNote.emit(this.note);
  }

  onToggleChecklistItem(item: NoteChecklistItem): void {
    this.toggleChecklistItem.emit({ note: this.note, item });
  }
}
