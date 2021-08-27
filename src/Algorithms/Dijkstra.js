export function dijkstra(grid, startCell, finishCell) {
  const visitedCellsInOrder = [];
  startCell.distance = 0;
  const unvisitedCells = getAllCells(grid);
  
  while (!!unvisitedCells.length) {
    sortCellsByDistance(unvisitedCells);
    const closestCell = unvisitedCells.shift();
    // If we encounter a wall, we skip it.
    if (closestCell.isWall) continue;
    // If the closest Cell is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestCell.distance === Infinity) return visitedCellsInOrder;
    closestCell.isVisited = true;
    visitedCellsInOrder.push(closestCell);
    if (closestCell === finishCell) return visitedCellsInOrder;
    updateUnvisitedNeighbors(closestCell, grid);
  }
}

function sortCellsByDistance(unvisitedCells) {
  unvisitedCells.sort((CellA, CellB) => CellA.distance - CellB.distance);
}

function updateUnvisitedNeighbors(cell, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(cell, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = cell.distance + 1;
    neighbor.previousCell = cell;
  }
}

function getUnvisitedNeighbors(cell, grid) {
  const neighbors = [];
  const {col, row} = cell;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllCells(grid) {
  const cells = [];
  for (const row of grid) {
    for (const cell of row) {
      cells.push(cell);
    }
  }
  return cells;
}

// Backtracks from the finishCell to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getCellsInShortestPathOrder(finishCell) {
  const cellsInShortestPathOrder = [];
  let currentCell = finishCell;
  while (currentCell !== null) {
    cellsInShortestPathOrder.unshift(currentCell);
    currentCell = currentCell.previousCell;
  }
  return cellsInShortestPathOrder;
}
