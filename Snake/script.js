const grid = document.getElementById('grid');

// const gridRow = document.getElementsByClassName('gridRow').item(0);
// const cell = document.getElementsByClassName('cell').item(0);
let direction = 'right';
document.addEventListener('keyup', function (event) {
    switch (event.key) {
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
        default:
            break;
    }
});

gridSize = 40;

function createGrid(size = 20) {
    let col = 0,
        row = 0;
    while (row < size) {
        // const newGridRow = gridRow.cloneNode();
        const newGridRow = document.createElement('div');
        newGridRow.classList.add('gridRow');
        col = 0;
        while (col < size) {
            // const newCell = cell.cloneNode();
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.id = `${row}-${col}`;
            if (Snake.includes(newCell.id)) newCell.classList.add('cell-body');
            if (newCell.id === food) newCell.classList.add('cell-food');
            newGridRow.appendChild(newCell);
            col++;
        }
        grid.appendChild(newGridRow);
        row++;
    }
}

const Snake = ['10-9', '10-8', '10-7', '10-6', '10-5'];

let food = '10-14';

function newFood() {
    document.getElementById(food).classList.remove('cell-food');
    const row = parseInt(Math.random() * 20);
    const col = parseInt(Math.random() * 20);
    food = `${row}-${col}`;
    document.getElementById(food).classList.add('cell-food');
}

createGrid(gridSize);

// const foodInterval = setInterval(() => {
//     document.getElementById(food).classList.remove('cell-food');
//     newFood();
//     document.getElementById(food).classList.add('cell-food');
// }, 1000)

let isFoodEaten = false;
const snakeInterval = setInterval(() => {
    if (isFoodEaten) {
        addSnakeBody(direction);
        isFoodEaten = false;
        newFood();
    } else {
        updateSnakeBody(direction);
    }
    if (Snake[0] === food) {
        isFoodEaten = true;
    }

    if (Snake.slice(1).includes(Snake[0])) {
        clearInterval(snakeInterval);
        console.log('GAME OVER!');
    }
}, 200);

// function gameOver() {
//     snakeInterval.
// }

function addSnakeBody(direction) {
    let [row, col] = Snake[0].split('-');
    let newCellId;
    switch (direction) {
        case 'up':
            row = (parseInt(row) + gridSize - 1) % gridSize;
            break;
        case 'down':
            row = (parseInt(row) + gridSize + 1) % gridSize;
            break;
        case 'left':
            col = (parseInt(col) + gridSize - 1) % gridSize;
            break;
        case 'right':
            col = (parseInt(col) + gridSize + 1) % gridSize;
            break;
        default:
            break;
    }
    newCellId = `${row}-${col}`;
    Snake.unshift(newCellId);
    document.getElementById(newCellId).classList.add('cell-body');
}

function updateSnakeBody(direction) {
    let [row, col] = Snake[0].split('-');
    let newCellId;
    switch (direction) {
        case 'up':
            row = (parseInt(row) + gridSize - 1) % gridSize;
            break;
        case 'down':
            row = (parseInt(row) + gridSize + 1) % gridSize;
            break;
        case 'left':
            col = (parseInt(col) + gridSize - 1) % gridSize;
            break;
        case 'right':
            col = (parseInt(col) + gridSize + 1) % gridSize;
            break;
        default:
            break;
    }
    newCellId = `${row}-${col}`;
    document
        .getElementById(Snake[Snake.length - 1])
        .classList.remove('cell-body');
    Snake.unshift(newCellId);
    Snake.pop();
    document.getElementById(newCellId).classList.add('cell-body');
}
