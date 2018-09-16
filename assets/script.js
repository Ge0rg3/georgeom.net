// Make sidebar smaller on scroll:
function sideBarScroll(){
  var element = document.getElementById("sidebar");
  if(window.pageYOffset >= 100){
     element.style.cssText += "width: 15%";
    }
  else {
     element.style.cssText += "width: 20%";
   }
 }

window.onscroll = sideBarScroll;

//Flashing underscore in title:
function flashingUnderscore() {
  var underscore_space = document.getElementById("underscore");
  if (underscore_space.innerHTML == "_") {
    underscore_space.innerHTML = "";
  } else {
    underscore_space.innerHTML = "_";
  }
}

setInterval(flashingUnderscore, 700);

//Allow typing in webpage:
var titleString = "George O";
document.getElementById("usertitle").innerHTML = titleString;
document.onkeypress = function typingListener(key) {
  // console.log(key.keyCode); console.log(String.fromCharCode(key.keyCode));
  if (key.keyCode != 60 && key.keyCode != 62) {
    titleString += (String.fromCharCode(key.keyCode));
    document.getElementById("usertitle").innerHTML = titleString;
  }
};
//Allow backspace & prevent pagedown on space:
document.onkeydown = function backspace(key) {
  if (key.keyCode == 8) {
    // Fix backspace a "&nbsp;":
    if (titleString.substr(titleString.length -6).includes("&nbsp;")) {
      titleString = titleString.substring(0, titleString.length -6);
    } else {
      titleString = titleString.substring(0, titleString.length -1);
    }
    document.getElementById("usertitle").innerHTML = titleString;
  } else if (key.keyCode == 32) { // Fix page down on space:
    key.preventDefault();
    titleString += "&nbsp;";
    document.getElementById("usertitle").innerHTML = titleString;
  }
};

//

//More dropdown menu:
//Note: Possibly use onmouseover and onmouseout events for better non-link optimization?
function dropdown() {
  var dropdown = document.getElementsByClassName('dropdown-content')[0];
  if (dropdown.style.opacity == 0) {
    dropdown.style.opacity = 1;
    dropdown.style.visibility = "visible";
  } else {
    dropdown.style.opacity = 0;
    dropdown.style.visibility = "hidden";
  };
}
