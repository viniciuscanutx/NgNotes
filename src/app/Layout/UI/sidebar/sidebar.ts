import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faGear, faPlus, faNoteSticky, faChevronLeft, faFileLines, faMoon, faSun, faUserPen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Scrollbar } from '../scrollbar/scrollbar';

@Component({
  selector: 'app-sidebar',
  imports: [
    FontAwesomeModule,
    Scrollbar,
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

  userPanelOpen = false;

  @ViewChild('userPanelWrapper') userPanelWrapper!: ElementRef<HTMLElement>;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.userPanelOpen) return;
    if (this.userPanelWrapper?.nativeElement.contains(event.target as Node)) return;
    this.userPanelOpen = false;
  }

  recentNotes = [
    { id: 1, title: 'Reunião segunda-feira', updatedAt: '04/02/2025' },
    { id: 2, title: 'Ideias do projeto', updatedAt: '03/02/2025' },
    { id: 3, title: 'Lista de compras', updatedAt: '02/02/2025' },
    { id: 4, title: 'Tarefas pendentes', updatedAt: '01/02/2025' },
    { id: 5, title: 'Reunião segunda-feira', updatedAt: '04/02/2025' },
    { id: 6, title: 'Ideias do projeto', updatedAt: '03/02/2025' },
    { id: 7, title: 'Lista de compras', updatedAt: '02/02/2025' },
    { id: 8, title: 'Tarefas pendentes', updatedAt: '01/02/2025' },
  ];

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
