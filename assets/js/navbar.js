const menuBtn = document.getElementById('menu-btn'); // Sélection du bouton du menu
const overlayMenu = document.getElementById('overlay-menu'); // Sélection de l'overlay menu
const overlayBg = document.getElementById('overlay-bg'); // Sélection de l'overlay background
let isMenuOpen = false; // Variable de suivi pour l'état du menu

menuBtn.addEventListener('click', () => {
  if (!isMenuOpen) {
    overlayBg.classList.add('open');  // Fade in background
    overlayMenu.classList.add('open');  // Slide in menu
    menuBtn.innerHTML = '&times;'; // Change icon to "close"
  } else {
    overlayBg.classList.remove('open');  // Fade out background
    overlayMenu.classList.remove('open');  // Slide out menu
    menuBtn.innerHTML = '&#9776;'; // Change back to "menu" icon
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
function clickalreadyhere(){

  alreadyhere.innerHTML="You are already here :)";
  window.setTimeout(function () {
    alreadyhere.innerHTML="Overall";
}, 2000);}
alreadyhere.addEventListener('click', clickalreadyhere);
