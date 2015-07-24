/*
This is a game of tic-tac-toe, created to demonstrate knowledge of jQuery
*/

// Empty array which represents the tic-tac-toe board

var arr = [[0,0,0],[0,0,0],[0,0,0]];
var winningRow = -1;
var winningCol = -1;

/* When a player wins, an alert is displayed, the background color changes, 
and a 'play again' button is displayed */

function redWins() {
	$('body').css('background', 'blue');
	if (winningRow !== -1) {
		$('tr').not('tr:nth-child('+winningRow+')').find('td').css('background','blue');
	} else if (winningCol !== -1) {
		$('td').not('td:nth-child('+winningCol+')').css('background', 'blue');
	} else if ($('table').hasClass('redDiagonal1')) {
		$('td').not('#tl').not('#br').not('#m').css('background','blue');
	} else if ($('table').hasClass('redDiagonal2')) {
		$('td').not('#bl').not('#tr').not('#m').css('background','blue');
	}
	alert('Red wins!!!');
	$('button').css('display','inline');
	$('table').addClass('win');
}

function blueWins() {
	$('body').css('background', 'red');
	if (winningRow !== -1) {
		$('tr').not('tr:nth-child('+winningRow+')').find('td').css('background','red');
	} else if (winningCol !== -1) {
		$('td').not('td:nth-child('+winningCol+')').css('background', 'red');
	} else if ($('table').hasClass('blueDiagonal1')) {
		$('td').not('#tl').not('#br').not('#m').css('background','red');
	} else if ($('table').hasClass('blueDiagonal2')) {
		$('td').not('#bl').not('#tr').not('#m').css('background','red');
	}
	alert('Blue wins!!!');
	$('button').css('display','inline');
	$('table').addClass('win');
}

/* This function is called after every turn to see if there is a winner. 
It begins by assigning the point values from the HTML element to the array  */

function check() {
	$('tr').each(function(i) {
		$(this).find('td').each(function(j) {
			arr[i][j] = parseInt($(this).attr('points'));
		})
	})

	/* This loop cycles through each of the rows and checks to see if any row has a sum 
	of 3 or -3, which indicates a win*/

	for (var i=0; i<3; i++) {
		var rowSum = 0;
		for (var j=0; j<3; j++) {
			rowSum += arr[i][j];
		}
		if (rowSum === 3) {
			winningRow = i+1;
			redWins();
		} else if (rowSum === -3) {
			winningRow = i+1;
			blueWins();
		}
	}

	/* This loop cycles through each of the columns and checks to see if any column has a sum 
	of 3 or -3, which indicates a win*/

	for (var i=0; i<3; i++) {
		var colSum = 0;
		for (var j=0; j<3; j++) {
			colSum += arr[j][i];
		}
		if (colSum === 3) {
			winningCol = i+1;
			redWins();
		} else if (colSum === -3) {
			winningCol = i+1;
			blueWins();
		}
	}

	/* The next set of 4 if statements checks the diagonals to see if 
	either has a sum of 3 or -3*/

	if (arr[0][0] + arr[1][1] + arr[2][2] === 3) {
		$('table').addClass('redDiagonal1');
		redWins();
	} else if (arr[0][0] + arr[1][1] + arr[2][2] === -3) {
		$('table').addClass('blueDiagonal1');
		blueWins();
	}

	if (arr[2][0] + arr[1][1] + arr[0][2] === 3) {
		$('table').addClass('redDiagonal2');
		redWins();
	} else if (arr[2][0] + arr[1][1] + arr[0][2] === -3) {
		$('table').addClass('blueDiagonal2');
		blueWins();
	}

	/* This if statement first checks to see if anyone has won, then checks to see if
	all the spaces have been filled. If no one has won and all spaces are filled, the
	game is a tie */

	if (!$('table').hasClass('win') && $('td.taken').length === $('td').length) {
		alert("Everybody wins!!!");
		$('button').css('display','inline');

	}

}

// The turn counter is initialized to 0

var turn = 0;

/* When a player clicks a space, it checks to see if the space has already
been filled. If not, the space is filled with a color and it receives a point
value */

$('td').click( function() {
	if($(this).hasClass('taken')) {
		alert("That space is already taken!");
	} else {

		/* The turn counter toggles between 0 and 1 after each turn. The first
		player (0) is red and has positive point values. The second player (1) is blue and 
		has negative point values */

		if (turn === 0) {
			$(this).addClass('red taken').attr('points',1);
			turn = 1;
		} else {
			$(this).addClass('blue taken').attr('points',-1);
			turn = 0;
		}
	}
	check(); //check to see if there is a winner
});

//This is the play again button. It reloads the page and starts a new game.

$('button').click(function(){
	location.reload();
});
