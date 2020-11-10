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
    Dock navbar when scrolling.
*/

const navbar = document.getElementById("navbar");
const spacer = document.getElementById("navbar-spacer");
const container = document.getElementById("page-contianer");

// Resize navbar on page scroll
function handleResize() {
    // Vars needed for navbar docking
    navbarOffset = navbar.offsetTop;
    navHeight = navbar.offsetHeight;
    // Prevents sticky navbar width change due to scrollbar margin-right offset
    let containerWidth = getComputedStyle(container).width;
    navbar.style.width = containerWidth;
}
handleResize();
window.onresize = handleResize;


// Triggers on all scrolls
function handleScroll() {
    if (window.pageYOffset > navbarOffset) {
        navbar.classList.add("sticky");
        spacer.style.height = navHeight + "px";
    } else {
        navbar.classList.remove("sticky");
        spacer.style.height = 0 + "px";
    }
}
window.onscroll = function() {handleScroll()};


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
