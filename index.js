'use strict';

const checkBtn = document.querySelector('.check');
const resetBtn = document.querySelector('.reset');
const secretContainer = document.querySelector('.secretNumber');
let secretNumber = genRandNum();

let score = 20;
let highScore = 0;

function genRandNum() {
  return Math.round(Math.random() * 20) + 1;
}

function getInputValue() {
  return +document.querySelector('.number').value;
}
function resetInputValue() {
  document.querySelector('.number').value = '';
}

function changeMessage(message, color) {
  const messageElem = document.querySelector('.message');
  messageElem.textContent = message;
  messageElem.style.color = color;
}

function settingHighScore(scoreVal, highScoreVal) {
  if (scoreVal > highScoreVal && scoreVal > 1) {
    highScore = score;
  }
}

function setLoss() {
  score--;

  document.querySelector('.score').textContent = score;
}

function setWinStyles() {
  document.querySelector('body').style.backgroundColor = '#a8e038';
  document.querySelector('.highScore').textContent = highScore;

  secretContainer.style.padding = '40px 70px';
  secretContainer.textContent = secretNumber;
}
checkBtn.addEventListener('click', () => {
  if (!getInputValue()) {
    changeMessage('please enter number', '#a80010');
  } else if (getInputValue() === secretNumber) {
    settingHighScore(score, highScore);
    changeMessage('you won', '#ffa800');
    setWinStyles();
  } else if (getInputValue() !== secretNumber) {
    if (score > 1) {
      setLoss();
      changeMessage(
        getInputValue() > secretNumber ? 'too high' : 'too low',
        '#a80010'
      );
    } else {
      document.querySelector('.score').textContent = 0;
      changeMessage('You lose ☠️', '#a80010');
      checkBtn.disabled = true;
    }
  }
});

resetBtn.addEventListener('click', () => {
  document.querySelector('body').style.backgroundColor = '#481868';
  score = 20;
  document.querySelector('.score').textContent = score;
  secretContainer.style.padding = '40px 40px';
  secretContainer.textContent = '?';
  checkBtn.disabled = false;
  secretNumber = genRandNum();
  resetInputValue();
});
