import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../Services/note.service';
import { NoteModel } from '../../Model/Note';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-note',
  imports: [DatePipe],
  templateUrl: './note.html',
  styleUrl: './note.scss',
})

export class Note implements OnInit {
  noteData: NoteModel | null = null;
  renderedContent: SafeHtml | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getNote(id);
    });
  }

  getNote(id: number): void {
    this.noteService.getNote(id).subscribe((data) => {
      this.noteData = data;
      if (this.noteData && this.noteData.content) {
        const raw = marked.parse(this.noteData.content);
        const clean = (DOMPurify as any).sanitize(raw);
        this.renderedContent = this.sanitizer.bypassSecurityTrustHtml(clean as string);
      } else {
        this.renderedContent = null;
      }
    });
  }
}