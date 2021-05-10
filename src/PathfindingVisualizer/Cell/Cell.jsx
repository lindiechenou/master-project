import React, {Component} from 'react';

import './Cell.css';

export default class Cell extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? 'cell-finish'
      : isStart
      ? 'cell-start'
      : isWall
      ? 'cell-wall'
      : '';

    return (
      <div
        id={`cell-${row}-${col}`}
        className={`cell ${extraClassName}`}
        >
        </div>
    );
  }
}