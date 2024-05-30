
const rows = 5;
const cols = 5;

let grid = [];

function createGrid() {
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = ' ';
    }
  }
}

function displayGrid() {
  let gridElement = document.getElementById('grid');
  gridElement.innerHTML = '';
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.innerText = grid[i][j];
      gridElement.appendChild(cell);
    }
    gridElement.innerHTML += '<br>';
  }
}

function startGame() {
  createGrid();
  displayGrid();
}

