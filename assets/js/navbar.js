const menuBtn = document.getElementById('menu-btn'); // Sélection du bouton du menu
const overlayMenu = document.getElementById('overlay-menu'); // Sélection de l'overlay menu
const overlayBg = document.getElementById('overlay-bg'); // Sélection de l'overlay background
let isMenuOpen = false; // Variable de suivi pour l'état du menu

menuBtn.addEventListener('click', () => {
  if (!isMenuOpen) {
    overlayBg.classList.add('open');  // Fade in background
    overlayMenu.classList.add('open');  // Slide in menu
    menuBtn.innerHTML = '&times;'; // Change icon to "close"
    menuBtn.style = "padding-right:9px;padding-top:5px";
    if(isSearchOpen){
      overlaySearch.classList.remove('open');
    }
  } else {
    overlayBg.classList.remove('open');  // Fade out background
    overlayMenu.classList.remove('open');  // Slide out menu
    menuBtn.innerHTML = '&#9776;'; // Change back to "menu" icon
    menuBtn.style = "padding-right:0";
  }
  isMenuOpen = !isMenuOpen; // Toggle the state
});

// Optional: Close the menu when clicking on the background
overlayBg.addEventListener('click', () => {
  if (isMenuOpen) {
    overlayBg.classList.remove('open');
    overlayMenu.classList.remove('open');
    menuBtn.innerHTML = '&#9776;';
    isMenuOpen = false;
  }
});

const alreadyhere = document.getElementById("alreadyhere")
if (alreadyhere != null) {
  function clickalreadyhere() {

    alreadyhere.innerHTML = "You are already here :)";
    window.setTimeout(function () {
      alreadyhere.innerHTML = "Overview";
      alreadyhere.style = "font-size:xx-large; text-decoration:none"
    }, 2000);
  }
  alreadyhere.addEventListener('click', clickalreadyhere);
}




// -- Search bar -- //

const Searchbtn = document.getElementById('searchclick'); // Sélection du bouton du menu
const overlaySearch = document.getElementById('searchbar'); // Sélection de l'overlay menu
const searchbar = document.getElementById('search');
let isSearchOpen = false; // Variable de suivi pour l'état du menu

Searchbtn.addEventListener('click', () => {
  if (!isMenuOpen) {
    if (!isSearchOpen) {
      overlaySearch.classList.add('open');
      searchbar.classList.add('open');
    } else {
      overlaySearch.classList.remove('open');
      searchbar.classList.Remove('open');
    }
    isSearchOpen=!isSearchOpen;
  }
});