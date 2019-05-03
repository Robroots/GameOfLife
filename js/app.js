document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM");

  var game = new GameOfLife(80, 40);

  var play = document.querySelector("#play");
  var pause = document.querySelector("#pause");
  var gameOn = false;

  play.addEventListener("click", function() {
    if (gameOn === false) {
      int = setInterval(function() {
        game.computeNextGeneration();
      }, 40);
    }
    gameOn = true;
  });

  pause.addEventListener("click", function() {
    clearInterval(int);
    gameOn = false;
  });
});

function GameOfLife(boardWidth, boardHeight) {
  this.width = boardWidth;
  this.height = boardHeight;
  this.board = document.querySelector("#board");
  this.cells = [];
  this.createBoard();
  this.computeNextGeneration();
  // this.firstGlider();
}

GameOfLife.prototype.createBoard = function() {
  this.board.style.width = this.width * 10 + "px";
  this.board.style.height = this.height * 10 + "px";
  var squares = this.width * this.height;
  for (var i = 0; i < squares; i++) {
    var square = document.createElement("div");
    this.board.appendChild(square);
  }
  this.cells = this.board.children;
  for (var j = 0; j < this.cells.length; j++) {
    this.cells[j].addEventListener("mouseover", function() {
      this.classList.toggle("live");
    });
  }
};

GameOfLife.prototype.divFromCoordinates = function(x, y) {
  var index = x + y * this.width;
  return this.cells[index];
};

GameOfLife.prototype.setCellState = function(x, y, state) {
  if (state === "live") {
    this.divFromCoordinates(x, y).classList.add("live");
  }
};

GameOfLife.prototype.firstGlider = function() {
  this.setCellState(1, 0, "live");
  this.setCellState(0, 2, "live");
  this.setCellState(1, 2, "live");
  this.setCellState(2, 2, "live");
  this.setCellState(2, 1, "live");
};

GameOfLife.prototype.computeFutureCellState = function(x, y) {
  var baseCell = this.divFromCoordinates(x, y);
  var neighbours = [];
  var aliveNeighbourCount = 0;

  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      if (i === 0 && j === 0) {
      } else {
        neighbours.push(this.divFromCoordinates(x + j, y + i));
      }
    }
  }

  for (var i = 0; i < neighbours.length; i++) {
    if (
      typeof neighbours[i] !== "undefined" &&
      neighbours[i].classList.contains("live")
    ) {
      aliveNeighbourCount++;
    }
  }

  if (
    baseCell.classList.contains("live") &&
    (aliveNeighbourCount >= 2 && aliveNeighbourCount <= 3)
  ) {
    return 1;
  } else if (
    !baseCell.classList.contains("live") &&
    aliveNeighbourCount === 3
  ) {
    return 1;
  }
};

GameOfLife.prototype.computeNextGeneration = function() {
  var nextGenArr = [];
  for (var i = 0; i < this.height; i++) {
    for (var j = 0; j < this.width; j++) {
      nextGenArr.push(this.computeFutureCellState(j, i));
    }
  }
  for (var j = 0; j < this.cells.length; j++) {
    if (nextGenArr[j] === 1) {
      this.cells[j].classList.add("live");
    } else {
      this.cells[j].classList.remove("live");
    }
  }
};
