import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../UI/sidebar/sidebar';
import { BottomNav } from '../UI/sidebar/bottom-nav/bottom-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, BottomNav],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('NgNotes');

  onNewNote(): void {}
}
