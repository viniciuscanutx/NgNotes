import { Component, HostListener, ViewChild, ElementRef, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faGear, faPlus, faNoteSticky, faChevronLeft, faFileLines, faMoon, faSun, faUserPen, faRightFromBracket, faShareFromSquare, faTags } from '@fortawesome/free-solid-svg-icons';
import { Scrollbar } from './scrollbar/scrollbar';
import { Note } from '../../../Model/Note';
import { User } from '../../../Model/User';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';

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
    private router: Router) {
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


  @ViewChild('userPanelWrapper') userPanelWrapper!: ElementRef<HTMLElement>;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.userPanelOpen) return;
    if (this.userPanelWrapper?.nativeElement.contains(event.target as Node)) return;
    this.userPanelOpen = false;
  }

  user: User | null = null;

  recentNotes = signal<Note[]>([
    { id: 1, title: 'Reunião segunda-feira', type: 'text', date: new Date('2026-02-04T10:00:00'), tag: 'Work', favorited: false },
  ]);

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  changeTheme(): void {
    document.body.classList.toggle('dark-mode');
  }

  toggleUserPanel(): void {
    this.userPanelOpen = !this.userPanelOpen;
  }

  editProfile(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
