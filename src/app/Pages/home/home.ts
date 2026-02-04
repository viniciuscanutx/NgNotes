import { Component, computed, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faList,
  faTableCells,
  faMagnifyingGlass,
  faNoteSticky,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { Note, NoteChecklistItem } from '../../Model/Note';
import { NoteCard } from '../../Layout/UI/Cards/note-card/note-card';

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule, NoteCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home {
  iconList = faList;
  iconGrid = faTableCells;
  iconSearch = faMagnifyingGlass;
  iconNotes = faNoteSticky;
  iconFavorites = faHeart;

  activeTab = signal<'notes' | 'favorite'>('notes');
  viewMode = signal<'list' | 'grid'>('grid');
  searchFilter = signal<string>('');

  notes = signal<Note[]>([
    {
      id: 1,
      title: 'London',
      type: 'checklist',
      checklistItems: [
        { id: 1, text: 'Received', checked: true },
        { id: 2, text: 'HP EliteBook 850 G7', checked: false },
      ],
      date: new Date('2026-02-03T09:20:00'),
      tag: 'Design',
      favorited: false,
    },
    {
      id: 2,
      title: 'Darcel is pretty good. We should include them',
      content:
        'User reports that their desktop app crashed after the latest update. Need to investigate the memory leak in the render process.',
      type: 'text',
      date: new Date('2026-02-02T17:40:00'),
      tag: 'Medicine',
      favorited: true,
    },
    {
      id: 3,
      title: 'Workout',
      content:
        'Leg day: squats 4x12, lunges 3x10, calf raises 4x15. Cardio: 20 min treadmill.',
      type: 'text',
      date: new Date('2026-01-26T07:10:00'),
      tag: 'Sport',
      favorited: false,
    },
    {
      id: 4,
      title: 'Depósito',
      content: '2,00',
      type: 'text',
      date: new Date('2026-02-03T12:05:00'),
      tag: 'Finance',
      favorited: false,
    },
    {
      id: 5,
      title: 'Reunião segunda-feira',
      content:
        'Preparar slides para apresentação. Enviar convite para a equipe até sexta.',
      type: 'text',
      date: new Date('2026-02-01T14:00:00'),
      tag: 'Work',
      favorited: true,
    },
    {
      id: 6,
      title: 'Ideias do projeto',
      content:
        'Implementar dark mode. Melhorar performance do scroll. Adicionar atalhos de teclado.',
      type: 'text',
      date: new Date('2026-01-30T21:30:00'),
      tag: 'Design',
      favorited: false,
    },
  ]);

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
