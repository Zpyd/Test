var prvPatInit = true;
var tocniParovi;
var Attempts;
var karti_tocni = new Array(12);
var karti_simboli = new Array(12);
var indCurFlipped = new Array(2);
var brCurFlipped;
var isChecking;

const KARTI_SIMBOLI = ["☠️", "⚜️", "⚔️", "☢️", "⛄", "♦️"];

// function showWidth() {
//   const width = window.innerWidth;
//   document.getElementById("widthDisplay").textContent =
//     "Current width: " + width + "px";
// }

// showWidth();
// window.addEventListener("resize", showWidth);

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("welcomeModal");
  const closeBtn = document.getElementById("closeModalBtn");

  setTimeout(function () {
    modal.style.display = "flex";
    setTimeout(function () {
      modal.classList.add("pretstaveno");
    }, 50);
  }, 800);

  closeBtn.addEventListener("click", function () {
    modal.classList.remove("pretstaveno");
    modal.style.display = "none";
  });
});

function initGame() {
  document.getElementById("Attempts-count").innerHTML = "Attempts: 0";
  var brSimbol = 0;
  var karti_opredeleni = new Array(12).fill(0);

  for (let ind = 0; ind < karti_opredeleni.length; ind++) {
    var izbrana = Math.floor(Math.random() * karti_opredeleni.length);
    if (!karti_opredeleni[izbrana]) {
      karti_opredeleni[izbrana] = 1;
      if (brSimbol == KARTI_SIMBOLI.length) brSimbol = 0;
      karti_simboli[izbrana] = KARTI_SIMBOLI[brSimbol];
      brSimbol++;
    } else {
      --ind;
      continue;
    }
  }
  // console.log("tuka sum");
  karti_tocni.fill(0);
  indCurFlipped = [];
  brCurFlipped = 0;
  Attempts = 0;
  tocniParovi = 0;
  brCurFlipped = 0;
  isChecking = false;
}

function startGame() {
  initGame();
  setTimeout(flipAll, 500);
  setTimeout(function () {
    unflipAll();
    gameLoop();
  }, 3000);
}

function gameLoop() {
  const container = document.getElementById("karti-container");
  container.addEventListener("click", function (event) {
    if (event.target.classList.contains("card")) {
      var cardID = parseInt(event.target.id.slice(1), 10);

      if (karti_tocni[cardID]) {
        return;
      }

      if (isChecking) {
        return;
      }

      if (brCurFlipped <= 1) {
        // console.log(brCurFlipped);
        indCurFlipped[brCurFlipped] = cardID;
        flip("k" + cardID);

        if (brCurFlipped == 1) {
          if (indCurFlipped[0] == indCurFlipped[1]) return;
          isChecking = true;
          Attempts++;
          document.getElementById("Attempts-count").innerHTML =
            "Attempt: " + Attempts;
          if (
            karti_simboli[indCurFlipped[0]] == karti_simboli[indCurFlipped[1]]
          ) {
            tocniParovi++;
            if (tocniParovi == 6) {
              setTimeout(congrats, 500);
            }
            karti_tocni[indCurFlipped[0]] = 1;
            karti_tocni[indCurFlipped[1]] = 1;
            isChecking = false;
          } else {
            setTimeout(function () {
              console.log("ulavam za sigurno");
              unflip("k" + indCurFlipped[0]);
              unflip("k" + indCurFlipped[1]);
              isChecking = false;
            }, 800);
          }
          brCurFlipped = -1;
        }
        brCurFlipped++;
      }
    }
  });
}

function flipAll() {
  var spil = document.getElementsByClassName("card");
  for (let index = 0; index < spil.length; index++) {
    console.log(spil[index].id);
    flip(spil[index].id);
  }
}

function unflipAll() {
  var spil = document.getElementsByClassName("card");
  for (let index = 0; index < spil.length; index++) {
    unflip(spil[index].id);
  }
}

function flip(cardID) {
  var flipnata = document.getElementById(cardID);
  var index = parseInt(cardID.slice(1), 10);
  flipnata.classList.add("card-zavrtena");
  flipnata.innerHTML = karti_simboli[index];
}

function unflip(cardID) {
  var flipnata = document.getElementById(cardID);
  var index = parseInt(cardID.slice(1), 10);
  flipnata.classList.remove("card-zavrtena");
  flipnata.innerHTML = "";
}

function congrats() {
  var victorySound = new Audio("victory2.mp3");
  victorySound.play();
  const modal = document.getElementById("congratsModal");
  const closeBtn = document.getElementById("closeModalBtn");

  setTimeout(function () {
    modal.style.display = "flex";
    setTimeout(function () {
      modal.classList.add("pretstaveno");
      modal.querySelector("#attempts-display").innerHTML =
        "You finished the game in: " + Attempts + " attempts!!!";
    }, 30);
  }, 700);

  closeBtn.addEventListener("click", function () {
    modal.classList.remove("pretstaveno");
    modal.style.display = "none";
  });
}

function play() {
  if (prvPatInit) {
    var kopce = document.getElementById("start-button");
    kopce.innerHTML = "Retry";
    kopce.classList.toggle("kopce-nov-position");
    prvPatInit = false;
  }
  startGame();
}
