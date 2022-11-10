let colorMain = localStorage.getItem("color-option");

if (colorMain !== null) {
  document.documentElement.style.setProperty("--main-color", colorMain);
  document.querySelectorAll(".color-list li").forEach((ele) => {
    ele.classList.remove("active");

    if (ele.dataset.color === colorMain) {
      ele.classList.add("active");
    }
  });
}
// switch Colors
const colorSli = document.querySelectorAll(".color-list li");

colorSli.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color-option", e.target.dataset.color);

    handleActive(e);
  });
});

let backgroundOption = true;
// variable to control the interval
let backgroundInterval;
// function to randomize image

let mainRandomBack = localStorage.getItem("background_option");

if (mainRandomBack !== null) {
  if (mainRandomBack === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  document.querySelectorAll(".random-backgrounds span").forEach((span) => {
    span.classList.remove("active");

    if (mainRandomBack === "true") {
      document
        .querySelector(".random-backgrounds .yes")
        .classList.add("active");
    } else {
      document.querySelector(".random-backgrounds .no").classList.add("active");
    }
    // target.classList.add("active");
  });
}

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(function () {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      // Change Background Image Url
      landingPage.style.backgroundImage =
        'url("img/LandingPage/' + imgArray[randomNumber] + '")';
      landingPage.style.backgroundPosition = "center";
      landingPage.style.backgroundSize = "cover";
    }, 3000);
  }
}
randomizeImgs();
// switch Random background Option
const randomBackEL = document.querySelectorAll(".random-backgrounds span");

randomBackEL.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// Toggle Spin Class On Icon
document.querySelector(".toggle-setting .fa-gear").onclick = function () {
  //Toggle  Class Fa-gear For Rotation
  this.classList.toggle("fa-spin");

  // Toggle  Class Open On Main Setting Box
  document.querySelector(".setting-box").classList.toggle("open");
};

//Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Get Array of Img
let imgArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];

//   Select Skill Selector
let ourSkills = document.querySelector(".skill");

window.onscroll = function () {
  // skills offset Top
  let skillOffsetTop = ourSkills.offsetTop;

  // skills outer hight
  let skillOuterHight = ourSkills.offsetHeight;

  // window hight
  let windowHeight = this.innerHeight;

  // window Scroll top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillOffsetTop + skillOuterHight - windowHeight) {
    let allSkill = document.querySelectorAll(".skill-box .skill-progress span");

    allSkill.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
// create pop with Image
let ourGallery = document.querySelectorAll(".image-box img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //   create over-lay
    let overlay = document.createElement("div");

    // Add class to over-lay
    overlay.className = "over-lay";

    // Add over-lay to body
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");

    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imageHeading = document.createElement("h3");

      let imgText = document.createTextNode(img.alt);

      imageHeading.appendChild(imgText);

      popupBox.appendChild(imageHeading);
    }

    let popImage = document.createElement("img");

    popImage.src = img.src;

    popupBox.appendChild(popImage);

    document.body.appendChild(popupBox);

    // create button close
    let closeButton = document.createElement("span");

    closeButton.className = "close-button";

    let closeButtonText = document.createTextNode("X");

    closeButton.appendChild(closeButtonText);

    popupBox.appendChild(closeButton);

    document.addEventListener("click", (e) => {
      if (e.target.className === "close-button") {
        //Remove The Currently popup
        e.target.parentElement.remove();

        // Remove overlay
        document.querySelector(".over-lay").remove();
      }
    });
  });
});

// Select All Bullets
let allBullets = document.querySelectorAll(".nav-Bullets .Bullet");

let allLinks = document.querySelectorAll(".links a");

function ScrollSomeWhere(element) {
  element.forEach((e) => {
    e.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
ScrollSomeWhere(allBullets);
ScrollSomeWhere(allLinks);

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });

  ev.target.classList.add("active");
}

let BulletsSpan = document.querySelectorAll(".Bullets-option span");

bulletContainer = document.querySelector(".nav-Bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  BulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    document.querySelector(".Bullets-option .yes").classList.add("active");

    bulletContainer.style.display = bulletLocalItem;
  } else {
    bulletContainer.style.display = bulletLocalItem;
    document.querySelector(".Bullets-option .no").classList.add("active");
  }
}

BulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "Show") {
      bulletContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});

// Reset Button

document.querySelector(".reset-option").onclick = function () {
  localStorage.clear();

  localStorage.removeItem("bullets_option");
  localStorage.removeItem("color-option");
  localStorage.removeItem("background_option");

  // Reload window
  window.location.reload();
};

// Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");

toggleBtn.addEventListener("click", () => {
  //  Toggle class = "menu-active" on Button
  toggleBtn.classList.toggle("menu-active");

  //  Toggle class = "open" on Links
  links.classList.toggle("open");
});

// Click anywhere Outside Menu Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== links) {
    if (links.classList.contains("open")) {
      links.classList.toggle("open");

      toggleBtn.classList.toggle("menu-active");
    }
  }
});

//  StopPropagation
toggleBtn.onclick = function (e) {
  e.stopPropagation();
};

//  StopPropagation
links.onclick = function (e) {
  e.stopPropagation();
};
