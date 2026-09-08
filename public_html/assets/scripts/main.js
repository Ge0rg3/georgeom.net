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
    Light/Dark theme toggle.
    theme.js sets the class in <head>
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

// Set page to dark/light via body/html "dark" class
let themeText = document.getElementById("swap-theme-button");

function setDark() {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    document.body.classList.add("dark");
    storageType.setItem("theme", "dark");
    themeText.innerText = "Light Theme";
}

function setLight() {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    document.body.classList.remove("dark");
    storageType.setItem("theme", "light");
    themeText.innerText = "Dark Theme";
}

// Set theme on page load (theme.js has already done <html>)
let pageloadTheme = storageType.getItem("theme") || "dark";

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
    Update theme when changed in another tab
*/
window.addEventListener("storage", (evt) => {
    if (evt.key !== "theme" || evt.newValue === null) return;
    if (evt.newValue === "light") setLight();
    else setDark();
});

new MutationObserver(() => {
    let darkreaderCheck = removeDarkreaderStyles();
    if (darkreaderCheck === darkreaderInstalled) return;
    let currentTheme = storageType.getItem("theme");
    if (darkreaderCheck && currentTheme === "light") setDark();
    else if (!darkreaderCheck && currentTheme === "dark") setLight();
    darkreaderInstalled = darkreaderCheck;
}).observe(document.documentElement, { childList: true, subtree: true });
