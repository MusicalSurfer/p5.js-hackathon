// Declare global variables.
let grid;
let cols;
let rows;
let resolution = 20;

// Main p5.js function
function setup() {
  let canvas = createCanvas(800, 800); // Create a square canvas.
  canvas.parent('canvas-container'); // Assign canvas to parent canvas.
  // Width/height of canvas is given in the createCanvas function.
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);

  // For every cell, give it a value of 0 or 1.
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2)); // Floor/random are p5.js functions for shorter implementation.
    }
  }
}

// Helper function for setup() to create a array of arrays.
const make2DArray = (cols, rows) => {
  // Create an array of arrays.
  let result = [];
  for (let i = 0; i < cols; i++) {
    let staging = [];
    result.push(staging);
  }
  return result;
}

// P5.js function to animate.
function draw() {
  background(241, 237, 230); // P5.js function to set background color of canvas to red

  // Create dynamically sized cells for size of the grid.
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;

      if (grid[i][j] == 1) {
        fill(150, 162, 96); // P5.js function to fill a element with green color
        rect(x, y, resolution, resolution); // P5.js function to create a square for cells.
      }
    }
  }
  let next = make2DArray(cols, rows); // Create a new array of arrays for next generation.

  // Compute next generation based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j]; // Reference current selected cell.
      let neighbors = countNeighbors(grid, i, j); // Count bacteria neighbors

      // If current cell's value is 0 and has 3 bacteria neighbors, set value to 1
      if (state === 0 && neighbors === 3) {
        next[i][j] = 1
      }
      // Otherwise, if current cell's value is 1 and either has less than two neighbors or more than 3 neighbors, set value to 0.
      else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      }
      // Otherwise, change nothing. 
      else {
        next[i][j] = state;
      }
    }
  }
  grid = next; // Reset grid.
}

// Helper function for draw to count bacteria neighbors
const countNeighbors = (grid, x, y) => {
  let sum = 0; // Total number of neighbors.

  // Check for surrounding bacteria neighbors.
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      //Use modular math to allow for bacteria to check for neighbors using a wrap method (check for neighbors on other side of grid.)
      //Adding x + 1 to cols/rows is necessary in case that -1 is returned from modulo.
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row]; // Add total number of neighbors to sum.
    }
  }
  sum -= grid[x][y]; // Remove center cell from count.
  return sum
}