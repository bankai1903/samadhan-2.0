class NotesApp {
    constructor() {
        this.notes = [];
        this.editingId = null;
        this.initializeElements();
        this.bindEvents();
        this.loadNotes();
    }

    initializeElements() {
        this.form = document.getElementById('noteForm');
        this.titleInput = document.getElementById('noteTitle');
        this.contentInput = document.getElementById('noteContent');
        this.categorySelect = document.getElementById('noteCategory');
        this.submitBtn = document.getElementById('submitBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.notesContainer = document.getElementById('notesContainer');
        this.searchInput = document.getElementById('searchInput');
        this.noteIdInput = document.getElementById('noteId');
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.cancelBtn.addEventListener('click', () => this.cancelEdit());
        this.searchInput.addEventListener('input', () => this.searchNotes());
    }

    async loadNotes() {
        try {
            const response = await fetch('/api/notes');
            if (!response.ok) throw new Error('Failed to fetch notes');
            
            this.notes = await response.json();
            this.renderNotes();
        } catch (error) {
            console.error('Error loading notes:', error);
            this.showError('Failed to load notes');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const noteData = {
            title: this.titleInput.value.trim(),
            content: this.contentInput.value.trim(),
            category: this.categorySelect.value
        };

        if (!noteData.title || !noteData.content) {
            this.showError('Title and content are required');
            return;
        }

        try {
            if (this.editingId) {
                await this.updateNote(this.editingId, noteData);
            } else {
                await this.createNote(noteData);
            }
            
            this.resetForm();
            this.loadNotes();
        } catch (error) {
            console.error('Error saving note:', error);
            this.showError('Failed to save note');
        }
    }

    async createNote(noteData) {
        const response = await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteData)
        });

        if (!response.ok) {
            throw new Error('Failed to create note');
        }

        return response.json();
    }

    async updateNote(id, noteData) {
        const response = await fetch(`/api/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteData)
        });

        if (!response.ok) {
            throw new Error('Failed to update note');
        }

        return response.json();
    }

    async deleteNote(id) {
        if (!confirm('Are you sure you want to delete this note?')) {
            return;
        }

        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete note');
            }

            this.loadNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
            this.showError('Failed to delete note');
        }
    }

    editNote(note) {
        this.editingId = note._id;
        this.titleInput.value = note.title;
        this.contentInput.value = note.content;
        this.categorySelect.value = note.category;
        this.submitBtn.textContent = 'Update Note';
        this.cancelBtn.style.display = 'inline-block';
        
        // Scroll to form
        this.form.scrollIntoView({ behavior: 'smooth' });
    }

    cancelEdit() {
        this.resetForm();
    }

    resetForm() {
        this.editingId = null;
        this.form.reset();
        this.submitBtn.textContent = 'Add Note';
        this.cancelBtn.style.display = 'none';
    }

    searchNotes() {
        const query = this.searchInput.value.toLowerCase().trim();
        const filteredNotes = this.notes.filter(note => 
            note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query) ||
            note.category.toLowerCase().includes(query)
        );
        this.renderNotes(filteredNotes);
    }

    renderNotes(notesToRender = this.notes) {
        if (notesToRender.length === 0) {
            this.notesContainer.innerHTML = `
                <div class="no-notes">
                    <p>No notes found. Create your first note above!</p>
                </div>
            `;
            return;
        }

        this.notesContainer.innerHTML = notesToRender.map(note => `
            <div class="note-card">
                <div class="note-header">
                    <h3 class="note-title">${this.escapeHtml(note.title)}</h3>
                    <span class="note-category">${note.category}</span>
                </div>
                <p class="note-content">${this.escapeHtml(note.content)}</p>
                <div class="note-meta">
                    Created: ${this.formatDate(note.createdAt)}
                    ${note.updatedAt !== note.createdAt ? `<br>Updated: ${this.formatDate(note.updatedAt)}` : ''}
                </div>
                <div class="note-actions">
                    <button class="btn-edit" onclick="app.editNote(${JSON.stringify(note).replace(/"/g, '&quot;')})">
                        Edit
                    </button>
                    <button class="btn-delete" onclick="app.deleteNote('${note._id}')">
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleString();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showError(message) {
        // Simple error display - you can enhance this
        alert(message);
    }
}

// Initialize the app
const app = new NotesApp();