import { Component, HostListener, ViewChild, ElementRef, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faGear, faPlus, faNoteSticky, faChevronLeft, faFileLines, faMoon, faSun, faUserPen, faRightFromBracket, faShareFromSquare, faTags, faHouse } from '@fortawesome/free-solid-svg-icons';
import { Scrollbar } from './scrollbar/scrollbar';
import { NoteModel } from '../../../Model/Note';
import { User } from '../../../Model/User';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { NoteService } from '../../../Services/note.service';
import { ThemeService } from '../../../Services/theme.service';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [
    FontAwesomeModule,
    Scrollbar,
    DatePipe,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})

export class Sidebar {

  constructor(
    private authService: AuthService,
    private router: Router,
    private noteService: NoteService,
    public themeService: ThemeService) {
    this.user = this.authService.getCurrentUser();
  }

  iconUser = faUser;
  iconGear = faGear;
  iconPlus = faPlus;
  iconLogo = faNoteSticky;
  iconChevronLeft = faChevronLeft;
  iconFileLines = faFileLines;
  iconMoon = faMoon;
  iconSun = faSun;
  iconUserPen = faUserPen;
  iconLogout = faRightFromBracket;
  iconTags = faTags;
  iconShare = faShareFromSquare;
  iconNote = faNoteSticky;
  userPanelOpen = false;
  iconHome = faHouse;


  @ViewChild('userPanelWrapper') userPanelWrapper!: ElementRef<HTMLElement>;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.userPanelOpen) return;
    if (this.userPanelWrapper?.nativeElement.contains(event.target as Node)) return;
    this.userPanelOpen = false;
  }

  user: User | null = null;

  recentNotes = signal<NoteModel[]>([]);

  getRecentNotes(): void {
    this.noteService.getNotes().subscribe((notes) => {
      this.recentNotes.set(notes);
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.getRecentNotes();
  }

  changeTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleUserPanel(): void {
    this.userPanelOpen = !this.userPanelOpen;
  }

  editProfile(): void { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
