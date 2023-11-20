const rows = 50;
const cols = 50;
const cellSize = 10;

const rpStates = [0, 1, 2];
const rpColors = {
  0: [150, 0, 0], // rock
  1: [0, 150, 0], // paper
  2: [0, 0, 150], // scissors
};

let grid = [];

function setup() {
  createCanvas(cols * cellSize, rows * cellSize);
  initializeGrid();
}

function draw() {
  background(255);

  updateGrid();
  displayGrid();
}

function initializeGrid() {
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = floor(random(3));
    }
  }
}

function updateGrid() {
  const newGrid = createEmptyGrid();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const currentState = grid[i][j];
      const neighbors = getNeighbors(i, j);

      const winningNeighbors = getWinningNeighbors(currentState, neighbors);
      const winningCount = winningNeighbors.length;

      // Rule: If winning neighbors are 2 or less, stay in the current state (defense)
      // If winning neighbors are more than 2, switch state with a randomly chosen winning neighbor (occupation)
      newGrid[i][j] =
        winningCount <= 2
          ? currentState
          : winningNeighbors[floor(random(winningCount))];
    }
  }

  grid = newGrid;
}

function displayGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const state = grid[i][j];
      const color = rpColors[state];

      fill(color);
      rect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }
}

function createEmptyGrid() {
  const newGrid = [];
  for (let i = 0; i < rows; i++) {
    newGrid[i] = new Array(cols).fill(null);
  }
  return newGrid;
}

function getNeighbors(row, col) {
  const neighbors = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i;
      const newCol = col + j;

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        neighbors.push(grid[newRow][newCol]);
      }
    }
  }
  return neighbors;
}

function getWinningNeighbors(currentState, neighbors) {
  const winningMoves = {
    0: 2, // Rock wins against Scissors
    1: 0, // Paper wins against Rock
    2: 1, // Scissors win against Paper
  };

  return neighbors.filter(
    (neighbor) => neighbor === winningMoves[currentState]
  );
}
