/*
    Helper funcs
*/
class CookieJar {
    getItems() {
        let cookies = {};
        let cookie_str = document.cookie;
        let chunks = cookie_str.split("; ");
        for (let chunk of chunks) {
            let spl = chunk.split("=");
            cookies[spl[0]] = spl[1];
        }
        return cookies;
    }

    getItem(key) {
        return this.getItems()[key];
    }

    setItem(key, val) {
        let cookies = this.getItems();
        cookies[key] = val;
        let cookie_chunks = [];
        for (let cookie_key in cookies) {
            cookie_chunks.push(cookie_key + "=" + cookies[cookie_key]);
        }
        document.cookie = cookie_chunks.join("; ");
    }
}

class VirtualCookieJar {
    constructor() {
        this.jar = {};
    }

    getItems() {
        return this.jar;
    }
    
    getItem(key) {
        return this.getItems()[key];
    }

    setItem(key, val) {
        this.jar[key] = val;
    }
}

/*
    Lock navbar in place when scrolling.
*/
window.onscroll = function() {handleScroll()};

let navbar = document.getElementById("navbar");
let spacer = document.getElementById("navbar-spacer");

let offset = navbar.offsetTop;
let navHeight = navbar.offsetHeight;

function handleScroll() {
    if (window.pageYOffset > offset) {
    navbar.classList.add("sticky");
    spacer.style.height = navHeight;
    } else {
    navbar.classList.remove("sticky");
    spacer.style.height = 0;
    }
}

/*
    Light/Dark theme toggle.
    There are three different ways to store the theme... Thanks, 2020.
    * Cookies: Preferred approach, stores the theme value in cookies.
    * Local Storage: Works in local, but not incognito mode (cookies cannot be set to files).
    * Virtual Cookies: For incognito mode, where both cookies and localStorage are blocked.
*/

// Check wether to use cookie or localstorage
let storage_type = null;
// 1: Cookies
if (document.cookie === "") {
    document.cookie = "success=true;";
}
if (document.cookie !== "") {
    storage_type = new CookieJar();
}
// 2: Local Storage
if (storage_type === null) {
    try {
        localStorage.getItem("success");
        storage_type = localStorage;
    }
    // 3: Virtual cookies
    catch {
        storage_type = new VirtualCookieJar();
    }
}

// Set page to dark/light via body "dark" class
let themeText = document.getElementById("theme-text");

function setDark() {
    document.body.classList.add("dark");
    storage_type.setItem("theme", "dark");
    themeText.innerText = "Light Theme";
}

function setLight() {
    document.body.classList.remove("dark");
    storage_type.setItem("theme", "light");
    themeText.innerText = "Dark Theme";
}

// Set theme on page load
if ((storage_type.getItem("theme") || "light") === "dark") {
    setDark();
} else {
    setLight();
}

// Swap theme function for "Swap [Theme]" button
function swapTheme() {
    let currentTheme = storage_type.getItem("theme") || "light";
    if (currentTheme === "light") {
        setDark();
    } else {
        setLight();
    }
}
