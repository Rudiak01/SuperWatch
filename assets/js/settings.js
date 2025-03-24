const theme = document.getElementById("theme");

console.log(theme.option);

const contrast = document.getElementById("contrast");
const elements = document.querySelectorAll("*");
let iscontrast = false;
function getContrast() {
  if (!iscontrast) {
    elements.forEach((element) => {
      element.classList.add("contrast");
    });
    iscontrast = !iscontrast;
  } else {
    elements.forEach((element) => {
      element.classList.remove("contrast");
    });
    iscontrast = !iscontrast;
  }
}

