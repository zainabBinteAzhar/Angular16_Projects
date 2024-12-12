// src/app/services/indexed-db.service.ts
import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
//openDB:function is used to open (or create) an IndexedDB database.
//IDBPDatabase: IndexedDB database instance returned by openDB.

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private db!: IDBPDatabase;

  constructor() {
    this.initDb();
  }

  private async initDb() {
    // Open IndexedDB with version 1
    this.db = await openDB('notesAppDb', 1, {
      upgrade(db) {
        // Create a store named 'notes' with 'id' as the key
        const store = db.createObjectStore('notes', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('title', 'title');
      },
    });
  }

  // Ensure the database is initialized before performing any operations
  private async ensureDbInitialized() {
    if (!this.db) {
      await this.initDb();
    }
  }

  // Add a new note to IndexedDB
  async addNote(note: Note) {
    await this.ensureDbInitialized();
    return await this.db.add('notes', note);
  }

  // Get all notes from IndexedDB
  async getAllNotes() {
    await this.ensureDbInitialized();
    return await this.db.getAll('notes');
  }

  // Delete a note by ID
  async deleteNote(id: number) {
    await this.ensureDbInitialized();
    return await this.db.delete('notes', id);
  }
}