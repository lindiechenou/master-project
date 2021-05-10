import React, {Component} from 'react';
import Cell from './Cell/Cell';

import './PathfindingVisualizer.css';

const START_CELL_ROW = Math.ceil(Math.random() * 19);
const START_CELL_COL = Math.ceil(Math.random() * 15);
const FINISH_CELL_ROW = Math.ceil(Math.random() * 19);
const FINISH_CELL_COL = Math.ceil(Math.random() * 15) +37;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }


  render() {
    const {grid} = this.state;

    return (
      <>
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
