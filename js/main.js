
 const books = [];
 const RENDER_EVENT = "render-books";
 const RAK_KEY = "BOOKS_APPS"
 const SAVED_EVENT = "saved-books";
 
 function generateId() {
     return +new Date();
 }
 
 function generateBookObject(id, title, author, year, isCompleted) {
     return {
         id,
         title,
         author,
         year,
         isCompleted
     }
 }
 
 function findBook(bookId){
     for(bookItem of books){
         if(bookItem.id === bookId){
             return bookItem
         }
     }
     return null
 }
 
 function findBookIndex(bookId) {
     for(index in books){
         if(books[index].id === bookId){
             return index
         }
     }
     return -1
 }
 
 function makeBook(bookObject) {

    const {id, title, author, year, isCompleted} = bookObject;

    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const textAuthor = document.createElement("p")
    textAuthor.innerHTML = `<i class='bx bxs-user bx-sm iconInBook'></i> : ${author}`;

    const textYear = document.createElement("p");
    textYear.innerHTML = `<i class='bx bxs-calendar-edit bx-sm iconInBook'></i> : ${year}`;

    const Action = document.createElement("div")
    Action.classList.add("action")

    const article = document.createElement("article");
    article.classList.add("book_item")
    article.append(textTitle, textAuthor, textYear);


   
    
    const undoButton = document.createElement("button");
    undoButton.innerHTML=`<i class="fa-solid fa-share"></i>`
    undoButton.classList.add("blmselesai");

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML=`<i class="fa-solid fa-trash"></i>`
    deleteButton.classList.add("hapus")

    const doneButton = document.createElement("button");
    doneButton.innerHTML=`<i class="fa-solid fa-check"></i>`
    doneButton.classList.add("selesai")

    

    if(isCompleted){
        undoButton.addEventListener("click", function () {
            undoBookFromCompleted(id);
        });
        deleteButton.addEventListener("click", function () {
            const a = confirm("Yakin hapus ? ")
            if(a){
                removeBookFromCompleted(id);
            }
            
        });
      

        Action.append(undoButton,deleteButton);
    } else {
        deleteButton.addEventListener("click", function () {
            const a = confirm("Yakin hapus ? ")
            if(a){
                removeBookFromCompleted(id);
            }
        });
        doneButton.addEventListener("click", function () {
            addBookToCompleted(id);
        });

        Action.append(doneButton,deleteButton);     
    }
    const container = document.createElement("div");
    container.classList.add("kotak-book")
    container.append(article,Action)
    container.setAttribute("id",`book-${id}`)
    return container;
}

function addBook() {
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const generatedID = generateId();
    const checkBox = document.getElementById("inputBookIsComplete");
    
    if(checkBox.checked){
        const bookObject = generateBookObject(generatedID, title, author, year, true)
        books.push(bookObject)
    }
    else if(!checkBox.checked){
        const bookObject = generateBookObject(generatedID, title, author, year, false)
        books.push(bookObject)

    }
    
    document.dispatchEvent(new Event(RENDER_EVENT))
    saveData();
}

function addBookToCompleted(bookId ) {

    const bookTarget = findBook(bookId);
    if(bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function removeBookFromCompleted(bookId) {
    const bookTarget = findBookIndex(bookId);
    if(bookTarget === -1) return;
    books.splice(bookTarget, 1);
    
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function undoBookFromCompleted(bookId){

    const bookTarget = findBook(bookId);
    if(bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function saveData() {
    if(isStorageExist()){
        const parsed = JSON.stringify(books)
        localStorage.setItem(RAK_KEY,parsed)
        document.dispatchEvent(new Event(SAVED_EVENT))
    }
  }

function isStorageExist() {
    if(typeof(Storage)==="undefined"){
        alert("Browser tak dukung web storage")
        return false
    }
    return true
  }
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(RAK_KEY)
    let data = JSON.parse(serializedData)
    if(data!==null){
        for(book of data){
            books.push(book)
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT))
  }

document.addEventListener(SAVED_EVENT,()=>{
    console.log(localStorage.getItem(RAK_KEY))
})

document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });
    if(isStorageExist){
        loadDataFromStorage();
    }
});


document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
    const completeBookshelfList = document.getElementById("completeBookshelfList");

    incompleteBookshelfList.innerHTML = ""
    completeBookshelfList.innerHTML = ""

    for(bookItem of books){
        const bookElement = makeBook(bookItem);
        if(bookItem.isCompleted){
            completeBookshelfList.append(bookElement);
        } else {
            incompleteBookshelfList.append(bookElement);
        }
    }
})

document.getElementById("searchBook").addEventListener("keyup",(event)=>{
    // document.dispatchEvent(new Event(RENDER_EVENT))
    event.preventDefault();
    searchBook();
})
function searchBook() {
    const searchBook = document.getElementById("searchBookTitle");
    const filter = searchBook.value;
    const kotakBook = document.querySelectorAll("section.book_shelf > .book_list > .kotak-book");
    for (let i = 0; i < kotakBook.length; i++) {
        txtValue = kotakBook[i].textContent || kotakBook[i].innerText;
        if (txtValue.indexOf(filter) > -1) {
            kotakBook[i].style.display = "";

        } else if(txtValue.indexOf(filter) === -1) {
            kotakBook[i].style.display = "none";
           
        }
    }
}
