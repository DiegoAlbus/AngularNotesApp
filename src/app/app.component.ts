import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NoteService } from './note.service';
import {HttpErrorResponse}  from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Daily Notes';
  public notes: Note[] | undefined;
  public editNote : Note | undefined;

  constructor(private noteService : NoteService){

  }
  ngOnInit(): void {
    this.getNotes();
  }

  public getNotes(): void{
    this.noteService.getNotes().subscribe(
      (response: Note[]) => {
        this.notes = response;
      }, (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public onAddNote (addForm : NgForm) : void {

    this.noteService.addNote(addForm.value).subscribe(
      (response: Note) => {
        console.log(response);
        this.getNotes();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public onEditNote (note : Note) : void {
    // Make sure ID is passed for the update
    if (this.editNote !== undefined)
      note.id = this.editNote.id;

    this.noteService.updateNote(note).subscribe(
      (response: Note) => {
        console.log(response);
        this.getNotes();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteNote (noteId : number | undefined) : void {
    // Make sure ID is passed for the update

    if (noteId !== undefined) {
      this.noteService.deleteNote(noteId).subscribe(
        (response: void) => {
          console.log(response);
          this.getNotes();
        },
        (error : HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      alert("The ID is undefined.");
    }
    

    
  }

  public onOpenModal(note: Note, mode: string): void{
    const container = document.getElementById("main-container");
    const button = document.createElement("button");

    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    
    if (mode === "Edit") {
      this.editNote = note;
      button.setAttribute("data-target", "#exampleModal");
    }
    
    if (mode === "Delete") {
      this.editNote = note;
      button.setAttribute("data-target", "#removeNoteModal");
    }

    container?.appendChild(button);
    button.click();
  }
}
