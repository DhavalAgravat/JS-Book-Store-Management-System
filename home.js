// DOM elements
const welcomeText = document.querySelector(".text");
const logOutBtn = document.querySelector(".logoutbtn");
const inputBookName = document.querySelector("#inputBookName");
const inputAuthorName = document.querySelector("#inputAuthorName");
const inputDescription = document.querySelector("#inputDescription");
const inputBookPrice = document.querySelector("#inputBookPrice");
const saveBtn = document.querySelector(".saveBtn");
const bookChoice = document.querySelector("#choice");
const buyBtn = document.querySelector(".buyBtn");
const agreeBtn = document.querySelector(".agreeBtn");
const bookNameAlert = document.querySelector(".bookNameAlert");
const authorNameAlert = document.querySelector(".authorNameAlert");
const descriptionAlert = document.querySelector(".descriptionAlert");
const bookPriceAlert = document.querySelector(".bookPriceAlert");
const bookPriceAlert2 = document.querySelector(".bookPriceAlert2");
const bookNameAlert2 = document.querySelector(".bookNameAlert2");

// Getting Current User
const urlParams = new URL(window.location.toLocaleString()).searchParams;
const username = urlParams.get("username");

// getting users array
let books = JSON.parse(localStorage.getItem("books")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

// logged in user - Currentuser
let currentUser = users.find(function (user) {
  return user.userName === username;
});

//Displaying Weelcome Message
welcomeText.textContent = `Welcome To Home Page ${currentUser.firstName} ${currentUser.lastName}`;

// Displaying USer Table if current user is admin
if (currentUser.role == "Admin") {
  // Making Add Book Button nad Books Table Visible
  document.querySelector(".tbl").classList.remove("hidden");
  document.querySelector(".createBookBtn").classList.remove("hidden");

  let i = books.length;

  // Printing Current Books Of Admin
  books.forEach((e, i) => {
    let html = `
    <tr>
        <td>
            ${i + 1}
        </td>
        <td>
            ${e.bookName}
        </td>
        <td>
            ${e.authorName}
       </td>
        <td>
          ${e.description}
        </td>
        <td>
          ${e.price}
        </td>
        <td>
          ${e.users}
        </td>
      </tr>`;

    document.querySelector(".tbody1").insertAdjacentHTML("beforeend", html);
  });

  document.querySelector(".createBookBtn").addEventListener("click", () => {
    // hidnng all previous alert message if any
    bookNameAlert.classList.add("hidden");
    authorNameAlert.classList.add("hidden");
    descriptionAlert.classList.add("hidden");
    bookPriceAlert2.classList.add("hidden");
    bookPriceAlert.classList.add("hidden");
    bookNameAlert2.classList.add("hidden");
  });

  // Save Button event on creating new book
  saveBtn.addEventListener("click", () => {
    // Converting all booknames to lowercase and creating seprate array for unique book names
    let bookNames = books.map((e) => {
      return e.bookName.toLowerCase();
    });

    // Creating book object based on user input
    let book = {
      bookName: inputBookName.value,
      authorName: inputAuthorName.value,
      description: inputDescription.value,
      price: inputBookPrice.value,
      users:[],
    };

    // Validating  Inputs for book creation
    if (!inputBookName.value) {
      bookNameAlert.classList.remove("hidden");
      authorNameAlert.classList.add("hidden");
      descriptionAlert.classList.add("hidden");
      bookPriceAlert2.classList.add("hidden");
      bookPriceAlert.classList.add("hidden");
      bookNameAlert2.classList.add("hidden");
    } else if (!inputAuthorName.value) {
      bookNameAlert.classList.add("hidden");
      authorNameAlert.classList.remove("hidden");
      descriptionAlert.classList.add("hidden");
      bookPriceAlert2.classList.add("hidden");
      bookPriceAlert.classList.add("hidden");
      bookNameAlert2.classList.add("hidden");
    } else if (!inputDescription.value) {
      bookNameAlert.classList.add("hidden");
      authorNameAlert.classList.add("hidden");
      descriptionAlert.classList.remove("hidden");
      bookPriceAlert2.classList.add("hidden");
      bookPriceAlert.classList.add("hidden");
      bookNameAlert2.classList.add("hidden");
    } else if (!inputBookPrice.value) {
      bookNameAlert.classList.add("hidden");
      authorNameAlert.classList.add("hidden");
      descriptionAlert.classList.add("hidden");
      bookPriceAlert.classList.remove("hidden");
      bookPriceAlert2.classList.add("hidden");
      bookNameAlert2.classList.add("hidden");
    } else if (inputBookPrice.value < 0) {
      bookNameAlert.classList.add("hidden");
      authorNameAlert.classList.add("hidden");
      bookPriceAlert.classList.add("hidden");
      descriptionAlert.classList.add("hidden");
      bookPriceAlert2.classList.remove("hidden");
      bookNameAlert2.classList.add("hidden");
    } else if (bookNames.includes(book.bookName.toLowerCase())) {
      bookPriceAlert2.classList.add("hidden");
      bookNameAlert.classList.add("hidden");
      authorNameAlert.classList.add("hidden");
      descriptionAlert.classList.add("hidden");
      bookPriceAlert.classList.add("hidden");
      bookNameAlert2.classList.remove("hidden");
    } else {
      bookNameAlert2.classList.add("hidden");

      // pushing book object to books araay and setting it on local storage
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));

      // Insering new data To table
      let html = `
      <tr>
          <td>
              ${++i}
          </td>
          <td>
              ${book.bookName}
          </td>
          <td>
              ${book.authorName}
         </td>
          <td>
            ${book.description}
          </td>
          <td>
            ${book.price}
          </td>
        </tr>`;

      document.querySelector(".tbody1").insertAdjacentHTML("beforeend", html);

      // Setting Values to ""
      inputBookName.value = "";
      inputAuthorName.value = "";
      inputDescription.value = "";
      inputBookPrice.value = "";

      // Closing Modal On save button
      const modal = document.querySelector("#staticBackdrop");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    }
  });

  // Adding Event listerner for enter btn for save btn in book creation dialoge box
  document.addEventListener("keypress", (event) => {
    // event.keyCode or event.which  property will have the code of the pressed key
    let keyCode = event.keyCode ? event.keyCode : event.which;

    // 13 points the enter key
    if (keyCode === 13) {
      // call click function of the buttonn
      saveBtn.click();
    }
  });
}

