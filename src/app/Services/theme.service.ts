import { Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly STORAGE_KEY = 'ng-notes-theme';

    isDark = signal<boolean>(true);

    initTheme(): void {
        const saved = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
        const theme: Theme = saved ?? 'dark';
        this.applyTheme(theme);
    }

    toggleTheme(): void {
        const next: Theme = this.isDark() ? 'light' : 'dark';
        this.applyTheme(next);
        localStorage.setItem(this.STORAGE_KEY, next);
    }

    private applyTheme(theme: Theme): void {
        document.documentElement.setAttribute('data-theme', theme);
        this.isDark.set(theme === 'dark');
    }
}
