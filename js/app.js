document.addEventListener('DOMContentLoaded', function() {
console.log('DOM');

var game = new GameOfLife(20, 20);
console.log(game);

});

function GameOfLife(boardWidth, boardHeight){
    this.width = boardWidth;
    this.height = boardHeight;
    this.board = document.querySelector("#board");
    this.cells = [];
    this.createBoard();
    this.divFromCoordinates();
}

GameOfLife.prototype.createBoard = function (){
    this.board.style.width = this.width * 10 + "px";
    this.board.style.height = this.height * 10 + "px";
    var squares = this.width * this.height;
    for (var i = 0; i < squares ; i++){
        var square = document.createElement("div");
        this.board.appendChild(square);
    }
    this.cells = this.board.children; //pseudo
    for (var i = 0; i < this.cells.length; i++){
        this.cells[i].addEventListener("click", function(){
            this.classList.toggle("live");
        })
    }
};
