const containerElement = document.querySelector('.container');
const bookContainerElement = document.querySelector('main > .book-container');
const footerElement = document.querySelector('footer');
const addBookButton = document.querySelector('.btn > button');
const infoText = document.querySelector('.empty-msg');



const myLibrary = [];

// Random id for books
let bookId = crypto.randomUUID();


// Book constructor
function Book(id, title, author, page, isRead) {
   this.id = id;
   this.title = title;
   this.author = author;
   this.page = page;
   this.isRead = isRead;
}


// Create book function
function addBookToLibrary(id, title, author, page, isRead) {
   const newBook = new Book(id, title, author, page, isRead);
   myLibrary.push(newBook);
   displayBookCard();
}



function createPopUpForm(editBook, editIndex) {
   const popUpBackgroundElement = document.createElement('div');
   popUpBackgroundElement.classList.add('popup-form');
   containerElement.insertBefore(popUpBackgroundElement, footerElement);

   const formElement = document.createElement('form');

   const formHeaderContainerElement = document.createElement('div');
   formHeaderContainerElement.classList.add('form-header');
   formElement.appendChild(formHeaderContainerElement);

   const formTitleElement = document.createElement('h1');
   formTitleElement.textContent = editBook ? 'Edit Book' : 'Add New Book';
   formHeaderContainerElement.appendChild(formTitleElement);

   const closeFormButtonElement = document.createElement('i');
   closeFormButtonElement.className = 'fa-solid fa-xmark';
   formHeaderContainerElement.appendChild(closeFormButtonElement);

   const formControlContainerElement = document.createElement('div');
   formControlContainerElement.classList.add('form-control-container');
   formElement.appendChild(formControlContainerElement);

   // title
   const firstInputContainerElement = document.createElement('div');
   const titleLabelElement = document.createElement('label');
   titleLabelElement.htmlFor = 'title';
   titleLabelElement.textContent = 'Title';
   firstInputContainerElement.appendChild(titleLabelElement);

   const titleInputElement = document.createElement('input');
   titleInputElement.type = 'text';
   titleInputElement.id = 'title';
   titleInputElement.name = 'title';
   titleInputElement.required = true;
   if (editBook) titleInputElement.value = editBook.title; 
   firstInputContainerElement.appendChild(titleInputElement);
   formControlContainerElement.appendChild(firstInputContainerElement);
   
   //author
   const secondInputContainerElement = document.createElement('div');
   const authorLabelElement = document.createElement('label');
   authorLabelElement.htmlFor = 'author';
   authorLabelElement.textContent = 'Author';
   secondInputContainerElement.appendChild(authorLabelElement);

   const authorInputElement = document.createElement('input');
   authorInputElement.type = 'text';
   authorInputElement.id = 'author';
   authorInputElement.name = 'author';
   authorInputElement.required = true;
   if (editBook) authorInputElement.value = editBook.author;
   secondInputContainerElement.appendChild(authorInputElement);
   formControlContainerElement.appendChild(secondInputContainerElement);

   // page
   const thirdInputContainerElement = document.createElement('div');
   const pageLabelElement = document.createElement('label');
   pageLabelElement.htmlFor = 'page';
   pageLabelElement.textContent = 'Pages';
   thirdInputContainerElement.appendChild(pageLabelElement);

   const pageInputElement = document.createElement('input');
   pageInputElement.type = 'number';
   pageInputElement.id = 'page';
   pageInputElement.name = 'page';
   pageInputElement.required = true;
   if (editBook) pageInputElement.value = editBook.page;
   thirdInputContainerElement.appendChild(pageInputElement);
   formControlContainerElement.appendChild(thirdInputContainerElement);

   // isRead
   const fourthInputContainerElement = document.createElement('div');
   formControlContainerElement.appendChild(fourthInputContainerElement);

   const isReadLabelElement = document.createElement('label');
   isReadLabelElement.htmlFor = 'read';
   isReadLabelElement.textContent = 'Read';
   fourthInputContainerElement.appendChild(isReadLabelElement);

   const isReadSelectElement = document.createElement('select');
   isReadSelectElement.id = 'read';
   fourthInputContainerElement.appendChild(isReadSelectElement);

   const options = ['Not-Read', 'In-Progress', 'Finished'];
   options.forEach(optionText => {
       const option = document.createElement('option');
       option.value = optionText;
       option.textContent = optionText;
       if (editBook && editBook.isRead === optionText) option.selected = true;
       isReadSelectElement.appendChild(option);
   });

   // button
   const formButtonElement = document.createElement('button');
   formButtonElement.textContent = editBook ? 'Save Changes' : 'Add Book';
   formButtonElement.type = 'submit';
   formElement.appendChild(formButtonElement);

   popUpBackgroundElement.appendChild(formElement);


   // Handle close button
   closeFormButtonElement.addEventListener('click', () => {
       containerElement.removeChild(popUpBackgroundElement)
   });


   // Handle submit
   formElement.addEventListener('submit', (e) => {
     e.preventDefault();

      const title = titleInputElement.value.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
      const author = authorInputElement.value.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
      const page = pageInputElement.value;
      const isRead = isReadSelectElement.value;

     
      if (editBook) {
         myLibrary[editIndex] = { ...editBook, title, author, page, isRead };
      } else {
         addBookToLibrary(bookId, title, author, page, isRead);
         bookId = crypto.randomUUID(); 
      }
     
      displayBookCard();
      formElement.reset();
      containerElement.removeChild(popUpBackgroundElement);
   });
}   

  


