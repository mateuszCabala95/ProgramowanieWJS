const form = document.querySelector("#form");
const notesList = document.querySelector("#notes-list");
const notes = [];
const notesStorageKey = 'notes';

class Note {
    constructor(title, content, color, pin) {
        this.Title = title;
        this.Content = content;
        this.Color = color;
        this.Pin = pin;
    }
    Title;
    Content;
    Color;
    Pin;
    Date = new Date().toISOString();
}

const renderNote = (note) => {
    const listItem = document.createElement('li');
    const spanTitle = document.createElement('span');
    const spanContent = document.createElement('span');
    const spanPin = document.createElement('span');

    listItem.classList.add('notes__item');
    listItem.style.backgroundColor = note.Color;

    spanTitle.innerText = `Tytuł : ${note.Title}`;
    spanContent.innerText = `Treść: ${note.Content}`;
    spanPin.innerText = `Pin: ${note.Pin ? 'Tak' : 'Nie'}`

    listItem.appendChild(spanTitle);
    listItem.appendChild(spanContent);
    listItem.appendChild(spanPin);
    notesList.appendChild(listItem);
}

const handleSubmit = (event) =>{
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const content = document.querySelector('#content').value;
    const color = document.querySelector('#color').value;
    const pin = document.querySelector('#pin').value;

    const newNote = new Note(title, content, color, pin);
    notes.push(newNote);
    event.target.reset();

    window.localStorage.removeItem(notesStorageKey);
    window.localStorage.setItem(notesStorageKey, JSON.stringify(notes));

    notesList.replaceChildren();
    notes.forEach(note => renderNote(note));
}

form.addEventListener('submit', (event) => handleSubmit(event));

(()=>{
    const notesFromLocalStorage = JSON.parse(window.localStorage.getItem(notesStorageKey));
    if (notesFromLocalStorage !== null ){
        notes.push(...notesFromLocalStorage);
        notesList.replaceChildren();
        notes.forEach(note => renderNote(note));
    }
})();

