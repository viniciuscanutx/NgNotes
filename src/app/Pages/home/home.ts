import { Component, computed, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoteCard } from '../../Layout/UI/Cards/note-card/note-card';
import {
  faHeart,
  faList,
  faNoteSticky,
  faMagnifyingGlass,
  faTableCells,
  faCloudSun,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { NoteModel } from '../../Model/Note';
import { User } from '../../Model/User';
import { AuthService } from '../../Services/auth.service';
import { NoteService } from '../../Services/note.service';

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule, NoteCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(
    private authService: AuthService,
    private noteService: NoteService,
  ) {}

  iconList = faList;
  iconGrid = faTableCells;
  iconSearch = faMagnifyingGlass;
  iconNotes = faNoteSticky;
  iconFavorites = faHeart;
  iconSun = faCloudSun;
  iconUser = faUser;

  activeTab = signal<'notes' | 'favorite'>('notes');
  viewMode = signal<'list' | 'grid'>('grid');
  searchFilter = signal<string>('');

  user: User | null = null;

  notes: NoteModel[] = [];

  getNotes(): void {
    this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.getNotes();
  }

  displayedNotes = computed(() => {
    const tab = this.activeTab();
    const search = this.searchFilter().toLowerCase().trim();
    let filteredNotes = this.notes;

    if (tab === 'favorite') {
      filteredNotes = filteredNotes.filter((n: NoteModel) => n.favorited);
    }

    if (search) {
      filteredNotes = filteredNotes.filter(
        (n) =>
          n.title.toLowerCase().includes(search) ||
          n.content?.toLowerCase().includes(search) ||
          n.tag.toLowerCase().includes(search),
      );
    }

    return filteredNotes.sort(
      (a: NoteModel, b: NoteModel) =>
        new Date(b.date as Date).getTime() - new Date(a.date as Date).getTime(),
    );
  });

  greeting = this.getGreeting();
  formattedDate = this.getFormattedDate();

  private getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  private getFormattedDate(): string {
    return new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  toggleFavorite(note: NoteModel): void {
    this.notes = this.notes.map((n: NoteModel) =>
      n.id === note.id
        ? {
            ...n,
            favorited: !n.favorited,
          }
        : n,
    );
  }

  shareNote(note: NoteModel): void {}
}
