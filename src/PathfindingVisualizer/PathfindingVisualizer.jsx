import React, {Component} from 'react';
import Cell from './Cell/Cell';

import './PathfindingVisualizer.css';
import {dijkstra, getCellsInShortestPathOrder} from '../Algorithms/Dijkstra'

const START_CELL_ROW = Math.ceil(Math.random() * 19);
const START_CELL_COL = Math.ceil(Math.random() * 15);
const FINISH_CELL_ROW = Math.ceil(Math.random() * 19);
const FINISH_CELL_COL = Math.ceil(Math.random() * 15) +37;

console.log(START_CELL_ROW);
console.log(START_CELL_COL);
console.log(FINISH_CELL_ROW);
console.log(FINISH_CELL_COL);

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      gridValue: "clear",
      algorithmsValue: "Dijkstra's",
      speedValue: 'fast',
      mouseIsPressed: false,
    };
    // this.gridVisualizer = {value: "clear"};
    this.handleChange = this.handleChange.bind(this);
  }

  animateDijkstra(visitedCellsInOrder, cellsInShortestPathOrder) {
    for (let i = 0; i <= visitedCellsInOrder.length; i++) {
      if (i === visitedCellsInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(cellsInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const cell = visitedCellsInOrder[i];
        if ((cell.row === START_CELL_ROW && cell.col === START_CELL_COL) || (cell.row === FINISH_CELL_ROW && cell.col === FINISH_CELL_COL)) {
          document.getElementById(`cell-${cell.row}-${cell.col}`).style.backgroundColor = 'rgba(0, 190, 218, 0.75)';
          return
        }
        // 
        else{
          document.getElementById(`cell-${cell.row}-${cell.col}`).className =
            'cell cell-visited';
        }
      }, 10 * i);
    }
  }

  animateShortestPath(cellsInShortestPathOrder) {
    for (let i = 0; i < cellsInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const cell = cellsInShortestPathOrder[i];
        if ((cell.row === START_CELL_ROW && cell.col === START_CELL_COL) || (cell.row === FINISH_CELL_ROW && cell.col === FINISH_CELL_COL)) {
          document.getElementById(`cell-${cell.row}-${cell.col}`).style.backgroundColor = 'rgba(255, 254, 106)';
          return
        }
        document.getElementById(`cell-${cell.row}-${cell.col}`).className =
          'cell cell-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startCell = grid[START_CELL_ROW][START_CELL_COL];
    const finishCell = grid[FINISH_CELL_ROW][FINISH_CELL_COL];
    const visitedCellsInOrder = dijkstra(grid, startCell, finishCell);
    const cellsInShortestPathOrder = getCellsInShortestPathOrder(finishCell);
    this.animateDijkstra(visitedCellsInOrder, cellsInShortestPathOrder);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({[event.target.name]: event.target.value});

  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }


  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <div className="header">
          <div className="navbar-outline">
            <div className="main-name">Pathfinding Visualizer</div>
            <div className= "dropdownMenu">
              <select className="form-select" value={this.state.value} onChange={this.handleChange} name="gridValue">
                <option value="clear">Clear Grid</option>
                <option value="maze">Maze Grid</option>
              </select>
            </div>
            <div className= "dropdownMenu">
              <select className="form-select" value={this.state.value} onChange={this.handleChange} name="algorithmsValue">
                <option value="Dijkstra's">Dijkstra's Algorithm</option>
                <option value="A*">A* Search</option>
                <option value="BFS">Breadth-First Search</option>
                <option value="DFS">Depth-First Search</option>
              </select>
            </div>
            <div className="dropdownMenu">
              <button className="btn btn-primary" onClick={() => this.visualizeDijkstra()}>Visualize {this.state.algorithmsValue}!</button>
            </div>
            <div className= "dropdownMenu">
              <select className="form-select" value={this.state.value} onChange={this.handleChange} name="speedValue">
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
              </select>
            </div>
            <div className="dropdownMenu">
              <button className="btn btn-warning">Clear</button>
            </div>
            <div className="sorting-visualizer">
              <button className="btn btn-light">Sorting Visualizer</button>
            </div>
          </div>
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((cell, cellIdx) => {
                  const {row, col, isFinish, isStart, isWall} = cell;
                  return (
                    <Cell
                      key={cellIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Cell>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}


const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const cell = newGrid[row][col];
  const newCell = {
    ...cell,
    isWall: !cell.isWall,
  };
  newGrid[row][col] = newCell;
  return newGrid;
};


const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 21; row++) {
    const currentRow = [];
    for (let col = 0; col < 56; col++) {
      currentRow.push(createCell(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createCell = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_CELL_ROW && col === START_CELL_COL,
    isFinish: row === FINISH_CELL_ROW && col === FINISH_CELL_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousCell: null,
  };
};

