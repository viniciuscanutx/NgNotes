import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../UI/sidebar/sidebar';
import { BottomNav } from '../UI/sidebar/bottom-nav/bottom-nav';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar, BottomNav],
  template: `
    <app-sidebar></app-sidebar>
    <app-bottom-nav (newNote)="onNewNote()"></app-bottom-nav>
    
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrl: '../App/app.scss',
})

export class MainLayout {
  onNewNote(): void {}
}
