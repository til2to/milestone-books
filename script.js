import Book from './book.js'


class BookList {
  constructor() {
    this.storage = JSON.parse(window.localStorage.getItem('allBooks')) || [];
    // if (this.localStorage === null || this.localStorage === undefined || this.localStorage.length === 0) {
    //   this.ocalStorage = [];
    // }
    this.allBooks = this.storage;
    this.title = document.getElementById('title');
    this.form = document.querySelector('.form');
    this.author = document.getElementById('author');
    this.addBtn = document.querySelector('.add')
    this.newBooks = document.querySelector('.new-books-container');

    this.bookExist = (existiingTitle,
      newTitle) => JSON.stringify(existiingTitle) === JSON.stringify(newTitle);

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addBook();
    });
  }
  
  /* add book */
  addBook(title, author){
    const newBook = new Book(this.title.value, this.author.value)
    /* check if book exist */
    let exist = false;
    this.allBooks.forEach((book) => {
      if (this.bookExist(book.title, this.title.value)) {
        exist = true;
      }
    });
  
    /* Dont add if book exist */
    if (exist) return;
  
    /* add book if it doesn't exist already */
    this.allBooks.unshift({title: newBook.title, author: newBook.author});
    window.localStorage.setItem('allBooks', JSON.stringify(this.allBooks));
    this.displayBooks()
  }

  /* remove book */
  remove(buttonId) {
    this.allBooks = this.allBooks.filter((book, index) => index !== buttonId);
    this.displayBooks()
    window.localStorage.setItem('allBooks', JSON.stringify(this.allBooks));
  }

  displayBooks() {
    this.newBooks.innerHTML = '';

    /* render each book */
    this.allBooks.forEach((book, index) => {
      const newElement = document.createElement('li');
      newElement.innerHTML = `
      <div class="book-container">
        <p class="book-title">title: ${book.title}</p>
        <p class="book-author">Author: ${book.author}</p>
        <button class="remove" id=${index}>Remove</button>
      </div>
      `;
      this.newBooks.appendChild(newElement);
    });

    const bookBtns = document.querySelectorAll('.remove');
    bookBtns.forEach((bookBtn) => {
      bookBtn.addEventListener('click', (e) => {
        const buttonId = parseInt(e.target.getAttribute('id'), 10);
        this.remove(buttonId);
      });
    });
  }
}

const freshBook = new BookList()