import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Logo } from '../../Layout/UI/Elements/logo/logo';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModal } from '../../Layout/UI/Modal/dialog-modal/dialogModal';
import { MatDialog } from '@angular/material/dialog';
  
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FontAwesomeModule, 
    Logo, 
    FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})

export class Login {

  iconGithub = faGithub;
  iconGoogle = faGoogle;

  showPasswordInput = false;
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router) {}

  togglePasswordVisibility(email: string) {
    
    if (!email) {
      return;
    }

    this.authService.checkEmail(email).subscribe((response) => {
      if (response.exists) {
        this.showPasswordInput = true;
      } else {
        this.dialog.open(DialogModal, {
          data: {
            title: 'Ocorreu um Erro',
            message: 'Email não encontrado',
          },
        });
      }
    });

  }

  login() {

    this.authService.login(this.email, this.password).subscribe((response) => {
      if (response.success) {
        this.router.navigate(['/home']);
      } else {
        this.dialog.open(DialogModal, {
          data: {
            title: 'Ocorreu um Erro',
            message: 'Email ou senha inválidos',
          },
        });
      }
    });
  }

}
