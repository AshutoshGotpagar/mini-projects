const size = 4;

// const grid = [];
const grid = document.getElementById('grid');
const x = document.createElement('span');
x.classList.add('piece', 'x');
x.innerHTML = 'X';
const o = document.createElement('span');
o.classList.add('piece', 'o');
o.innerHTML = 'O';

const gridData = [];
let cellCount = 0;
// class cell {
//     constructor(value, isOccupied) {
//         this.value = value;
//         this.isOccupied = isOccupied;
//     }
// }

function createGrid(size) {
    // for(let i = 0; i < size; i++) {
    //     let row = [];
    //     for(let j = 0; j < size; j++) {
    //         row.push(new cell(null, false));
    //     }
    //     grid.push(row);
    // }
    for (let row = 0; row < size; row++) {
        let gridDatarow = [];

        let gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        for (let col = 0; col < size; col++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `${row}-${col}`;
            gridRow.appendChild(cell);

            gridDatarow.push(0);
        }
        grid.appendChild(gridRow);
        gridData.push(gridDatarow);
    }
    cellCount = size * size;
}

let type = x;

grid.addEventListener('click', function (event) {
    console.log(event.target);
    event.stopPropagation();
    let [row, col] = event.target.id.split('-');
    row = parseInt(row);
    col = parseInt(col);

    let cell = document.getElementById(event.target.id);
    if (cell.childElementCount === 0) {
        let newPiece = type.cloneNode(true);
        cell.appendChild(newPiece);

        gridData[row][col] = type === x ? 1 : -1;
        cellCount--;

        let temp = validateGame(row, col);
        if (temp > 0) {
            console.log('X Won!');
        } else if (temp < 0) {
            console.log('O Won!');
        }

        if(cellCount === 0) {
            console.log('Its a Draw!');
        }

        

        type = type === x ? o : x;
    }
});

function validateGame(row, col) {
    return validateRow(row) + validateColumn(col) + validateDiagonal();
}

function validateRow(row) {
    let sum = 0;
    for (let col = 0; col < size; col++) {
        sum += gridData[row][col];
    }
    if (sum === size) return 1;
    if (sum === -size) return -1;
    return 0;
}

function validateColumn(col) {
    let sum = 0;
    for (let row = 0; row < size; row++) {
        sum += gridData[row][col];
    }
    if (sum === size) return 1;
    if (sum === -size) return -1;
    return 0;
}

function validateDiagonal() {
    let sum = 0;

    for (let i = 0; i < size; i++) {
        sum += gridData[i][i];
    }

    if (sum === size) return 1;
    if (sum === -size) return -1;

    sum = 0;
    for (let i = 0; i < size; i++) {
        sum += gridData[i][size - 1 - i];
    }

    if (sum === size) return 1;
    if (sum === -size) return -1;
    return 0;
}

createGrid(size);
