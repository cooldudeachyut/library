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

function removeElement(event) {
	let child = event.currentTarget;
	let target = (child.parentNode).parentNode;
	const id = target.firstChild.innerText;
	target.remove();

	for (let i = 0; i < myLibrary.length; i++)
	{
		if (myLibrary[i].id == id)
		{
			myLibrary.splice(i, 1);
		}
	}
}

function changeReadStatus(event) {
	let status = event.currentTarget;
	let newStatus;
	let check = [...status.classList];
	if (check[1] == "red")
	{
		status.classList.remove("red");
		status.classList.add("green");
		newStatus = "READ";
	}

	else if (check[1] == "green")
	{
		status.classList.remove("green");
		status.classList.add("red");
		newStatus = "UNREAD";
	}

	status.innerText = newStatus;

	let parent = (status.parentNode).parentNode;
	const id = parent.firstChild.innerText;

	for (let i = 0; i < myLibrary.length; i++)
	{
		if (myLibrary[i].id == id)
		{
			if (newStatus == "READ")
				myLibrary[i].read = true;
			
			else
				myLibrary[i].read = false;
		}
	}
}

function buildNewCard(title, author, genre, year, id, read)
{
	let div = document.createElement("div");
	div.classList.add("book-grid-card");
	grid.append(div);

	let hiddenID = document.createElement("div");
	hiddenID.textContent = id;
	hiddenID.style.display = "none";
	div.append(hiddenID);

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
			text.textContent = "Year Published: " + year;
			if (year == "")
				text.style.visibility = "hidden";
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
document.getElementById("year").setAttribute("max", `${today.getFullYear()}`);

buildLibrary();