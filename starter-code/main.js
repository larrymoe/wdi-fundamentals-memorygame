console.log('JS file is connected to HTML! Woo!');

var board = document.getElementById('game-board');

//array with card types
var cards = ['queen', 'queen', 'king', 'king'];

//array of data-card attributes used for TwoCards function - check if 2 cards were selected
var cardsInPlay =[];

//array of cardElements, used for clearing out old HTML later
var cardElements = [];


var createCards = function() {

	for (var i = 0; i < cards.length; i++) {
		
		//used in function to create each individual card div
		var cardElement = document.createElement('div');
		
		//give the div a class
		cardElement.className = 'card';

		//add the div to the board (parent div)
		board.appendChild(cardElement);

		//give it an attribute / tag
		cardElement.setAttribute('data-card', cards[i]);

		//attach an event listener to check if its 1st or 2nd card clicked
		cardElement.addEventListener('click', isTwoCards);	

		//add it to our cardElements array of objects for editing/clearing  HTML
		cardElements.push(cardElement);
	}

}

var isTwoCards = function() {

	// add card to array of cards in play
	cardsInPlay.push(this.getAttribute('data-card'));

	if (this.getAttribute('data-card') === 'queen') {
		
		// I decided to use inline styling to flip the cards, because insering the image
		// messed up the inline-block layout of the cards. HTML method follows.
		// this.innerHTML = '<img src="queen1.png" alt="Queen of Spades" />';
		
		this.setAttribute('style', 'background-image: url("queen1.png")');

	} else {

		// Old HTML method.
		// this.innerHTML = '<img src="king1.png" alt="King of Spades" />';

		this.setAttribute('style', 'background-image: url("king1.png")');
	}
	
	// if you have two cards in play, check for a match
  	if (cardsInPlay.length === 2) {

	    // pass the cardsInPlay as an argument to the isMatch function
	    isMatch(cardsInPlay);

	    // clear cards in play array for your next try
	    cardsInPlay = [];
	}
}

var isMatch = function(cardsArray) {

	if (cardsArray[0] === cardsArray[1]) {

		// delaying the alert fixes the timing issues, else it seems like the
		// alert is being executed before the HTML edit to flip the final card

		setTimeout(announceWin, 100);
		
	} else {

		setTimeout(announceLoss, 100);
	}
}

var announceWin = function() {
	var reset = alert('WIN! You found a match. Play again?');
	if (reset === undefined) {
		resetBoard();
	}
}

var announceLoss = function() {
	var reset = alert('LOSS! No match. Play again?');
	if (reset === undefined) {
		resetBoard();
	}
}

var resetBoard = function() {
	for (i = 0; i < cardElements.length; i++) {
		cardElements[i].style = '';
	}
}

createCards();

