fetch("/data/blog.json").then((res) => {
    res.json().then((posts) => {
        console.info(`${posts.length} posts loaded.`);
        let postsList = document.getElementById("blog-posts");
        for (let post of posts) {
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
    })
})