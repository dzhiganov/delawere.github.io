'use strict';

var START_PAGE = document.querySelector('.start-page');
var START_GAME_BTN = document.querySelector('.btn_start-game');
var GAME_PAGE = document.querySelector('.game-page');
var END_PAGE = document.querySelector('.end-page');
var PLAY_BOARD = document.querySelector('.play-board');
var TEMPLATE = document.querySelector('#card-template').content.querySelector('.card');
var SCORE_TABLE = document.querySelector('.score-table');
var NUMBER_SCORE = document.querySelector('.score');
var REPEAT_GAME_BTN = document.querySelector('.btn_repeat-game');
var MAX_CARDS_ON_BOARD = 18;
var MAX_CARDS = 52;
var SHOW_CARDS_TIME = 5000;
var SHOW_CARDS_AFTER_MISS = 500;
var LAG_BEFORE_ENG_PAGE = 500;
var INDEX_SCORE = 42;
var ready;
var score;
var card1;
var card2;
var count = 0;
var match;
var totalScore = 0;

var shuffleArray = function () {
  return Math.random() - 0.5;
};

var getAllCards = function (number) {
  var newArr = [];
  for (var i = 1; i <= number; i++) {
    newArr.push('src/img/Cards/' + i + '.png');
  }
  newArr.sort(shuffleArray);
  return newArr;
};

var allCards = getAllCards(MAX_CARDS);

var getCardsForGame = function (number) {
  var newArr = allCards.slice(0, number);
  return (newArr.concat(newArr)).sort(shuffleArray);
};

var cards = getCardsForGame(MAX_CARDS_ON_BOARD / 2);

var createCard = function (arrItem, arrItemIndex) {
  var cardElement = TEMPLATE.cloneNode(true);
  cardElement.classList.add('card-' + arrItemIndex);

  //  Событие: выбор карты

  cardElement.addEventListener('click', function () {
    var cardUp = document.querySelector('.' + this.classList[1] + ' > .card_up');
    var cardDown = document.querySelector('.' + this.classList[1] + ' > .card_down');

    // Перевернуть карту по клику

    if (count < 2 && cardUp.classList.contains('card_up_transform') && ready) {
      count++;
      cardUp.classList.remove('card_up_transform');
      cardDown.classList.remove('card_down_transform');
      cardUp.classList.add('waited');

      if (count === 1) {
        card1 = cardUp.src;
      } else {
        card2 = cardUp.src;
        var twoCard = document.querySelectorAll('.waited');

        // Проверка карт на идентичность

        if (card1 === card2) {
          soundRightClick();
          twoCard[0].parentNode.classList.add('unvisible');
          twoCard[1].parentNode.classList.add('unvisible');
          twoCard[0].classList.add('match');
          twoCard[1].classList.add('match');
          match = document.querySelectorAll('.match');
          score = ((MAX_CARDS_ON_BOARD - match.length) / 2) * INDEX_SCORE;
          totalScore += score;
        } else {
          match = document.querySelectorAll('.match');
          score = match.length * INDEX_SCORE;
          totalScore -= score;

          if (totalScore <= 0) {
            totalScore = 0;
          }

          //  В случае ошибки, перевернуть карты обратно через SHOW_CARDS_AFTER_MISS мсек

          setTimeout(function () {
            twoCard[0].classList.add('card_up_transform');
            twoCard[0].nextElementSibling.classList.add('card_down_transform');

            if (twoCard.length > 1) {
              twoCard[1].classList.add('card_up_transform');
              twoCard[1].nextElementSibling.classList.add('card_down_transform');
            }
          }, SHOW_CARDS_AFTER_MISS);

          card1 = '';
          card2 = '';
        }

        count = 0;
        twoCard[0].classList.remove('waited');
        twoCard[1].classList.remove('waited');
        SCORE_TABLE.textContent = 'Очки: ' + totalScore;

        if (match.length === MAX_CARDS_ON_BOARD) {

        //  Показать экран итоговой статистики через LAG_BEFORE_ENG_PAGE мсек

          setTimeout(function () {
            GAME_PAGE.classList.add('no-active');
            NUMBER_SCORE.innerHTML = ('Поздравляем!' + '<br>' +
              'Ваш итоговый счёт: ' + totalScore);
            END_PAGE.classList.add('active');
          }, LAG_BEFORE_ENG_PAGE);
        }
      }
    }
  });
  cardElement.querySelector('.card_up').src = arrItem;
  return cardElement;
};

var documentFragment = document.createDocumentFragment();
cards.forEach(function (currentItem, index) {
  documentFragment.appendChild(createCard(currentItem, index));
});

PLAY_BOARD.appendChild(documentFragment);

//  Событие: начало игры

START_GAME_BTN.addEventListener('click', function () {
  START_PAGE.classList.add('no-active');
  GAME_PAGE.classList.add('active');

  //  Перевернуть карты через SHOW_CARDS_TIME мсек

  setTimeout(function () {
    var allCardsUp = document.querySelectorAll('.card_up');
    var allCardsDown = document.querySelectorAll('.card_down');
    for (var i = 0; i < MAX_CARDS_ON_BOARD; i++) {
      allCardsUp[i].classList.add('card_up_transform');
      allCardsDown[i].classList.add('card_down_transform');
    }
    soundStartGame();
    ready = true;
  }, SHOW_CARDS_TIME);
});

//  Событие: повтор игры

REPEAT_GAME_BTN.addEventListener('click', function () {
  location.reload();
});

var soundStartGame = function () {
  if (ready) {
    var audio = new Audio();
    audio.src = 'src/sound/start-game.mp3';
    audio.autoplay = true;
  }
};

var soundRightClick = function () {
  if (ready) {
    var audio = new Audio();
    audio.src = 'src/sound/win.mp3';
    audio.autoplay = true;
  }
};
