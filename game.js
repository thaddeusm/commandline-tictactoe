var readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var player = 'X';

var board = [
	['_', '_', '_'], 
	['_', '_', '_'], 
	['_', '_', '_']
];

var winningCombinations = [
	[[0, 2], [0, 1], [0, 0]],
	[[1, 2], [1, 1], [1, 0]],
	[[2, 2], [2, 1], [2, 0]],
	[[0, 2], [1, 2], [2, 2]],
	[[0, 1], [1, 1], [2, 1]],
	[[0, 0], [1, 0], [2, 0]],
	[[0, 0], [1, 1], [2, 2]],
	[[0, 2], [1, 1], [2, 0]],
];

var winnerExists = function(mark) {
	var winner = false;

	for (var i=0; i<winningCombinations.length; i++) {
		// for each combination (there are 8)
		var combination = winningCombinations[i];

		// check for 3 matches
		var matches = 0;
		
		// for each coordinate (there are 3)
		for (var j=0; j<combination.length; j++ ) {
			var coordinate = combination[j];
			var row = coordinate[0];
			var column = coordinate[1];

			if (board[row][column] == mark) {
				matches++;
			}
		}

		// check if there is three in a row
		if (matches == 3) {
			winner = true;
			break;
		} else {
			matches = 0;
		}

	}

	return winner;
	
};

var isATie = function() {
	var currentEmptySpaces = findEmptySpaces();
	// make a boolean variable as the test
	var tie = true;
	// loop through the rows
	for (var i=0; i<currentEmptySpaces.length; i++) {
		var row = currentEmptySpaces[i];
		for (var j=0; j<row.length; j++) {
			var column = row[j];
			if (column) {
				tie = false;
				break;
			}
		}
	}
	return tie;

};

var placeItem = function(row, column, mark) {
	board[row][column] = mark;
};

var findEmptySpaces = function() {
	var empty = [
		['', '', ''], 
		['', '', ''], 
		['', '', '']
	];

	for (var i=0; i<board.length; i++) {
		for (var j=0; j<board[i].length; j++) {
			if (board[i][j] == '_') {
				empty[i][j] = true
			} else {
				empty[i][j] = false
			}
		}
	}

	return empty;
};

var gameIsOver = function() {
	var check = false;

	if (winnerExists('X')) {
		check = true;
		console.log('X is the winner!');
	} else if (winnerExists('O')) {
		check = true;
		console.log('O is the winner!');
	} else if (isATie()) {
		check = true;
		console.log('Tie!')
	}

	return check;
}

var showBoard = function() {
	console.log(board[0]);
	console.log(board[1]);
	console.log(board[2]);
};

var changeTurns = function() {
	if (player == 'X') {
		player = 'O';
	} else {
		player = 'X';
	}

	play();
}

var play = function() {
// each time the function runs, it is a single turn
	var rowChoice;
	var columnChoice;
	var markChoice;

	rl.question('Which row? (between 0-2)', function(row) {
		rowChoice = row

		rl.question('Which column? (between 0-2)', function(column) {
			columnChoice = column

			var emptySpaces = findEmptySpaces();

			if (emptySpaces[rowChoice][columnChoice] == true) {
				placeItem(rowChoice, columnChoice, player);
				showBoard();
				console.log("Great!");
			} else {
				console.log("Please choose a different space.");
			}

			if (gameIsOver()) {
				rl.close();
				showBoard();
			} else {
				changeTurns();
			}
		});
	});
};

showBoard();
play();
