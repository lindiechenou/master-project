import React, {Component} from 'react';

import './Cell.css';

export default class Cell extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      type,
      row,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      onMouseLeave,
    } = this.props;
    const extraClassName = isFinish
      ? 'cell-finish'
      : isStart
      ? 'cell-start'
      : isWall
      ? 'cell-wall'
      : '';
    // const extraClassName=type==='start'?'start-node':
    //                       type==='finish'?'finish-node':
    //                       type==='wall'?'wall-node':
    //                       type==='weight'?'weight-node':
    //                       ""
    

    return (
      <div
        id={`cell-${row}-${col}`}
        className={`cell ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        //onMouseLeave={() => onMouseLeave()}
        >
        </div>
    );
  }
}