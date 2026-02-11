import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../Services/note.service';
import { NoteModel } from '../../Model/Note';
import { NgClass } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../Model/User';
import { faStar, faGear, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getTagColorClass } from '../../Utils/Utils';

@Component({
  selector: 'app-note',
  imports: [FontAwesomeModule, NgClass],
  templateUrl: './note.html',
  styleUrl: './note.scss',
})

export class Note implements OnInit {

  iconStar = faStar;
  iconGear = faGear;
  iconTag = faTag;

  currentUser: User | null = null;

  noteData: NoteModel | null = null;
  renderedContent: SafeHtml | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.currentUser = this.authService.getCurrentUser();

    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getNote(id);
    });
  }

  getTagColor(): string {
    return this.noteData ? getTagColorClass(this.noteData.tag) : 'color-default';
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

  hasImage(): boolean {

    const content = this.noteData?.content;

    if (!content) return false;

    const mdImageRegex = /!\[.*?\]\((.*?)\)/i;
    const urlImageRegex = /https?:\/\/\S+\.(png|jpe?g|gif|webp)(\?\S*)?/i;
    const mdMatch = content.match(mdImageRegex);

    if (mdMatch && mdMatch[1] && urlImageRegex.test(mdMatch[1])) return true;

    if (urlImageRegex.test(content)) return true;

    return false;
  }

}