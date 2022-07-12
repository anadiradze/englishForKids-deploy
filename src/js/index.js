import { cards, mainCards } from "./cards.js";
import createElement from "./createElement.js";
const categoryCardMain = document.querySelector(".categoryCardMain");
const menuItems = document.querySelectorAll(".menuItem");
const label = document.querySelector(".destination");
const startBtn = document.querySelector(".startBtn");
const repeat = document.querySelector(".repeat")
const database = {
  pushRandNumbersInThisArr: null,
  mistakes: 0,
};

// generate 8 main cards
function generateMainCards() {
  for (let i = 0; i < cards.length; i++) {
    const categoryCardDiv = createElement({
      tag: "div",
      classList: ["categoryCardDiv", "flexCenterColumn"],
      parent: categoryCardMain,
    });
    const categoryImage = createElement({
      tag: "img",
      classList: ["categoryCardImage"],
      src: mainCards[1][i],
      parent: categoryCardDiv,
    });
    const categoryText = createElement({
      tag: "p",
      classList: ["categoryCardText"],
      text: mainCards[0][i].toUpperCase(),
      parent: categoryCardDiv,
    });

    const playBtn = createElement({
      tag: "div",
      classList: ["playBtn"],
      parent: categoryCardDiv,
    });
    const audio = createElement({
      tag: "audio",
      classList: ["audio"],
      src: mainCards[2][i],
    });
    playBtn.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        audio.play();
      },
      false
    );
  }
}
generateMainCards();

// remove existing cards when clicking main card/menu item
function removehandler(e) {
  while (categoryCardMain.firstChild) {
    categoryCardMain.removeChild(categoryCardMain.firstChild);
    e.preventDefault();
  }
}
const carditos = document.querySelectorAll(".categoryCardDiv");

// play audio randomly
function generateRandCards() {
  let nums = [0, 1, 2, 3, 4, 5, 6, 7];
  let pushRandNumbersInThisArr = [];
  let numsLength = nums.length;
  let randomNumber = 0;

  while (numsLength--) {
    randomNumber = Math.floor(Math.random() * (numsLength + 1));
    pushRandNumbersInThisArr.push(nums[randomNumber]);
    nums.splice(randomNumber, 1);
  }
  database.pushRandNumbersInThisArr = pushRandNumbersInThisArr;
}

function isWrong() {
  for (let j = 0; j < 8; j++) {
    startBtn.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.children[2].children[
        j
      ].addEventListener("click", () => {
        if (
          e.target.parentElement.parentElement.children[2].children[j]
            .children[0].src !==
          categoryCardMain.children[database.pushRandNumbersInThisArr[0]]
            .children[0].src
        ) {
          wrongVoice();
          database.mistakes++;
        }
      });
    });
  }
}
generateRandCards();

isWrong();
for (let i = 0; i < 8; i++) {
  carditos[i].addEventListener("click", playAudioInCarditos); //play sound on start click;
  function playAudioInCarditos() {
    startBtn.addEventListener("click", playAudio);
  }
  function playAudio() {
    if (database.pushRandNumbersInThisArr.length > 0) {
      const audio = createElement({
        tag: "audio",
        classList: ["audio"],
        src: cards[i][database.pushRandNumbersInThisArr[0]].audioSrc,
      });
      audio.play();
      categoryCardMain.children[
        database.pushRandNumbersInThisArr[0]
      ].addEventListener("click", isCorrect); // checks if sound matches card on card click
    }
  }
  startBtn.addEventListener("click",()=>{
    repeat.classList.remove("displayNone");
  })

  repeat.addEventListener("click",()=>{
    if (
      categoryCardMain.children[database.pushRandNumbersInThisArr[0]]
        .children[1].textContent ===
      cards[i][database.pushRandNumbersInThisArr[0]].word
    ){
      const audio = createElement({
        tag: "audio",
        classList: ["audio"],
        src: cards[i][database.pushRandNumbersInThisArr[0]].audioSrc,
      });
      audio.play();
    }
    
  })
  menuItems[i].addEventListener("click", uncheckOnMenuItem);
  function uncheckOnMenuItem() {
    let checkbox = document.querySelectorAll('input[type="checkbox"]');
    checkbox[1].checked = false;
    generateRandCards();
    repeat.disabled=false
    startBtn.addEventListener("click", ()=>{
      if(
        categoryCardMain.children[database.pushRandNumbersInThisArr[0]]
          .children[1].textContent ===
        cards[i][database.pushRandNumbersInThisArr[0]].word
      ){
        playAudio()
      }
    });
  }
  function isCorrect() {
    if (
      categoryCardMain.children[database.pushRandNumbersInThisArr[0]]
        .children[1].textContent ===
      cards[i][database.pushRandNumbersInThisArr[0]].word
    ) {
      categoryCardMain.children[
        database.pushRandNumbersInThisArr[0]
      ].removeEventListener("click", isCorrect); // not clickable anymore
      categoryCardMain.children[
        database.pushRandNumbersInThisArr[0]
      ].disabled = true;
      categoryCardMain.children[
        database.pushRandNumbersInThisArr[0]
      ].classList.add("changeBGColor"); // bg becomes gray
      database.pushRandNumbersInThisArr.shift(); // remove one item from array
      correctVoice();
      setTimeout(() => {
        playAudio();
      }, 500); //play sound again
      if (database.pushRandNumbersInThisArr.length === 0) {
        if (database.mistakes > 0) {
          loseVoice();
          setTimeout(() => {
            alert(`there are ${database.mistakes} mistake(s) on your hand`);
          }, 1000);
          repeat.disabled=true
        } else {
          winVoice();
          setTimeout(() => {
            alert(`Yaaay, no mistakes <3`);
          }, 1000);
          repeat.disabled=true
        }
      }
    }
  }
}

