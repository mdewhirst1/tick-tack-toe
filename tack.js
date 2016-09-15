window.onload = function(){
	var buttons = Array.from(document.getElementById("board").getElementsByTagName("td"));
	var reset = document.getElementById("resetBtn");
	var turnCounter = 1;
	var board = [["e", "e", "e"], ["e", "e", "e"], ["e", "e", "e"]];
	var inPlay = true;
	var player1 = "X";
	var player2 = "O";
	var player1Score = 0;
	var player2Score = 0;
	var curPlayer = player1;
	var setPlay1Button = document.getElementById("setPlayer1");
	var setPlay2Button = document.getElementById("setPlayer2");


	reset.addEventListener("click", function(event) {
		//reset values to default
		turnCounter = 1;
		board = [["e", "e", "e"], ["e", "e", "e"], ["e", "e", "e"]];
		inPlay = true;
		displayWinner("");
		buttons.forEach(function(button){
			button.innerText = "";
			button.className = "";
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
			
			//if game is active
			if (inPlay) {
				//allow player to play
				updateBoard(getRow(this.id), getColumn(this.id));
				//if the player has made a winning move
				if (checkWin(this.id)) {
					//deactivate game
					inPlay = false;
					//display win message
					displayWinner("CONGRATZ PLAYER " + curPlayer);
					console.log(curPlayer);
					//update the score board
					updateScore();
				}
				//else player has not won so switch player
				else {
					changePlayer();
					console.log(curPlayer);
					
				}
			}
		});
	});


	function updateBoard(row, column) {
		//if board position is empty
		if ((board[row][column])==="e") {
			//use turn counter to work out which player 
			if ((turnCounter % 2) > 0) {
				//if odd it is player x
				//display on board
				event.target.innerText = "X";
				//update array
				board[row][column] = "X";
			}
			else {
				//even is player o
				//display on board
				event.target.innerText = "O";
				//update array
				board[row][column] = "O";
			}
			//increase turn counter
			turnCounter++;
		}
	};

	function getRow(position) {
		//get the row from the <td> id
		var row = position.split(".")[0];
		return row;
	};

	function getColumn(position) {
		//get the column from the <td> id
		var column = position.split(".")[1];
		return column;
	};

	function checkWin(position) {
		//check if player has won
		var row = getRow(position);

		if (checkRow(row)) {
			return true;
		}
		else if (checkColumn(getColumn(position))) {
			return true;
		}
		else if (checkDiagonal()) {
			return true;
		}
		//none of checks trigger so player has not won
		else {
			return false;
		}


	}

	function checkRow(row) {
		//compare values in row
		if ((board[row][0] === board[row][1]) && (board[row][0] ===board[row][2])) {
			return true;
		}
		else { 
			return false;
		}
	};

	function checkColumn(column) {
		//compare values in column
		if ((board[0][column] === board[1][column]) && (board[0][column] === board[2][column])) {
			return true;
		}
		else {
			return false;
		}
	};

	function checkDiagonal() {
		//check diagonals for a winner
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
		//display win message
		//insert message into page
		document.getElementById("winner").innerText = message;
		//add class to board <td> elements
		buttons.forEach(function(button) {
			button.className = "boardWin";
		});
	}

	function changePlayer() {
		//TODO use ternary
		if (curPlayer == player1) {
			curPlayer = player2;
		} 
		else {
			if (curPlayer == player2) {
				curPlayer = player1;
			}
		}
	}

	function updateScore() {
		if (curPlayer == player1) {
			//update score
			player1Score++;
			//update page
			document.getElementById("player1Score").innerText = player1Score;
		} 
		else if (curPlayer == player2) {
			//update score
			player2Score++;
			//update page
			document.getElementById("player2Score").innerText = player2Score;
		}
	}
};

