import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
    
  const router = inject(Router);

  const token = localStorage.getItem('authToken');
  
  if (!token) {
    router.navigate(['']);
    return false;
  }
  
  return true;
};

export const redirectIfLoggedIn: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('authToken');

  if (token) {
    return router.parseUrl('/home');
  }

  return true;
};