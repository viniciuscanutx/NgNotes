import { Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTag, faHome, faGear, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bottom-nav',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss',
})

export class BottomNav {

  iconHome = faHome;
  iconTag = faTag;
  iconSettings = faGear;
  iconPerson = faUser;
  iconPlus = faPlus;


  newNote = output<void>();

  onNewNote(): void {
    this.newNote.emit();
  }

}
