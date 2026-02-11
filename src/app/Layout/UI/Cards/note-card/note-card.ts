import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faTag, faPencil } from '@fortawesome/free-solid-svg-icons';
import { NoteModel } from '../../../../Model/Note';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { processSnippet, getTagColorClass } from '../../../../Utils/Utils';

@Component({
  selector: 'app-note-card',
  imports: [
    FontAwesomeModule,
    DatePipe,
    RouterLink,
    RouterLinkActive],
  templateUrl: './note-card.html',
  styleUrl: './note-card.scss',
})

export class NoteCard {

  // Icons
  iconEdit = faPencil;
  iconHeart = faHeart;
  iconTag = faTag;

  // Rendered Snippet
  renderedSnippet: SafeHtml | null = null;

  // Note
  private _note!: NoteModel;

  @Input() set note(value: NoteModel) {
    this._note = value;
    this.renderedSnippet = processSnippet(value, this.sanitizer);
  }

  get note(): NoteModel {
    return this._note;
  }

  // Outputs
  @Output() toggleFavorite = new EventEmitter<NoteModel>();
  @Output() shareNote = new EventEmitter<NoteModel>();
  @Output() editNote = new EventEmitter<NoteModel>();

  constructor(private sanitizer: DomSanitizer) { }

  // Get Card Color Class
  getCardColorClass(): string {
    return getTagColorClass(this.note.tag);
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

}
