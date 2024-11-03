const menuBtn = document.getElementById("menu-btn"); // Sélection du bouton du menu
const overlayMenu = document.getElementById("overlay-menu"); // Sélection de l'overlay menu
const overlayBg = document.getElementById("overlay-bg"); // Sélection de l'overlay background
let isMenuOpen = false; // Variable de suivi pour l'état du menu

const Searchbar = document.getElementById("searchbar");
const Searchclick = document.getElementById("searchclick");
const navbar = document.getElementById("navbar-center");
const searchicon = document.getElementById("searchicon");
let isSearchOpen = false;

const sorterclick = document.getElementById("sorticon");
const sorterMenu = document.getElementById("sortergroup");
let isSorterOpen = false;

menuBtn.addEventListener("click", () => {
  if (!isMenuOpen) {
    overlayBg.classList.add("open"); // Fade in background
    overlayMenu.classList.add("open"); // Slide in menu
    menuBtn.innerHTML = "&times;"; // Change icon to "close"
    menuBtn.style = "padding-right:9px;padding-top:5px";
    $(function () {
      if ($("body").is(".IndexPage")) {
        if (isSearchOpen) {
          Searchbar.classList.remove("open");
          Searchclick.classList.remove("open");
          isSearchOpen = !isSearchOpen;
          console.log("search");
        }
        if (isSorterOpen) {
          sorterMenu.classList.remove("open");
          isSorterOpen = !isSorterOpen;
        }
      }
    });
  } else {
    overlayBg.classList.remove("open"); // Fade out background
    overlayMenu.classList.remove("open"); // Slide out menu
    menuBtn.innerHTML = "&#9776;"; // Change back to "menu" icon
    menuBtn.style = "padding-right:0";
  }
  isMenuOpen = !isMenuOpen; // Toggle the state
});

// Optional: Close the menu when clicking on the background
overlayBg.addEventListener("click", () => {
  if (isMenuOpen) {
    overlayBg.classList.remove("open");
    overlayMenu.classList.remove("open");
    menuBtn.innerHTML = "&#9776;";
    isMenuOpen = !isMenuOpen;
  }
});

const alreadyhere = document.getElementById("alreadyhere");
if (alreadyhere != null) {
  function clickalreadyhere() {
    alreadyhere.innerHTML = "You are already here :)";
    window.setTimeout(function () {
      alreadyhere.innerHTML = "Overview";
      alreadyhere.style = "font-size:xx-large; text-decoration:none";
    }, 2000);
  }
  alreadyhere.addEventListener("click", clickalreadyhere);
}

$(function () {
  if ($("body").is(".IndexPage")) {
    // -- Search bar -- //

    function searchclick() {
      if (!isMenuOpen) {
        if (!isSearchOpen) {
          Searchclick.classList.add("open");
          Searchbar.classList.add("open");
          document.getElementById("search").focus();
          isSearchOpen = !isSearchOpen;
        }
      } else {
        overlayBg.classList.remove("open"); // Fade out background
        overlayMenu.classList.remove("open"); // Slide out menu
        menuBtn.innerHTML = "&#9776;"; // Change back to "menu" icon
        menuBtn.style = "padding-right:0";
        Searchbar.classList.add("open");
        Searchclick.classList.add("open");
        document.getElementById("search").focus();
        isMenuOpen = !isMenuOpen;
        isSearchOpen = !isSearchOpen;
      }
    }

    function resetSearch() {
      if (!isMenuOpen) {
          Searchbar.classList.remove("open");
          Searchclick.classList.remove("open");
          isSearchOpen = !isSearchOpen;
      }
    }

    searchicon.addEventListener("click", searchclick);
    Searchbar.addEventListener("click", searchclick);
    overlayBg.addEventListener("click", resetSearch);
    menuBtn.addEventListener("click", resetSearch);
    navbar.addEventListener("click", resetSearch);

    // -- Sorter Menu -- //

    sorterclick.addEventListener("click", sorterui);
    function sorterui() {
      if (!isMenuOpen) {
        if (!isSorterOpen) {
          sorterMenu.classList.add("open");
        } else {
          sorterMenu.classList.remove("open");
        }
        isSorterOpen = !isSorterOpen;
      } else {
        overlayBg.classList.remove("open"); // Fade out background
        overlayMenu.classList.remove("open"); // Slide out menu
        menuBtn.innerHTML = "&#9776;"; // Change back to "menu" icon
        menuBtn.style = "padding-right:0";
        sorterMenu.classList.add("open");
        isMenuOpen = !isMenuOpen;
        isSorterOpen = !isSorterOpen;
      }
    }

    function resetsorterui() {
      if (isSorterOpen) {
        sorterMenu.classList.remove("open");
        isSorterOpen = !isSorterOpen;
      }
    }

    overlayBg.addEventListener("click", resetsorterui);
  }
});
