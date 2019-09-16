var readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var board = [
	['_', '_', '_'], 
	['_', '_', '_'], 
	['_', '_', '_']
];

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

var showBoard = function() {
	console.log(board[0]);
	console.log(board[1]);
	console.log(board[2]);
};

var play = function() {
	var rowChoice;
	var columnChoice;
	var markChoice;

	rl.question('Which row?', function(row) {
		rowChoice = row

		rl.question('Which column?', function(column) {
			columnChoice = column

			rl.question('Leave your mark:', function(mark) {
				markChoice = mark

				var emptySpaces = findEmptySpaces();

				if (emptySpaces[rowChoice][columnChoice] == true) {
					placeItem(rowChoice, columnChoice, mark);
					showBoard();
					console.log("Great!");
				} else {
					console.log("Please choose a different space.");
				}

				rl.close();
			});
		});
	});
};

showBoard();
play();
