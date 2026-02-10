import { Component, computed, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoteCard } from '../../Layout/UI/Cards/note-card/note-card';
import { faHeart, faList, faNoteSticky, faMagnifyingGlass, faTableCells, faCloudSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { Note, NoteChecklistItem } from '../../Model/Note';
import { User } from '../../Model/User';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule, NoteCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home {

  constructor(private authService: AuthService) {}

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

  notes = signal<Note[]>([
    {
      id: 1,
      title: 'Reunião segunda-feira',
      type: 'checklist',
      checklistItems: [
        { id: 1, text: 'Reunião com o time de marketing', checked: true },
        { id: 2, text: 'Reunião com o time de vendas', checked: false },
      ],
      date: new Date('2026-02-10T09:20:00'),
      tag: 'Work',
      favorited: false,
    },
    {
      id: 2,
      title: 'Feedback do cliente',
      content:
        'O cliente nos deu um feedback positivo sobre o produto. Precisamos analisar o feedback e melhorar o produto.',
      type: 'text',
      date: new Date('2026-02-09T17:40:00'),
      tag: 'Work',
      favorited: false,
    },
  ]);

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  displayedNotes = computed(() => {
    const tab = this.activeTab();
    const search = this.searchFilter().toLowerCase().trim();
    let filteredNotes = this.notes();

    if (tab === 'favorite') {
      filteredNotes = filteredNotes.filter((n) => n.favorited);
    }

    if (search) {
      filteredNotes = filteredNotes.filter(
        (n) =>
          n.title.toLowerCase().includes(search) ||
          n.content?.toLowerCase().includes(search) ||
          n.tag.toLowerCase().includes(search) ||
          n.checklistItems?.some((item) => item.text.toLowerCase().includes(search))
      );
    }

    return filteredNotes.sort((a, b) => b.date.getTime() - a.date.getTime());
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

  toggleFavorite(note: Note): void {
    this.notes.update((list) =>
      list.map((n) => (n.id === note.id ? { ...n, favorited: !n.favorited } : n))
    );
  }

  shareNote(note: Note): void {}

  toggleChecklistItem(note: Note, item: NoteChecklistItem): void {
    this.notes.update((list) =>
      list.map((n) => {
        if (n.id !== note.id || !n.checklistItems) return n;
        return {
          ...n,
          checklistItems: n.checklistItems.map((i) =>
            i.id === item.id ? { ...i, checked: !i.checked } : i
          ),
        };
      })
    );
  }

}
