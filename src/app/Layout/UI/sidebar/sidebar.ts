import { Component, HostListener, ViewChild, ElementRef, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faGear, faPlus, faNoteSticky, faChevronLeft, faFileLines, faMoon, faSun, faUserPen, faRightFromBracket, faShareFromSquare, faTags } from '@fortawesome/free-solid-svg-icons';
import { Scrollbar } from './scrollbar/scrollbar';
import { Note } from '../../../Model/Note';

@Component({
  selector: 'app-sidebar',
  imports: [
    FontAwesomeModule,
    Scrollbar,
    DatePipe,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})

export class Sidebar {
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
  userPanelOpen = false;

  @ViewChild('userPanelWrapper') userPanelWrapper!: ElementRef<HTMLElement>;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.userPanelOpen) return;
    if (this.userPanelWrapper?.nativeElement.contains(event.target as Node)) return;
    this.userPanelOpen = false;
  }

  recentNotes = signal<Note[]>([
    { id: 1, title: 'Reunião segunda-feira', type: 'text', date: new Date('2026-02-04T10:00:00'), tag: 'Work', favorited: false },
    { id: 2, title: 'Ideias do projeto', type: 'text', date: new Date('2026-02-03T12:30:00'), tag: 'Design', favorited: false },
    { id: 3, title: 'Lista de compras', type: 'text', date: new Date('2026-02-02T18:10:00'), tag: 'Personal', favorited: false },
    { id: 4, title: 'Tarefas pendentes', type: 'text', date: new Date('2026-02-01T08:45:00'), tag: 'Work', favorited: false },
    { id: 5, title: 'Reunião segunda-feira', type: 'text', date: new Date('2026-01-31T16:00:00'), tag: 'Work', favorited: false },
    { id: 6, title: 'Ideias do projeto', type: 'text', date: new Date('2026-01-30T11:20:00'), tag: 'Design', favorited: false },
    { id: 7, title: 'Lista de compras', type: 'text', date: new Date('2026-01-29T19:05:00'), tag: 'Personal', favorited: false },
    { id: 8, title: 'Tarefas pendentes', type: 'text', date: new Date('2026-01-28T09:15:00'), tag: 'Work', favorited: false },
  ]);

  user = {
    name: 'Usuário',
    email: 'usuario@email.com',
  };

  changeTheme(): void {
    document.body.classList.toggle('dark-mode');
  }

  toggleUserPanel(): void {
    this.userPanelOpen = !this.userPanelOpen;
  }

  editProfile(): void {}

  logout(): void {}

}
