/*
    Set the theme before anything is painted.
*/
(function () {
    var theme = "dark";
    try { theme = localStorage.getItem("theme") || "dark"; } catch (e) {}
    if (theme === "dark") return;
    var root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
})();
