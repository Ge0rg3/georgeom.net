/*
    Load recent films and books.
*/
const cacheBuster = btoa(new Date().toGMTString());
fetch("/data/books.json?cache=" + cacheBuster).then((res) => {
    res.json().then((books) => {
        console.info(`${books.length} books loaded.`);
        let booksList = document.getElementById("books-list");
        // Iterate through books and add to HTML list
        for (let i=0; i < 3; i++) {
            // Convert date to string
            let book = books[i];
            let dateObject = new Date(book.read*1000);
            let dateString = dateObject.getDate() + "/" + (dateObject.getMonth() + 1) + "/" + dateObject.getFullYear();
            // Combine all info to list element and append
            let html = `<li><a href="${sanitize(book.link)}">
            ${sanitize(book.title)} <span class="date">${'★'.repeat(book.rating)} ${dateString}</span>
            </a></li>`;
            booksList.innerHTML += html;
        }
    })
})

fetch("/data/films.json?cache=" + cacheBuster).then((res) => {
    res.json().then((films) => {
        console.info(`${films.length} films loaded.`);
        let filmsList = document.getElementById("films-list");
        // Iterate through films and add to HTML list
        for (let i=0; i < 3; i++) {
            // Convert date to string
            let film = films[i];
            let dateObject = new Date(film.watched*1000);
            let dateString = dateObject.getDate() + "/" + (dateObject.getMonth() + 1) + "/" + dateObject.getFullYear();
            // Get rating
            let rating = "★".repeat(Math.floor(film.rating));
            if ((film.rating+"").endsWith(".5")) rating += "½";
            // Combine all info to list element and append
            let html = `<li><a href="${sanitize(film.link)}">
            ${sanitize(film.title)} <span class="date">${rating} ${dateString}</span>
            </a></li>`;
            filmsList.innerHTML += html;
        }
    })
})
