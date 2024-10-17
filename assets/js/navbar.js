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
    if (isSearchOpen) {
      Searchbar.classList.remove('open');
      Searchclick.classList.remove('open');
      isSearchOpen = !isSearchOpen;
    }
    if (issorterOpen) {
      sorterMenu.classList.remove('open');
      issorterOpen = !issorterOpen;
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
    isMenuOpen = !isMenuOpen;
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

const Searchbar = document.getElementById('searchbar');
const Searchclick = document.getElementById('searchclick')
const navbar = document.getElementById('navbar-center');
let isSearchOpen = false;

function searchclick() {
  if (!isMenuOpen) {
    if (!isSearchOpen) {
      Searchclick.classList.add('open');
      Searchbar.classList.add('open');
      document.getElementById('search').focus();
      isSearchOpen = !isSearchOpen;
    }
  }
  else {
    overlayBg.classList.remove('open');  // Fade out background
    overlayMenu.classList.remove('open');  // Slide out menu
    menuBtn.innerHTML = '&#9776;'; // Change back to "menu" icon
    menuBtn.style = "padding-right:0";
    Searchbar.classList.add('open');
    Searchclick.classList.add('open');
    isMenuOpen = !isMenuOpen;
    isSearchOpen = !isSearchOpen;
  }

};

function resetSearch() {
  if (!isMenuOpen) {
    window.setTimeout(function () {
      Searchbar.classList.remove('open');
      Searchclick.classList.remove('open');
      isSearchOpen = !isSearchOpen;
    }, 200);
  }
}

Searchbar.addEventListener('click', searchclick);
overlayBg.addEventListener('click', resetSearch);
menuBtn.addEventListener('click', resetSearch);
navbar.addEventListener('click', resetSearch);

// -- Sorter Menu -- //

const sorterclick = document.getElementById('sorticon');
const sorterMenu = document.getElementById('sortergroup');
let issorterOpen = false;
sorterclick.addEventListener('click', sorterui);
function sorterui() {
  if (!isMenuOpen) {
    if (!issorterOpen) {
      sorterMenu.classList.add('open');
    } else {
      sorterMenu.classList.remove('open');
    }
    issorterOpen = !issorterOpen;
  }
  else {
    overlayBg.classList.remove('open');  // Fade out background
    overlayMenu.classList.remove('open');  // Slide out menu
    menuBtn.innerHTML = '&#9776;'; // Change back to "menu" icon
    menuBtn.style = "padding-right:0";
    sorterMenu.classList.add('open');
    isMenuOpen = !isMenuOpen;
    issorterOpen = !issorterOpen;
  }
}

function resetsorterui() {
  if (issorterOpen) {
    sorterMenu.classList.remove('open');
    issorterOpen = !issorterOpen;
  }
}

overlayBg.addEventListener('click', resetsorterui);