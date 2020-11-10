/*
    Helper funcs
*/
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
        spacer.style.height = navHeight + "px";
    } else {
        navbar.classList.remove("sticky");
        spacer.style.height = 0 + "px";
    }
}

/*
    Light/Dark theme toggle.
    There are two different methods used to set themes:
    * localStorage: The preferred way, as vanilla JS cookie handling is annoying.
    * "Virtual" cookie jar: Simply stored within the JS context, non-persistant. For incognito users. 
*/

// Check wether to use localstorage or virtual cookies
let storage_type;

try {
    localStorage.getItem("success");
    storage_type = localStorage;
}
catch {
    storage_type = new VirtualCookieJar();
}


// Set page to dark/light via body "dark" class
let themeText = document.getElementById("swap-theme-button");

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
document.getElementById("swap-theme-button").addEventListener("click", swapTheme);
function swapTheme() {
    let currentTheme = storage_type.getItem("theme") || "light";
    if (currentTheme === "light") {
        setDark();
    } else {
        setLight();
    }
}