// Handle popup form
addBookButton.addEventListener('click', () => {
    createPopUpForm();
})



// Function that display books
function displayBookCard() {

    if (myLibrary.length === 0) {
      infoText.style.display = 'block';
   } else {
      infoText.style.display = 'none';
   }

   // clear book container for new books
   bookContainerElement.innerHTML = '';

   // Loop through books to display on the page
   return myLibrary.map((book, index) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      bookContainerElement.appendChild(cardElement);


      // title property
      const titlePropertyContainerElement = document.createElement('div');
      titlePropertyContainerElement.classList.add('title-property-container');
      cardElement.appendChild(titlePropertyContainerElement);

      const titlePropertyElement = document.createElement('p');
      titlePropertyElement.classList.add('title-property');
      titlePropertyElement.textContent = 'Title'; 
      titlePropertyContainerElement.appendChild(titlePropertyElement);

      const titleValueElement = document.createElement('p');
      titleValueElement.classList.add('title-value');
      titleValueElement.textContent = book.title; 
      titlePropertyContainerElement.appendChild(titleValueElement);


      // Author property
      const authorPropertyContainerElement = document.createElement('div');
      authorPropertyContainerElement.classList.add('author-property-container');
      cardElement.appendChild(authorPropertyContainerElement);

      const authorPropertyElement = document.createElement('p');
      authorPropertyElement.classList.add('author-property');
      authorPropertyElement.textContent = 'Author'; 
      authorPropertyContainerElement.appendChild(authorPropertyElement);

      const authorValueElement = document.createElement('p');
      authorValueElement.classList.add('author-value');
      authorValueElement.textContent = book.author; 
      authorPropertyContainerElement.appendChild(authorValueElement);


      // page property
      const pagePropertyContainerElement = document.createElement('div');
      pagePropertyContainerElement.classList.add('page-property-container');
      cardElement.appendChild(pagePropertyContainerElement);

      const pagePropertyElement = document.createElement('p');
      pagePropertyElement.classList.add('page-property');
      const textSwap = book.page <= 1 ? "Page" : 'Pages';
      pagePropertyElement.textContent = textSwap; 
      pagePropertyContainerElement.appendChild(pagePropertyElement);

      const pageValueElement = document.createElement('p');
      pageValueElement.classList.add('author-value');
      pageValueElement.textContent = book.page; 
      pagePropertyContainerElement.appendChild(pageValueElement);


      // isRead property
      const isReadPropertyContainerElement = document.createElement('div');
      isReadPropertyContainerElement.classList.add('read-property-container');
      cardElement.appendChild(isReadPropertyContainerElement);

      const isReadPropertyElement = document.createElement('p');
      isReadPropertyElement.classList.add('read-property');
      isReadPropertyElement.textContent = 'Status'; 
      isReadPropertyContainerElement.appendChild(isReadPropertyElement);

      const isReadValueElement = document.createElement('p');
      isReadValueElement.classList.add('read-value');
      isReadValueElement.textContent = book.isRead; 
      isReadPropertyContainerElement.appendChild(isReadValueElement);


      // button property
      const buttonContainerElement = document.createElement('div');
      buttonContainerElement.classList.add('button-container');
      cardElement.appendChild(buttonContainerElement);

      // delete button property
      const deleteButtonElement = document.createElement('button');
      deleteButtonElement.textContent = 'Delete Book';
      buttonContainerElement.appendChild(deleteButtonElement);


      // edit book button property
      const editButtonElement = document.createElement('button');
      editButtonElement.textContent = 'Edit Book';
      buttonContainerElement.appendChild(editButtonElement);


      // Handle delete button
      deleteButtonElement.addEventListener('click', () => {
          myLibrary.splice(index, 1);
          displayBookCard();
      });


      // Handle edit button
      editButtonElement.addEventListener('click', () => {
          createPopUpForm(book, index);
      });      
      
      
   });
}
