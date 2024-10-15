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
      Searchbar.classList.remove('open');
      Searchbtn.classList.remove('open');
      isSearchOpen=!isSearchOpen;
    }
    if(isFilterOpen){
      filterMenu.classList.remove('open');
      isFilterOpen=!isFilterOpen;
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

const Searchbtn = document.getElementById('searchbar'); 
const Searchbar = document.getElementById('searchclick')
const navbar = document.getElementById('navbar-center');
let isSearchOpen = false; 

function searchclick(){
  if (!isMenuOpen) {
    if (!isSearchOpen) {
      Searchbar.classList.add('open');
      Searchbtn.classList.add('open');
    }
    isSearchOpen=!isSearchOpen;
  }
};

function resetSearch() {
  if(!isMenuOpen){
  window.setTimeout(function () {
      Searchbtn.classList.remove('open');
      Searchbar.classList.remove('open');
      isSearchOpen=!isSearchOpen;
  }, 200);}}

  Searchbtn.addEventListener('click', searchclick);
  overlayBg.addEventListener('click', resetSearch);
  menuBtn.addEventListener('click',resetSearch);
  navbar.addEventListener('click',resetSearch);

  // -- filter -- //

  const filterclick = document.getElementById('filtericon');
  const filterMenu = document.getElementById('filter')
  let isFilterOpen = false;
  filterclick.addEventListener('click',filterui);
  function filterui(){
    if(!isMenuOpen){
    if(!isFilterOpen){
      filterMenu.classList.add('open');
    } else {
      filterMenu.classList.remove('open');
    }
    isFilterOpen=!isFilterOpen;
  }
}