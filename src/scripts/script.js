
var images =[];
var randomNumbers = [];
var score = 0;
var totalScore = 0;
var i;
var j;
var ready;
var deletedCard;


function interval () {
	for ( i = 1; i <= 18; i++)
	document.getElementById('card-' + i).classList.add('hidden');
	ready = true;
}


function startGame() {
	document.getElementsByClassName('start-page').item(0).classList.add('no-active');
	document.getElementsByClassName('game-page').item(0).classList.add('active');
	setTimeout(interval, 5000);
} 


for ( i = 0; i < 9; i++) {
	var random = Math.floor(Math.random() * 52 + 1);
	var img = 'assets/images/Cards/' + random + '.png';

	for ( j = 0; j < images.length; j++ ) {
		if (img === images[j]) {
			i = i - 1;
			img = false;
			break
		}
	}
	if (img === false) {
		continue
	}

	images.push(img);
	images.push(img);
	console.log(images);
}

for (var a = images.length - 1; a >= 0; a-- ) {
	var b = Math.floor(Math.random() * (images.length - 1));
	var temp = images[a];
	images[a] = images[b];
	images[b] = temp;
}

for ( j = 1; j <= 18; j++) {
	var card = document.getElementById('card-' + j);
	card.setAttribute('src', images[j - 1]); 
}

var count = 0;
var card1 = '';
var card2 = '';
var match;


function clickCard (number) {

	sound();

	var faceUp = document.getElementById('card-' + number );
	var waitedCards = document.getElementsByClassName('card-' + number);
	if ( count < 2 && (faceUp.classList.contains('visible') === false) && ready) {

		count++
		faceUp.classList.add('visible');
		waitedCards.item(0).classList.add('waited');

		if (count === 1) {
			card1 = faceUp.getAttribute('src');
		}

		else {
			card2 = faceUp.getAttribute('src');
			var doubleCard = document.getElementsByClassName('visible');

			if (card1 === card2) {

				soundWin();

				document.getElementsByClassName('waited').item(0).classList.add('hidden');
				document.getElementsByClassName('waited').item(1).classList.add('hidden');
				
				doubleCard.item(0).classList.add('faceUp');
				doubleCard.item(0).classList.add('match');
				doubleCard.item(0).classList.add('hidden');
				doubleCard.item(doubleCard.length - 1).classList.add('faceUp');
				doubleCard.item(doubleCard.length - 1).classList.add('match');
				doubleCard.item(doubleCard.length - 1).classList.remove('visible');
				doubleCard.item(0).classList.remove('visible');
				match = document.getElementsByClassName('match');
				score = ((18 - match.length) / 2) * 42;
				totalScore += score;
						
			} else {

				soundMiss();

				match = document.getElementsByClassName('match');
				score = match.length * 42;
				totalScore -= score;

				if (totalScore <= 0) {

					totalScore = 0;
				}

				function miss () {
					doubleCard.item(doubleCard.length - 1).classList.remove('visible');

					if (doubleCard.length != 0) {
						doubleCard.item(0).classList.remove('visible');
						};
					}

				setTimeout(miss, 500);
				
				card1 = '';
				card2 = '';
			}

			count = 0;
			document.getElementsByClassName('score-table').item(0).innerHTML = ('Очки: ' + totalScore);
			document.getElementsByClassName('waited').item(0).classList.remove('waited');
			document.getElementsByClassName('waited').item(0).classList.remove('waited');
			
			if 	(match.length === 18) {
				setTimeout (timeOut, 500);

				function timeOut () {
					var endGame = document.getElementsByClassName('game-page');
					endGame.item(0).classList.add('no-active');
					document.getElementsByClassName('score').item(0).innerHTML = 
					('Поздравляем!' + '<br>' + 'Ваш итоговый счёт: ' + totalScore);
					document.getElementsByClassName('end-page').item(0).classList.add('active');
				}
			}
		}
	}
}

function reload() {
    location.reload();
}



function sound() {
	if (ready) {
		 var audio = new Audio(); 
		 audio.src = 'assets/sound/start-game.mp3'; 
		 audio.autoplay = true; 
	};
}

function soundMiss() {
	if (ready) {
		 var audio = new Audio(); 
		 audio.src = 'assets/sound/miss.mp3'; 
		 audio.autoplay = true; 
	};
}


function soundWin() {
	if (ready) {
		 var audio = new Audio(); 
		 audio.src = 'assets/sound/win.mp3'; 
		 audio.autoplay = true; 
	};
}



