import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Note } from "./note";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})

export class NoteService {
    private apiServerURL = environment.apiBaseURL;
    
    constructor(private http: HttpClient){}

    public getNotes(): Observable<Note[]>{
        return this.http.get <Note[]>(`${this.apiServerURL}/note/all`);
    }

    public addNote(note: Note): Observable<Note>{
        return this.http.post <Note>(`${this.apiServerURL}/note/add`, note);
    }

    public updateNote(note: Note): Observable<Note>{
        return this.http.put <Note>(`${this.apiServerURL}/note/update`, note);
    }

    public deleteNote(noteId: number): Observable<void>{
        return this.http.delete <void>(`${this.apiServerURL}/note/delete/${noteId}`);
    }
}