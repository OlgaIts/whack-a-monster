const cursor = document.querySelector(".cursor");
const holes = Array.from(document.querySelectorAll(".hole"));
const hit = document.querySelector(".hit");
const miss = document.querySelector(".miss");
const field = document.querySelector(".field");
const popup = document.querySelector(".popup");
const startBtn = document.querySelector(".start");
let hitScore = 0;
let missScore = 0;
let currentHit = false;

field.addEventListener("click", (e) => {
  const classes = Array.from(e.target.classList);
  if (missScore === 5) {
    return;
  }
  if (classes.includes("goblin") && !currentHit) {
    hitScore++;
    hit.textContent = hitScore;
    console.log(e.target.classList.add('goblin-hit'));
    currentHit = true;
  } else if (classes.includes("hole")) {
    missScore++;
    miss.textContent = missScore;
  }
});

//holes
function run() {
  const i = Math.floor(Math.random() * holes.length);
  const hole = holes[i];
  let timer = null;
  hole.innerHTML = `<div class='goblin show'></div>`;

  timer = setInterval(() => {
    hole.innerHTML = ``;
    clearInterval(timer);
    currentHit = false;
    if (missScore < 5) {
      run();
    }
    if (missScore === 5) {
      popup.classList.add("active");
    }
  }, 1250);
}
run();

// start button
startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.remove("active");
  missScore = 0;
  miss.textContent = missScore;
  hitScore = 0;
  hit.textContent = hitScore;
  run();
});

//cursor
window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

window.addEventListener("mousedown", () => {
  cursor.classList.add("active");
});

window.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
});

// class App {
//   static init() {
//     this.field = new Field(document.querySelector(".field"));
//   }
// }
