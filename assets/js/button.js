const button = document.getElementById('button');

// Variable pour compter les clics
let clickCount = 0;

// Fonction qui exécute l'action après 2 clics
function handleClick() {
    clickCount++;
    if (clickCount == 1) {
        button.innerText = 'Are You Sure ?';
        $('.btnsousbox').toggleClass('btnsousbox-clicked');
    }
    if (clickCount === 2) {
        button.innerText = "Action effectuée";
    }
}

// Réinitialise le bouton à l'état initial quand la souris quitte le bouton
function resetButton() {
    if (clickCount != 0) {
        button.innerText = "kick";
        $('.btnsousbox').toggleClass('btnsousbox-clicked');
        clickCount = 0;
    }
}

// Ajoute les événements
button.addEventListener('click', handleClick);
button.addEventListener('mouseleave', resetButton);