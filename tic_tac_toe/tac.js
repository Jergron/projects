var arr = [[0,0,0],[0,0,0],[0,0,0]];

function redWins() {
	$("body").css("background", "blue");
	alert("Red, wins!!!");
	$("button").css("display","inline")
}

function blueWins() {
  $("body").css("background", "red");
  alert("Blue, wins!!!");
  $("button").css("display","inline")
}

function check() {
  $("tr").each(function(i) {
    $(this).find("td").each(function (j) {
    	arr[i][j] = parseInt($(this).attr("points"));
    })
  })


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

	if($("td.taken").length === $("td").length) {
		alert("Everbody wins!!!")
		$("button").css("display","inline");
	}
}

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

$("button").click(function() {
	location.reload();
});

