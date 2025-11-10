var Logiran = false;
var review = [
  {
    username: "admin",
    grad: "Stip",
    izreka: "Abe prekrasno so da ti raspravam",
    rating: "10/10",
  },
];
var users = [{ username: "admin", password: "admin" }];
var gradoviNames = ["Stip", "Gevgelija", "Skopje"];
var gradSlikiLokacii = [
  [
    "Galerija/Stip/stip_1.jpg",
    "Galerija/Stip/stip_2.jpg",
    "Galerija/Stip/stip_3.jpg",
  ],
  [
    "Galerija/Gevgelija/gev_1.jpg",
    "Galerija/Gevgelija/gev_2.jpg",
    "Galerija/Gevgelija/gev_3.jpg",
  ],
  [
    "Galerija/Skopje/sk_1.png",
    "Galerija/Skopje/sk_2.jpg",
    "Galerija/Skopje/sk_3.jpg",
  ],
]; //{ vviena: ["dadwa.png", "dwadwa"], london: ["dwadaw"] };
var currGradoviSlikiIndeksi = new Array(gradoviNames.length).fill(0);

var currGrad = 0;
console.log(currGrad);
var rotiraj_sliki = true;

//abe vaka ke ima race condition za promenlivata currGrad; jbg we compromise

slidingGalery = document.getElementById("sliderCityGalery");
prevslideBtn = document.getElementById("prevslideBtn");
nextslideBtn = document.getElementById("nextslideBtn");
visitCityBtn = document.getElementById("visit-city-btn");
cityIntroName = document.getElementById("city-intro-name");
prevslideBtn.addEventListener("click", () => {
  console.log("levo");
  rotiranjeSliki(0);
});

nextslideBtn.addEventListener("click", () => {
  rotiranjeSliki(1);
});

function updateSlideshow() {
  slidingGalery.style.backgroundImage = `url('${
    gradSlikiLokacii[currGrad][currGradoviSlikiIndeksi[currGrad]]
  }')`;
  console.log(
    `currGradoviSlikiIndeksi[currGrad]: ${
      currGradoviSlikiIndeksi[currGrad]
    },gradSlikiLokacii[currGrad][currGradoviSlikiIndeksi[currGrad]]: ${
      gradSlikiLokacii[currGrad][currGradoviSlikiIndeksi[currGrad]]
    } `
  );
  cityIntroName.textContent = `${gradoviNames[currGrad]}`;
  visitCityBtn.textContent = `Explore ${gradoviNames[currGrad]}`;
}

function updateCurrGrad(nasoka) {
  if (nasoka) {
    if (currGrad == gradoviNames.length - 1) {
      currGrad = 0;
    } else {
      currGrad++;
    }
  } else {
    if (currGrad == 0) {
      currGrad = gradoviNames.length - 1;
    } else {
      currGrad--;
    }
  }
}

var autoRotateInterval = setInterval(() => {
  if (rotiraj_sliki) {
    rotiranjeSliki(1);
  }
}, 5000);

function rotiranjeSliki(nasoka) {
  if (nasoka) {
    updateCurrGrad(nasoka);
    if (currGrad === 0) {
      for (let i = 0; i < gradoviNames.length; i++) {
        if (currGradoviSlikiIndeksi[i] < gradSlikiLokacii[i].length - 1) {
          currGradoviSlikiIndeksi[i]++;
        } else {
          currGradoviSlikiIndeksi[i] = 0;
        }
      }
    }
  } else {
    updateCurrGrad(nasoka);
    if (currGrad === gradoviNames.length - 1) {
      for (let i = 0; i < gradoviNames.length; i++) {
        if (currGradoviSlikiIndeksi[i] > 0) {
          currGradoviSlikiIndeksi[i]--;
        } else {
          currGradoviSlikiIndeksi[i] = gradSlikiLokacii[i].length - 1;
        }
      }
    }
  }

  updateSlideshow();
}
function checkUser(usr, pasw) {
  var user = users.find((u) => u.username == usr);
  if (user) {
    if (pasw == user.password) {
      return true;
    } else {
      console.log("netocen pasvord");
    }
  } else {
    console.log("ne postoecki akaunt");
  }
}

function createNewAccount(usr, pswd) {
  var user = users.find((u) => u.username == usr);
  if (user) {
    console.log("veke postoe takov akaunt baki");
    return false;
  } else {
    users.push({ username: usr, password: pswd });
    console.log("nov kreiran akaunt");
  }
}

//review submit only u slucaj ako e logiran

const dropdownElement = document.querySelector(".dropdown, .btn-group");

document.querySelectorAll(".dropdown-submenu").forEach(function (element) {
  element.addEventListener("mouseenter", function () {
    this.querySelector(".dropdown-menu").classList.add("show");
  });

  element.addEventListener("mouseleave", function () {
    this.querySelector(".dropdown-menu").classList.remove("show");
  });
});

document.querySelectorAll(".dropdown-submenu > a").forEach(function (element) {
  element.addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
  });
});

cityBtn = document.getElementById("visit-city-btn");
cityBtn.addEventListener("click", function () {
  if (currGrad) {
    rotiraj_sliki = false;
    changeCityHtml(currGrad);
  }
});

function changeCityHtml() {}
