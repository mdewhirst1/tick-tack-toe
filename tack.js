window.onload = function(){
	var buttons = Array.from(document.getElementsByTagName("td"));
	var reset = document.getElementById("reset");
	var turnCounter = 1;
	var board = [["e", "e", "e"], ["e", "e", "e"], ["e", "e", "e"]];
	var inPlay = true;
	var player1 = "X";
	var player2 = "O";
	var curPlayer = player1;
	var setPlay1Button = document.getElementById("setPlayer1");
	var setPlay2Button = document.getElementById("setPlayer2");


	reset.addEventListener("click", function(event) {
		turnCounter = 1;
		board = [["e", "e", "e"], ["e", "e", "e"], ["e", "e", "e"]];
		inPlay = true;
		displayWinner("");
		buttons.forEach(function(button){
			button.innerText = "";
		})
		curPlayer = player1;
	});


	setPlay1Button.addEventListener("click", function(event) {
		player1 = document.getElementById("player1").value;
		console.log(player1);
	})

	setPlay2Button.addEventListener("click", function(event) {
		player2 = document.getElementById("player2").value;
		console.log(player2);
	})

	buttons.forEach(function(button) {
		button.addEventListener("click", function(event) {
			
			if (inPlay) {
				updateBoard(getRow(this.id), getColumn(this.id));
				if (checkWin(this.id)) {
					inPlay = false;
					displayWinner("CONGRATZ PLAYER " + curPlayer);
					console.log(curPlayer);
				}
				else{
					changePlayer();
					console.log(curPlayer);
					
				}
			}
		});
	});


	function updateBoard(row, column) {
		if ((board[row][column])==="e") {
			if ((turnCounter % 2) > 0) {
				event.target.innerText = "X";
				board[row][column] = "X";
			}
			else {
				event.target.innerText = "O";
				board[row][column] = "O";
			}
			turnCounter++;
		}
		console.log("Row = " + row + " Column = " + column);

	};

	function getRow(position) {
		var row = position.split(".")[0];
		return row;
	};

	function getColumn(position) {
		var column = position.split(".")[1];
		return column;
	};

	function checkWin(position) {
		if (checkRow(getRow(position))) {
			return true;
		}
		else if (checkColumn(getColumn(position))) {
			return true;
		}
		else if (checkDiagonal()) {
			return true;
		}
		else {
			return false;
		}


	}

	function checkRow(row) {
		if ((board[row][0] === board[row][1]) && (board[row][0] ===board[row][2])) {
			return true;
		}
		else { 
			return false;
		}
	};

	function checkColumn(column) {
		if ((board[0][column] === board[1][column]) && (board[0][column] === board[2][column])) {
			return true;
		}
		else {
			return false;
		}
	};

	function checkDiagonal() {
		if (board[1][1] !== "e") {
			if (((board[0][0] === board[1][1]) && (board[0][0] === board[2][2])) || ((board[2][0] === board[1][1]) && (board[2][0] === board[0][2]))) {
				return true;
			}	
		}
		else { 
				return false;
		}
	}

	function displayWinner(message) {
		document.getElementById("winner").innerText = message;
	}

	function changePlayer() {
		// use ternary
		if (curPlayer == player1) {
			curPlayer = player2;
		} 
		else {
			if (curPlayer == player2) {
				curPlayer = player1;
			}
		}
	}

};