// generate inner cards  when clicking main card/menu item
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    carditos[i].addEventListener("click", removehandler);
    menuItems[i].addEventListener("click", removehandler);
    carditos[i].addEventListener("click", generateInnerCards);
    menuItems[i].addEventListener("click", generateInnerCards);

    function generateInnerCards() {
      label.classList.remove("displayNone");
      const categoryCardDiv = createElement({
        tag: "div",
        classList: ["categoryCardDiv", "flexCenterColumn"],
        parent: categoryCardMain,
      });

      const categoryImage = createElement({
        tag: "img",
        classList: ["categoryCardImage"],
        src: cards[i][j].image,
        parent: categoryCardDiv,
      });
      const categoryText = createElement({
        tag: "p",
        classList: ["categoryCardText"],
        text: cards[i][j].word,
        parent: categoryCardDiv,
      });
      const playBtn = createElement({
        tag: "div",
        classList: ["playBtn", "flexCenter"],
        parent: categoryCardDiv,
      });
      const audio = createElement({
        tag: "audio",
        classList: ["audio"],
        src: cards[i][j].audioSrc,
      });
      playBtn.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          audio.play();
        },
        false
      );
      const rotateBtn = createElement({
        tag: "div",
        classList: ["rotateBtn"],
        text: "↻",
        parent: categoryCardDiv,
      });
      rotateBtn.addEventListener("click", rotateDiv, false);
      function rotateDiv(e) {
        e.stopPropagation();
        if (
          (categoryCardDiv.children[1].textContent =
            categoryCardDiv.children[1].textContent === cards[i][j].word)
        ) {
          categoryCardDiv.children[1].textContent =
            categoryCardDiv.children[1].textContent = cards[i][j].translation;
          categoryCardDiv.classList.add("rotateDiv360");
          categoryCardDiv.classList.remove("rotateDiv0");
        } else {
          categoryCardDiv.children[1].textContent =
            categoryCardDiv.children[1].textContent = cards[i][j].word;
          categoryCardDiv.classList.add("rotateDiv0");
          categoryCardDiv.classList.remove("rotateDiv360");
        }
      }
    }
  }
}

function onStartBtn(display) {
  for (let i = 0; i < 8; i++) {
    startBtn.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.children[2].children[
        i
      ].children[1].style.display = display;
      e.target.parentElement.parentElement.children[2].children[
        i
      ].children[2].style.display = display;
      e.target.parentElement.parentElement.children[2].children[
        i
      ].children[3].style.display = display;
      startBtn.disabled = true;
    });
  }
}

onStartBtn("none");

function correctVoice() {
  const correct = createElement({
    tag: "audio",
    classList: ["audio"],
    src: "./media/correct.mp3",
  });
  correct.play();
}
function winVoice() {
  const win = createElement({
    tag: "audio",
    classList: ["audio"],
    src: "./media/win.mp3",
  });
  win.play();
}

function wrongVoice() {
  const wrong = createElement({
    tag: "audio",
    classList: ["audio"],
    src: "./media/wrong.mp3",
  });
  wrong.play();
}
function loseVoice() {
  const lose = createElement({
    tag: "audio",
    classList: ["audio"],
    src: "./media/lose.mp3",
  });
  lose.play();
}

document.addEventListener("DOMContentLoaded", function () {
  let checkbox = document.querySelectorAll('input[type="checkbox"]');
  checkbox[1].addEventListener("click", function (e) {
    if (checkbox[1].checked) {
      startBtn.disabled = false;
    } else {
      console.log("unchecked");
      for (let i = 0; i < 8; i++) {
        e.target.parentElement.parentElement.children[2].children[
          i
        ].children[1].style.display = "block";
        e.target.parentElement.parentElement.children[2].children[
          i
        ].children[2].style.display = "block";
        e.target.parentElement.parentElement.children[2].children[
          i
        ].children[3].style.display = "block";
        e.target.parentElement.parentElement.children[2].children[
          i
        ].classList.remove("changeBGColor");
        generateRandCards();
      }
    }
  });
});
