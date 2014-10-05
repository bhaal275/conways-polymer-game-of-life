(function () {
    var _ = self.GameOfLife = function (board) {
        this.board = board;
        this.columns = this.board.length;
        this.rows = this.board[0].length;
    };

    _.prototype = {
        next: function () {
            var previousBoard = this.board.map(function (arr) {
                return arr.slice();
            });
            
            for(var y = 0; y < this.columns; y++) {
                for(var x = 0; x < this.rows; x++) {
                    var aliveNeighbors = this.aliveNeighbors(previousBoard, x, y);
                    
                    if(aliveNeighbors < 2 || aliveNeighbors > 3) {
                        this.board[y][x] = 0;
                    }
                    
                    if(aliveNeighbors === 3) {
                        this.board[y][x] = 1;
                    }   
                }
            }
            
        },
        
        aliveNeighbors: function (currentBoard, x, y) {
            var aboveNodes = currentBoard[y-1] || [];
            var belowNodes = currentBoard[y+1] || [];
            
            return [
                aboveNodes[x-1], aboveNodes[x], aboveNodes[x+1],
                currentBoard[y][x-1], currentBoard[y][x+1],
                belowNodes[x-1], belowNodes[x], belowNodes[x+1]
            ].reduce(function (prev, curr) {
                return prev += +!!curr;
            }, 0);
        },
        
        toString: function () {
            return this.board.map(function (innerArr) {
                return innerArr.join(' ');
            }).join('\n');
        }
    };
})();