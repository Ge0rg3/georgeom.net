/*
    Load recent films and books.
*/
fetch("/data/books.json").then((res) => {
    res.json().then((books) => {
        console.info(`${books.length} books loaded.`);
        let booksList = document.getElementById("books-list");
        // Iterate through books and add to HTML list
        for (let i=0; i < 3; i++) {
            // Convert date to string
            let book = books[i];
            let dateObject = new Date(book.read*1000);
            let dateString = (dateObject.getDate() + 1) + "/" + (dateObject.getMonth() + 1) + "/" + dateObject.getFullYear();
            // Combine all info to list element and append
            let html = `<li><a href="${book.link}">
            ${book.title} <span class="date">${'★'.repeat(book.rating)} ${dateString}</span>
            </a></li>`;
            booksList.innerHTML += html;
        }
    })
})

fetch("/data/films.json").then((res) => {
    res.json().then((films) => {
        console.info(`${films.length} films loaded.`);
        let filmsList = document.getElementById("films-list");
        // Iterate through films and add to HTML list
        for (let i=0; i < 3; i++) {
            // Convert date to string
            let film = films[i];
            let dateObject = new Date(film.watched*1000);
            let dateString = (dateObject.getDate() + 1) + "/" + (dateObject.getMonth() + 1) + "/" + dateObject.getFullYear();
            // Combine all info to list element and append
            let html = `<li><a href="${film.link}">
            ${film.title} <span class="date"> ${dateString}</span>
            </a></li>`;
            filmsList.innerHTML += html;
        }
    })
})