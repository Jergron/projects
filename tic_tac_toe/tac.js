/*
This is a game of Tic-Tac-Toe
Created by using jQuery

1. a player clicks on a square using a mouse.
2. a square filled with a color cannot be clicked on again.
3. the sum of three exact colors in a row wins the game. 
*/

// empty array represents the board

var arr = [[0,0,0],[0,0,0],[0,0,0]];

/* when a player wins an alert declares the winner 
and washes out the board with the opponant's color. 
*/

function redWins() {
	$("body").css("background", "blue");
	alert("Red, wins!!!");
	$("button").css("display","inline");
// added to prevent two dialog boxes from opening up. (See line 89)
	$("table").addClass("win");
}

function blueWins() {
  $("body").css("background", "red");
  alert("Blue, wins!!!");
  $("button").css("display","inline");
  $("table").addClass("win");
}

// This checks each square of the board, adding the value 0.
function check() {
  $("tr").each(function(i) {
    $(this).find("td").each(function (j) {
    	arr[i][j] = parseInt($(this).attr("points"));
    })
  })

/* 
Each row is equal to the sum of 0.
 If the row equals to 3 red wins, if -3 blue wins.
*/
	for (i = 0; i < 3; i++) {
		var rowSum = 0;
		for(j = 0; j < 3; j++) {
			rowSum += arr[i][j]
		}
		if (rowSum === 3) {
			redWins();
		}else if (rowSum === -3) {
			blueWins();
		}
	}

/* 
Each column is equal to the sum of 0.
 If the column equals to 3 red wins, if -3 blue wins.
*/

	for (i = 0; i < 3; i++) {
		var colSum = 0;
		for(j = 0; j < 3; j++) {
			colSum += arr[j][i]
		}
		if (colSum === 3) {
			redWins();
		}else if (colSum === -3) {
			blueWins();
		}
	}


// Conditional statements check the axis of the board diagonally.

	if(arr[0][0] + arr[1][1] + arr[2][2] === 3){
		redWins();
	}else if(arr[0][0] + arr[1][1] + arr[2][2] === -3){
		blueWins();
	}

	if(arr[2][0] + arr[1][1] + arr[0][2] === 3){
		redWins();
	}else if(arr[2][0] + arr[1][1] + arr[0][2] === -3){
		blueWins();
	}
// This statement prevents two dialog boxes from opening up. (See line 23)
	if( !$("table").hasClass("win") && $("td.taken").length === $("td").length) {
		alert("Everybody wins!!!")
// button is revealed after the game is over. 
		$("button").css("display","inline");
	}
}


// Created a variable equal to 0 to define the player by the click of the mouse. 
var turn = 0;

$("td").click(function () {
	if($(this).hasClass("taken")) {
		alert("That space is already taken!")
	}
	else {
		if(turn === 0) {
			$(this).addClass("taken red").attr("points", 1);
			turn = 1;
		} else {
			$(this).addClass("taken blue").attr("points", -1);
			turn = 0;
		}
	}
  check();
})

// button refreshes page. 
$("button").click(function() {
	location.reload();
});

