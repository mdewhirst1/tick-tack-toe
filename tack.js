window.onload = function(){
	var buttons = Array.from(document.getElementsByTagName("td"));
	var turnCounter = 1;
	var board = [["e", "e", "e"], ["e", "e", "e"], ["e", "e", "e"]];

	buttons.forEach(function(button) {
		button.addEventListener("click", function(event) {
			
			console.log(this.id);
			var row = this.id.split(".")[0];
	    	var column = this.id.split(".")[1];

			console.log("Row = " + row + " Column = " + column);

			if ((turnCounter % 2) > 0) {
				event.target.innerText = "X";
			}
			else {
				event.target.innerText = "O";
			}
			turnCounter++;

		});
	});
};