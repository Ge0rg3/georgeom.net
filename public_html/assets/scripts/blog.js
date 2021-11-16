// Get blog posts from JSON file
let posts = [];
fetch("/data/blog.json").then((res) => {
    res.json().then((retrievedPosts) => {
        console.info(`${retrievedPosts.length} posts loaded.`);
        posts = retrievedPosts;
        updatePosts();
    })
})

function updatePosts() {
    // Get filters from query ps
    const currentParams = new URLSearchParams(location.search);
    const category = currentParams.get("category");
    const year = currentParams.get("year");
    const source = currentParams.get("source");
    // Filter blog posts
    filteredPosts = posts.filter((post) => {
        // Check year matches
        const postYear = (new Date(post.date*1000)).getFullYear();
        if (year !== null && year !== postYear + "") return false;
        // Check source matches
        if (source !== null && source !== post.source) return false;
        // Check category matches
        if (category !== null && category !== post.category) return false;
        return true;
    })
    // Add to element
    let postsList = document.getElementById("blog-posts");
    postsList.innerHTML = "";
    for (let post of filteredPosts) {
        const date = new Date(post.date*1000).toUTCString();
        postsList.innerHTML += `
        <div class="row">
        <h5>${post.title}</h5>
        <p><i>${date}</i></p>
        <p>${post.preview}</p>
        <p><i><a href="${post.link}">Read more...</a></i></p>
        </div>
        <hr style="width: 100%">
        `;
    }
}

// Add change listeners on selects
let selects = Array.from(document.getElementsByTagName("select"));
selects.forEach((select) => {
    select.addEventListener("change", function (evt) {
        // Get the URL parameter based off select type
        let queryParameter;
        switch (evt.currentTarget.id) {
            case "category-select":
                queryParameter = "category";
                break;
            case "year-select":
                queryParameter = "year";
                break;
            case "source-select":
                queryParameter = "source";
                break;
            default:
                return;
        }
        // Find current url and param stats
        let baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        let currentParams = new URLSearchParams(location.search);
        // Update query params
        if (evt.target.value == "") {
            currentParams.delete(queryParameter);
        } else {
            currentParams.set(queryParameter, evt.currentTarget.value);
        }
        // Add new selection criteria to URL
        const newUrl = baseUrl + (currentParams.toString().length > 0 ? "?" : "") + currentParams.toString();
        window.history.pushState({path: newUrl}, "", newUrl);
        // Reload blog items
        updatePosts();
    })
})

// Set default selects from query ps
const queryParams = new URLSearchParams(location.search);
document.getElementById("category-select").value = queryParams.get("category") || "";
document.getElementById("year-select").value = queryParams.get("year") || "";
document.getElementById("source-select").value = queryParams.get("source") || "";
