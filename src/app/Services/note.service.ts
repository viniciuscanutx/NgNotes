import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NoteModel } from '../Model/Note';
import notes from '../../../mock-data/notes.json';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class NoteService {

    constructor(private authService: AuthService) {}

    data = notes as NoteModel[];

    getNotes(): Observable<NoteModel[]> {
        const user = this.authService.getCurrentUser();
        return of(this.data.filter(note => note.userId === user.id));
    }

    getNote(id: number): Observable<NoteModel | null> {
        const foundNote = this.data.find(note => note.id === id);
        return of(foundNote || null);
    }

    addNote(note: NoteModel): Observable<NoteModel> {
        const newId = this.data.length > 0 ? Math.max(...this.data.map(n => n.id)) + 1 : 1;
        const newNote = { ...note, id: newId };
        this.data.push(newNote);
        return of(newNote);
    }

    updateNote(note: NoteModel): Observable<NoteModel | null> {
        const index = this.data.findIndex(n => n.id === note.id);
        if (index !== -1) {
            this.data[index] = note;
            return of(note);
        }
        return of(null);
    }

}