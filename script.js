const newBooks = document.querySelector('.new-books-container');
const title = document.getElementById('title');
const form = document.querySelector('.form');
const author = document.getElementById('author');

let localStorage = JSON.parse(window.localStorage.getItem('allBooks'));
if (localStorage === null || localStorage === undefined || localStorage.length === 0) {
  localStorage = [];
}

// collection of list of books
let allBooks = localStorage;

/* render each book */
allBooks.forEach((book, index) => {
  const displayBook = `
  <div class="book-container">
    <p class="book-title">title: ${book.title}</p>
    <p class="book-author">Author: ${book.author}</p>
    <button class="remove" id=${index}>Remove</button>
  </div>
  `;
  newBooks.innerHTML += displayBook;
});

/* compare the books */
const bookExist = (existiingTitle,
  newTitle) => JSON.stringify(existiingTitle) === JSON.stringify(newTitle);

/* add book */
const addBook = () => {
  const newBook = {
    title: title.value,
    author: author.value,
  };
  /* check if book exist */
  let exist = false;
  localStorage.forEach((book) => {
    if (bookExist(book.title, title.value)) {
      exist = true;
    }
  });

  /* Dont add if book exist */
  if (exist) return;

  /* add book if it doesn't exist */
  allBooks.unshift(newBook);
  window.localStorage.setItem('allBooks', JSON.stringify(localStorage));
  window.location.reload();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook();
});

/* remove book */
function remove(buttonId) {
  allBooks = localStorage.filter((book, index) => index !== buttonId);
  window.localStorage.setItem('allBooks', JSON.stringify(allBooks));
  window.location.reload();
}

const bookBtns = document.querySelectorAll('.remove');
bookBtns.forEach((bookBtn) => {
  bookBtn.addEventListener('click', (e) => {
    const buttonId = parseInt(e.target.getAttribute('id'), 10);
    remove(buttonId);
  });
});
