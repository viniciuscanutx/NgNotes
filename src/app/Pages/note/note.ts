import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../Services/note.service';
import { NoteModel } from '../../Model/Note';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../Model/User';
import { faStar, faGear, faTag, faSave, faArrowLeft, faBold, faItalic, faListUl, faLink, faHeading, faQuoteRight, faCode, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getTagColorClass } from '../../Utils/Utils';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-note',
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './note.html',
  styleUrl: './note.scss',
})

export class Note implements OnInit {

  iconStar = faStar;
  iconGear = faGear;
  iconTag = faTag;
  
  // Toolbar Icons
  iconBold = faBold;
  iconItalic = faItalic;
  iconList = faListUl;
  iconLink = faLink;
  iconHeading = faHeading;
  iconQuote = faQuoteRight;
  iconCode = faCode;
  iconEye = faEye;
  iconEyeSlash = faEyeSlash;

  @ViewChild('noteContent') textareaRef!: ElementRef<HTMLTextAreaElement>;
  
  // Save status indicator
  saveStatus: 'Saved' | 'Saving...' | 'Error' = 'Saved';

  currentUser: User | null = null;
  noteForm: FormGroup;
  isEditMode = false;
  isPreviewMode = false;

  noteData: NoteModel | null = null;
  renderedContent: SafeHtml | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      tag: ['Trabalho', Validators.required],
      content: ['']
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.route.params.subscribe(params => {
        const idParam = params['id'];
        if (idParam) {
            const id = +idParam;
            if (!isNaN(id)) {
                this.isEditMode = true;
                this.getNote(id);
            }
        }
    });

    this.setupAutoSave();
  }

  setupAutoSave(): void {
    this.noteForm.valueChanges.pipe(
        debounceTime(2000), 
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    ).subscribe(() => {
        this.saveNote();
    });
  }

  getTagColor(): string {
     const tag = this.noteForm.get('tag')?.value;
     return getTagColorClass(tag);
  }

  getNote(id: number): void {
    this.noteService.getNote(id).subscribe((data) => {
      if (data) {
        this.noteData = data;
        this.noteForm.patchValue({
            title: data.title,
            subtitle: data.subtitle,
            tag: data.tag,
            content: data.content
        });
        
        if (this.noteData.content) {
          this.updateRenderedContent(this.noteData.content);
        }
      }
    });
  }

  updateRenderedContent(content: string) {
      if (!content) {
          this.renderedContent = null;
          return;
      }
      const raw = marked.parse(content);
      const clean = (DOMPurify as any).sanitize(raw);
      this.renderedContent = this.sanitizer.bypassSecurityTrustHtml(clean as string);
  }

  saveNote(): void {
    if (this.noteForm.valid && this.currentUser) {
        this.saveStatus = 'Saving...';
        const formValue = this.noteForm.value;
        const noteToSave: NoteModel = {
            id: this.isEditMode && this.noteData ? this.noteData.id : 0, 
            userId: this.currentUser.id,
            title: formValue.title || 'Untitled',
            subtitle: formValue.subtitle,
            tag: formValue.tag,
            content: formValue.content,
            date: new Date(),
            favorited: this.isEditMode && this.noteData ? this.noteData.favorited : false
        };

        const saveObservable = this.isEditMode 
            ? this.noteService.updateNote(noteToSave)
            : this.noteService.addNote(noteToSave);

        saveObservable.subscribe({
            next: (savedNote) => {
                this.saveStatus = 'Saved';
                if (!this.isEditMode && savedNote) {
                    this.isEditMode = true;
                    this.noteData = savedNote;
                }
            },
            error: () => {
                this.saveStatus = 'Error';
            }
        });
    }
  }

  adjustTextareaHeight(event: Event): void {
      const textarea = event.target as HTMLTextAreaElement;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
  }

  toggleFavorite(): void {
      if (this.noteData) {
          this.noteData.favorited = !this.noteData.favorited;
          this.saveNote(); 
      }
  }

  togglePreview(): void {
      this.isPreviewMode = !this.isPreviewMode;
      if (this.isPreviewMode) {
          const content = this.noteForm.get('content')?.value;
          this.updateRenderedContent(content);
      }
  }

  insertMarkdown(format: string): void {
      const textarea = this.textareaRef.nativeElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = this.noteForm.get('content')?.value || '';
      const selectedText = value.substring(start, end);
      
      let replacement = '';
      let cursorOffset = 0;

      switch (format) {
          case 'bold':
              replacement = `**${selectedText}**`;
              cursorOffset = 2;
              break;
          case 'italic':
              replacement = `*${selectedText}*`;
              cursorOffset = 1;
              break;
          case 'list':
              replacement = `\n- ${selectedText}`;
              cursorOffset = 3;
              break;
          case 'link':
              replacement = `[${selectedText}](url)`;
              cursorOffset = 1; // Position inside []
              break;
          case 'heading':
              replacement = `\n# ${selectedText}`;
              cursorOffset = 3;
              break;
          case 'quote':
              replacement = `\n> ${selectedText}`;
              cursorOffset = 3;
              break;
          case 'code':
              replacement = `\`${selectedText}\``;
              cursorOffset = 1;
              break;
      }

      const newValue = value.substring(0, start) + replacement + value.substring(end);
      
      this.noteForm.patchValue({ content: newValue });
      
      // Need to defer setting selection range after Angular updates the view/value
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + cursorOffset, start + cursorOffset + (selectedText.length > 0 ? selectedText.length : 0));
        // Trigger auto-grow
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }, 0);
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