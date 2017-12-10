// VARIABLES

let qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
var startPage = document.getElementById('overlay');
var list = document.querySelector('#phrase ul');
var buttonLetter = qwerty.querySelectorAll('button');
var tries = document.querySelectorAll('.tries img');
var missed = 0;

let startGame = document.querySelector('.btn__reset');

// PHRASE ARRAY

let phrases = [
  'mad as a hatter',
  'eat drink and be merry',
  'be the nerd',
  'back to basics',
  'over the moon'
];

// FUNCTIONS

 function getRandomPhraseAsArray(arr) {
  var phrase = arr[Math.floor(Math.random() * 5)];
  var letters = phrase.split("");
  return letters;
}

function addPhraseToDisplay(arr) {
  for (var i = 0; i < arr.length; i++ ) {
      var listItem = document.createElement('li');
      listItem.textContent = arr[i];
      if (listItem.innerText == ' ') {
        listItem.classList.add('space');
      } else {
        listItem.classList.add('letter');
      }
      list.append(listItem);
    }
  }

  function checkLetter(buttonClicked) {
    var letter = document.getElementsByClassName('letter');
    for (var i = 0; i < letter.length; i++ ) {
      var character = letter[i];
      if (character.innerText == buttonClicked.innerText) {
        character.classList.add('show');
        var found = character;
      }
    }
    if (found) {
      return found;
    } else {
      return null;
    }
  }

  function checkWin() {
    let checkShow = document.querySelectorAll('.show');
    let checkLetter = document.querySelectorAll('.letter');
    if (checkShow.length === checkLetter.length) {
      startPage.classList.add('win');
      startPage.style.display = 'flex';
      startPage.querySelector('.title').innerHTML = 'You Won!';
      startGame.innerHTML = 'Restart Game';
    } else if (missed >= 5) {
      startPage.classList.add('lose');
      startPage.style.display = 'flex';
      startPage.querySelector('.title').innerHTML = 'You Lost!';
      startGame.innerHTML = 'Restart Game';
    }
  }

var phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// EVENT LISTENERS

startGame.addEventListener('click', () => {
  // START
  startPage.style.display = 'none';

  // RESTART
  if (startGame.textContent == 'Restart Game') {

    // RESTART SCORE
    missed = 0;
    for (var i = 0; i < tries.length; i++){
      tries[i].src = 'images/liveHeart.png';
    }

    for (var i = 0; i < buttonLetter.length; i++){
      buttonLetter[i].removeAttribute('disabled');
      buttonLetter[i].classList.remove('chosen');
    }

    startPage.classList.remove('win');
    startPage.classList.remove('lose');

    list.innerHTML = ' ';
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));


  }
});

qwerty.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON') {
    var button = e.target;
    button.classList.add('chosen');
    button.setAttribute('disabled', 'true');
    var letterFound = checkLetter(button);
    if (letterFound === null || undefined) {
      tries[missed].src = 'images/lostHeart.png';
      missed += 1;
    }
    checkWin();
  }
});
