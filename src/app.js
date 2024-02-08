const cursor = document.querySelector('.cursor');
const hit = document.querySelector('.hit');
const miss = document.querySelector('.miss');
const timeValue = document.querySelector('.time');
const field = document.querySelector('.field');
const gameOverPopup = document.querySelector('.game-over-popup');
const winPopup = document.querySelector('.win-popup');
const startContainer = document.querySelector('.start-container');
const startAgainBtn = document.querySelector('.start-again');
const startBtn = document.querySelector('.start-game');
let hitScore = 0;
let missScore = 0;
let currentHit = false;

// Timer
let intervalId;
const timeGenerator = () => {
  const time = {
    seconds: 0,
    minutes: 0,
  };
  const updateTime = () => {
    time.seconds += 1;
    if (time.seconds >= 60) {
      time.minutes += 1;
      time.seconds = 0;
    }
    const secondsValue = time.seconds < 10 ? `0${time.seconds}` : time.seconds;
    const minutesValue = time.minutes < 10 ? `0${time.minutes}` : time.minutes;
    timeValue.textContent = `${minutesValue}:${secondsValue}`;
  };
  updateTime();
  intervalId = setInterval(updateTime, 1000);
};

const stopTimer = () => {
  clearInterval(intervalId);
};

// Generate holes
function generateHoles() {
  let holes = [];
  for (let i = 0; i < 16; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    holes.push(hole);
    field.appendChild(hole);
  }
  return holes;
}
const holes = generateHoles();

field.addEventListener('click', (e) => {
  const classes = Array.from(e.target.classList);
  if (missScore === 5) {
    return;
  }
  if (classes.includes('goblin') && !currentHit) {
    hitScore++;
    hit.textContent = hitScore;
    currentHit = true;
    e.target.classList.add('goblin-hit');
  } else if (classes.includes('hole')) {
    missScore++;
    miss.textContent = missScore;
  }
});

// start button
startAgainBtn.addEventListener('click', (e) => {
  e.preventDefault();
  gameOverPopup.classList.remove('active');
  missScore = 0;
  miss.textContent = missScore;
  hitScore = 0;
  hit.textContent = hitScore;
  stopTimer();
  timeGenerator();
  run();
});

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  startContainer.style.display = 'none';
  timeGenerator();
});

//Holes
function getNextHole() {
  let current;
  return function getHole() {
    const i = Math.floor(Math.random() * holes.length);
    if (i !== current) {
      current = i;
      return holes[i];
    } else {
      return getHole();
    }
  };
}
const nextHole = getNextHole();

function run() {
  const hole = nextHole();
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
      gameOverPopup.classList.add('active');
    }
    if (hitScore === 5) {
      winPopup.classList.add('active');
      stopTimer();
    }
  }, 1250);
}
run();

//cursor
window.addEventListener('mousemove', (e) => {
  cursor.style.top = e.pageY + 'px';
  cursor.style.left = e.pageX + 'px';
});

window.addEventListener('mousedown', () => {
  cursor.classList.add('active');
});

window.addEventListener('mouseup', () => {
  cursor.classList.remove('active');
});
