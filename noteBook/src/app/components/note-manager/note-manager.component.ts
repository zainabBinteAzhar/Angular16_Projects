// src/app/components/note-manager/note-manager.component.ts
import { Component, OnInit } from '@angular/core';
import {IndexedDbService } from '../../shared/indexed-db.service'
import { Note } from '../../models/user.model';

@Component({
  selector: 'app-note-manager',
  templateUrl: './note-manager.component.html',
})
export class NoteManagerComponent implements OnInit {
  notes: Note[] = [];
  newNote: Partial<Note> = { title: '', content: '' };

  constructor(private indexedDbService: IndexedDbService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  async loadNotes() {
    try {
      this.notes = await this.indexedDbService.getAllNotes();
      console.log('Loaded notes:', this.notes);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  }

  async addNote() {
    const note = {
      ...this.newNote
    } as Note;
    await this.indexedDbService.addNote(note);
    this.loadNotes();
    this.newNote = { title: '', content: '' };
  }

  async deleteNote(id: number) {
    await this.indexedDbService.deleteNote(id);
    this.loadNotes();
  }
}
