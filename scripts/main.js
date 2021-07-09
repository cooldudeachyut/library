let myLibrary = [];
let inputContainer = document.getElementById("input-container");
let form = document.getElementById("input-book-form");
let divs = form.getElementsByClassName("info");
let grid = document.getElementById("book-grid");
let title_node = document.getElementById("title");
let author_node = document.getElementById("author");
let genre_node = document.getElementById("genre");
let year_node = document.getElementById("year");
let ind = 0;

function Book (title, author, genre, year, id) {
	this.title = title;
	this.author = author;
	this.genre = genre;
	this.year = year;
	this.id = id
	this.read = false;
}

function addBookToLibrary() {
	let newbook = new Book(title_node.value, author_node.value, genre_node.value, year_node.value, ind++);
	myLibrary.push(newbook);
	buildNewCard(newbook.title, newbook.author, newbook.genre, newbook.year, newbook.id, newbook.read);
	
	closeForm();
}

function removeElement() {
	
}

function changeReadStatus() {

}

function buildNewCard(title, author, genre, year, id, read)
{
	let div = document.createElement("div");
	div.classList.add("book-grid-card");
	grid.append(div);

	for (let j = 0; j < 4; j++)
	{
		let text = document.createElement("p");

		if (j == 0)
			text.textContent = "Title: " + title;
		else if (j == 1)
			text.textContent = "Author: " + author;
		else if (j == 2)
			text.textContent = "Genre: " + genre;
		else
		{
			if (year != "")
				text.textContent = "Year Published: " + year;
		}

		div.append(text);
	}

	let buttondiv = document.createElement("div");
	buttondiv.classList.add("button-div");
	div.append(buttondiv);

	let removebtn = document.createElement("button");
	removebtn.type = "button";
	removebtn.innerText = "REMOVE";
	removebtn.addEventListener("click", removeElement);
	removebtn.classList.add("card-button", "red");

	let readStatus = document.createElement("button");
	readStatus.type = "button";
	readStatus.addEventListener("click", changeReadStatus);
	readStatus.classList.add("card-button");

	if (read == true)
	{
		readStatus.innerText = "READ";
		readStatus.classList.add("green");
	}
	
	else
	{
		readStatus.innerText = "UNREAD";
		readStatus.classList.add("red");
	}

	buttondiv.append(removebtn);
	buttondiv.append(readStatus);
}

function buildLibrary() {

	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}

	for (let i = 0; i < myLibrary.length; i++)
	{
		let newdiv = buildNewCard(myLibrary[i].title, myLibrary[i].author, myLibrary[i].genre, myLibrary[i].year, myLibrary[i].id, myLibrary[i].read);
	}
}

function openForm() {
	inputContainer.style.display = "flex";
	inputContainer.classList.add("container-anim");
	form.classList.add("form-anim");

	for (let div of divs)
		div.classList.add("input-box-anim");
}

function closeForm() {
	inputContainer.style.display = "none";
	inputContainer.classList.remove("container-anim");
	form.classList.remove("form-anim");

	for (let div of divs)
		div.classList.remove("input-box-anim");

	title_node.value = ""; 
	author_node.value = "";
	genre_node.value = ""; 
	year_node.value = "";
}

function closeFormCheck(event) {
	if (event.target != inputContainer)
		return;

	closeForm();
}

document.getElementById("add-book-button").addEventListener("click", openForm);
inputContainer.addEventListener("mousedown", closeFormCheck);

let today = new Date();
document.getElementById("year").setAttribute("max", `${today.getFullYear}`);

buildLibrary();