const rock = document.querySelector(".rock");
const scissor = document.querySelector(".scissor");
const paper = document.querySelector(".paper");
const contentWrap = document.querySelectorAll(".article > div");

const btnWrap = document.querySelectorAll(".buttonWrap > button");
const modal = document.querySelector("#modal");
const modalResult = document.querySelector(".modal_result");
const cancel = document.querySelector(".cancel");
const modalResultContext = document.querySelector(".modal_result_context");

let contArray = [];
let arrayLength = contentWrap.length;
let count = 0;
setInterval(mount(), 500);

function mount() {
  count = (count + 1) % arrayLength;
  content(count);
}

function content(count) {
  contentWrap.forEach((element, index) => {
    if (count === index) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

// 범위 지정 난수 생성 (최댓값 포함)
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function compare(btnCont) {
  const randomCont = rand(1, 3);
  console.log("클릭한 버튼", btnCont);
  console.log("비교할 난수", randomCont);
  if (btnCont === randomCont) {
    console.log("비겼습니다.");
    return ["비겼습니다.", randomCont];
  } else if (
    (btnCont === 2 && randomCont === 3) ||
    (btnCont === 3 && randomCont === 1) ||
    (btnCont === 1 && randomCont === 2)
  ) {
    console.log("이겼습니다.");
    return ["이겼습니다.", randomCont];
  } else if (
    (btnCont === 1 && randomCont === 3) ||
    (btnCont === 2 && randomCont === 1) ||
    (btnCont === 3 && randomCont === 2)
  ) {
    console.log("졌습니다.");
    return ["졌습니다.", randomCont];
  }
}

function btnClick() {
  btnWrap.forEach((e) => {
    e.addEventListener("click", (btnClick) => {
      const btnCont = btnClick.target.value;
      const result = compare(parseInt(btnCont));
      console.log("결과값", result);
      modal.classList.add("open");
      showResult(result[1]);
      toggleModal(true);
      modalResultContext.innerHTML = result[0];
      clearInterval();
    });
  });
}

function showResult(result) {
  if (result === 1) {
    modalResult.innerHTML = "✊";
  } else if (result === 2) {
    modalResult.innerHTML = "✌️";
  } else if (result === 3) {
    modalResult.innerHTML = "✋";
  }
}

function toggleModal(isOpen) {
  if (isOpen) {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
}

modal.addEventListener("click", (e) => {
  const evTarget = e.target;
  console.log("evTarget", evTarget.classList.contains("modal_overlay"));
  if (evTarget.classList.contains("modal_overlay")) {
    toggleModal(false);
  }
});

cancel.addEventListener("click", () => {
  modal.classList.remove("open");
  toggleModal(false);
});

btnClick();