// If User
if (currentUser.role == "User") {
  // Showing Table And Book Dropdown And Buy Button If User Is Logged In
  document.querySelector(".buyBtn").classList.remove("hidden");
  document.querySelector(".bookDropdown").classList.remove("hidden");
  document.querySelector(".tbl2").classList.remove("hidden");

  let i = currentUser.books.length;

  // Displaying Books Data
  currentUser.books.forEach((e, i) => {
    html = `
      <tr>
          <td>
              ${i + 1}
          </td>
          <td>
              ${e}
          </td>
        </tr>`;

    document.querySelector(".tbody2").insertAdjacentHTML("beforeend", html);
  });

  // Creating A Dropdown based on books created by admin
  books.map((e) => {
    html = ` <option>  ${e.bookName} </option>`;
    document.querySelector("#choice").insertAdjacentHTML("beforeend", html);
  });

  // Buy button Click Event
  buyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let book = bookChoice.value;

    // Validating Book Choices Of User
    if (!bookChoice.value) {
      document.querySelector(".bookAlert").classList.remove("hidden");
      document.querySelector(".bookPAlert").classList.add("hidden");
      document.querySelector(".conformText").classList.add("hidden");
      document.querySelector(".agreeBtn").classList.add("hidden");
      bookChoice.value = "";
    } else if (currentUser.books.includes(bookChoice.value)) {
      document.querySelector(".bookAlert").classList.add("hidden");
      document.querySelector(".bookPAlert").classList.remove("hidden");
      document.querySelector(".conformText").classList.add("hidden");
      document.querySelector(".agreeBtn").classList.add("hidden");
      bookChoice.value = "";
    } else {
      document.querySelector(".bookPAlert").classList.add("hidden");
      document.querySelector(".bookAlert").classList.add("hidden");
      document.querySelector(".conformText").classList.remove("hidden");
      document.querySelector(".agreeBtn").classList.remove("hidden");
    }
  });

  // agree button event listener
  agreeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let book = bookChoice.value;

    // pushing book to current users book array
    users.find( (user) => {
      if (user.userName === currentUser.userName) {
        user.books.push(book);
      }
    });

    books.find((bk)=> {
      if(bk.bookName === book){
        bk.users.push(currentUser.userName);
      } 
    })
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("books", JSON.stringify(books));

    // adding current data to table
    let html = `
    <tr>
       <td>
           ${++i}
       </td>
       <td>
           ${bookChoice.value}
       </td>
     </tr>`;

    document.querySelector(".tbody2").insertAdjacentHTML("beforeend", html);

    // setting value to ""
    bookChoice.value = "";

    // closing modal on buy button
    const modal = document.querySelector("#exampleModal");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  });

  // Adding enter event on agree btn
  document.addEventListener("keypress", (event) => {
    let keyCode = event.keyCode ? event.keyCode : event.which;

    // 13 points the enter key
    if (keyCode === 13) {
      // call click function of the buttonn
      agreeBtn.click();
    }
  });
}

// Log Out Btn redirecting To Register page
logOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  location.href = "register.html";
});
