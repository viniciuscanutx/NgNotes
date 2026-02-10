import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logo',
  imports: [FontAwesomeModule],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
})

export class Logo {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  iconLogo = faNoteSticky;
}
