/*
    Load recent films and books.
*/
function renderMedia(items, listId, dateField, formatRating) {
    const list = document.getElementById(listId);
    if (!list) return;
    const rows = [];
    for (let i = 0; i < Math.min(3, items.length); i++) {
        const item = items[i];
        const dateObject = new Date(item[dateField] * 1000);
        const dateString = dateObject.getDate() + "/" + (dateObject.getMonth() + 1) + "/" + dateObject.getFullYear();
        rows.push(`<li><a href="${sanitize(item.link)}">
        ${sanitize(item.title)} <span class="date">${formatRating(item.rating)} ${dateString}</span>
        </a></li>`);
    }
    list.innerHTML = rows.join("");
}

fetch("/data/books.json").then((res) => res.json()).then((books) => {
    console.info(`${books.length} books loaded.`);
    renderMedia(books, "books-list", "read", (r) => "★".repeat(r));
});

fetch("/data/films.json").then((res) => res.json()).then((films) => {
    console.info(`${films.length} films loaded.`);
    renderMedia(films, "films-list", "watched", (r) => {
        let rating = "★".repeat(Math.floor(r));
        if ((r + "").endsWith(".5")) rating += "½";
        return rating;
    });
});
