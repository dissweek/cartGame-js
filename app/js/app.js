const CARD_MAIN_CNT = document.querySelector(".game__card");
const BTN_START = document.querySelector(".game__start");
const GAME_FINISH = document.querySelector(".game__finish");
let [elem1, elem2] = ["", ""];
let counter, checkSrc, counterCard, ms, s, m, h, interval;
let timerDOM = document.querySelector(".game__timer");
let timerDOMRes = document.querySelector(".game__timer-res");

BTN_START.addEventListener("click", startGame);

///////////////////////////////////////////////// Создание карточки /////////////////////////////////////////////////

function createCard() {
  for (let i = 0; i < 9; i++) {
    let newSrcCount =
      "https://i.pinimg.com/" +
      SRC_PHOTO[getRndlength(0, SRC_PHOTO.length - 1)] +
      ".jpg";
    if (!checkSrc.includes(newSrcCount)) {
      checkSrc.push(newSrcCount);
      for (let j = 0; j < 2; j++) {
        let newCard = document.createElement("div");
        newCard.classList = `game__card-cnt ${counterCard}`;
        newCard.innerHTML =
          '<img  class="game__img back active-front" src="./img/back1.jpg" alt=""> <img class="game__img front none " src="" alt="">';
        newCard.lastChild.src = newSrcCount;
        CARD_MAIN_CNT.append(newCard);
        counterCard++;
      }
      counterCard += 3;
    } else i--;
  }
}
///////////////////////////////////////////////// Действие кнопки старта /////////////////////////////////////////////////

function startGame() {
  [ms, s, m, h, counter, counterCard] = [0, 0, 0, 0, 0, 0];
  clearInterval(interval);
  timerDOM.innerHTML = "0:0:0:00";
  GAME_FINISH.classList.remove("game__finish-active");
  CARD_MAIN_CNT.removeEventListener("click", rotateCard);
  CARD_MAIN_CNT.innerHTML = "";
  checkSrc = [];
  createCard();
  const CARD_COLLECTION = document.querySelectorAll(".game__card-cnt");
  for (let i = 0; i < 45; i++) {
    let randomPos = CARD_COLLECTION[getRndlength(0, 18)];
    CARD_MAIN_CNT.append(randomPos);
  }
  setTimeout(() => {
    CARD_COLLECTION.forEach((child) => {
      for (let children of child.children) {
        children.classList.toggle("none");
        children.classList.toggle("active-front");
      }
    });
  }, 3000);
  setTimeout(() => {
    interval = setInterval(getTimer, 10);
    CARD_MAIN_CNT.addEventListener("click", rotateCard);
  }, 3500);
}

///////////////////////////////////////////////// Случайный Src & pos /////////////////////////////////////////////////

function getRndlength(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

///////////////////////////////////////////////// Определение карточки /////////////////////////////////////////////////

function rotateCard(event) {
  if (event.target.tagName == "IMG") {
    for (let children of event.target.closest("div").children) {
      children.classList.toggle("none");
      children.classList.toggle("active-front");
    }
    if (elem1 == "") {
      elem1 = event.target.closest("div");
    } else {
      elem2 = event.target.closest("div");
      if (
        +elem1.classList[1] + 1 === +elem2.classList[1] ||
        +elem1.classList[1] - 1 === +elem2.classList[1]
      ) {
        CARD_MAIN_CNT.removeEventListener("click", rotateCard);
        counter++;
        elem1.style.animation = "opacity 0.7s forwards 0.7s";
        elem2.style.animation = "opacity 0.7s forwards 0.7s";
        // setTimeout(() => {
        [elem1, elem2] = ["", ""];
        CARD_MAIN_CNT.addEventListener("click", rotateCard);
        // }, 200);
      } else {
        CARD_MAIN_CNT.removeEventListener("click", rotateCard);
        setTimeout(() => {
          for (let children of elem1.children) {
            children.classList.toggle("none");
            children.classList.toggle("active-front");
          }
          for (let children of elem2.children) {
            children.classList.toggle("none");
            children.classList.toggle("active-front");
          }
          [elem1, elem2] = ["", ""];
          CARD_MAIN_CNT.addEventListener("click", rotateCard);
        }, 1000);
      }
    }
  }
  if (counter == 9) {
    clearInterval(interval);
    timerDOMRes.innerHTML = `Your Time: ${timerDOM.innerHTML}`;
    setTimeout(() => {
      CARD_MAIN_CNT.innerHTML = "";
      GAME_FINISH.classList.add("game__finish-active");
    }, 1000);
  }
}

/////////////////////////////////////////// timer //////////////////////////////////////

function getTimer() {
  ms += 1;
  if (ms == 100) {
    s += 1;
    ms = 0;
  }
  if (s == 60) {
    m += 1;
    s = 0;
  }
  if (m == 60) {
    h += 1;
    m = 0;
  }
  timerDOM.innerHTML = `${h}:${m}:${s}:${ms}`;
}
