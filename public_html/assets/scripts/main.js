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

function sanitize(str) {
    return str.replace(/[^\w. ]/gi, function (c) {
		return '&#' + c.charCodeAt(0) + ';';
	});
}

/*
    Block "Darkreader" extension
        - It's the most popular dark-theme extension
        - The site has a nicer default dark theme
*/
function removeDarkreaderStyles() {
    let darkreaderEls = Array.from(document.getElementsByClassName("darkreader"));
    darkreaderEls.forEach((el) => {
        // Darkreader depends on CSS media queries, so we break them.
        el.media = "disabled";
    });
    // Return true if dark reader els existed
    return darkreaderEls.length > 1; // 1, not 0, as darkreader installs fallback even when disabled
};
let darkreaderInstalled = removeDarkreaderStyles();


/*
    Dock navbar when scrolling.
*/
const navbar = document.getElementById("navbar");
const spacer = document.getElementById("navbar-spacer");
const container = document.getElementById("page-contianer");

// Resize navbar on page scroll
function handleResize() {
    // Not on mobile
    if (screen.width < 450) {
        navbar.style.width = "";
        return
    }
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
    if (screen.width < 450) return; // Not on mobile
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
let storageType;

try {
    localStorage.getItem("success");
    storageType = localStorage;
}
catch {
    storageType = new VirtualCookieJar();
}


// Set page to dark/light via body "dark" class
let themeText = document.getElementById("swap-theme-button");

function setDark() {
    document.body.classList.add("dark");
    storageType.setItem("theme", "dark");
    themeText.innerText = "Light Theme";
}

function setLight() {
    document.body.classList.remove("dark");
    storageType.setItem("theme", "light");
    themeText.innerText = "Dark Theme";
}

// Set theme on page load
let pageloadTheme = storageType.getItem("theme") || "unset";
if (pageloadTheme === "unset") {
    // If darkreader installed, dark by default!
    pageloadTheme = darkreaderInstalled ? "dark" : "light";
}

if (pageloadTheme === "dark") setDark();
else setLight();

// Swap theme function for "Swap [Theme]" button
document.getElementById("swap-theme-button").addEventListener("click", swapTheme);
function swapTheme() {
    let currentTheme = storageType.getItem("theme");
    if (currentTheme === "light") setDark();
    else setLight();
}


/*
    Repetitive tasks
*/
// Autmatically update theme (i.e. if multiple windows are open)
let currentTheme = pageloadTheme;
setInterval(() => {
    let previousTheme = currentTheme;
    currentTheme = storageType.getItem("theme");

    // If theme change, adjust
    if (previousTheme !== currentTheme) {
        if (currentTheme === "light") setLight();
        else setDark();
    }
    
    // If change to dark reader installation, adjust theme accordingly
    let darkreaderCheck = removeDarkreaderStyles();
    if (darkreaderCheck !== darkreaderInstalled) {
        if (darkreaderCheck && currentTheme === "light") setDark();
        else if (!darkreaderCheck && currentTheme === "dark") setLight();
        darkreaderInstalled = darkreaderCheck;
    }

}, 250);
