let notes = [];

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;
  
  const note = {
    id: Date.now(),
    title: title,
    content: content,
    date: new Date().toLocaleDateString()
  };
  
  notes.push(note);
  
  // Notları kaydetmek için bir fonksiyon çağırıyoruz
  saveNotes();
  
  // Formu sıfırlayalım
  form.reset();
});

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

window.addEventListener('load', () => {
  const notesString = localStorage.getItem('notes');
  if (notesString) {
    notes = JSON.parse(notesString);
  }
  displayNotes(notes);
});

function displayNotes(notesArray) {
  const notesBody = document.querySelector('#notesBody');
  
  notesBody.innerHTML = '';
  
  notesArray.forEach(note => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${note.title}</td>
      <td>${note.content}</td>
      <td>${note.date}</td>
    `;
    notesBody.appendChild(tr);
  });
}

const searchBox = document.querySelector('#search');
searchBox.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  
  const filteredNotes = notes.filter(note => {
    return note.title.toLowerCase().includes(searchString) ||
           note.content.toLowerCase().includes(searchString);
  });
  
  displayNotes(filteredNotes);
});
