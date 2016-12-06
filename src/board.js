import React, { Component } from 'react';
import Square from './square.js';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { lastClicked: null };
    this.onSiblingClick = this.onSiblingClick.bind(this);
  }

  onSiblingClick(location) {
    this.setState({ lastClicked: location });
  }

  isNeighbor(rowIndex, colIndex, callback) {
    const lastClickedRow = this.state.lastClicked.rowIndex;
    const lastClickedCol = this.state.lastClicked.colIndex;

    const isAbove = rowIndex === lastClickedRow - 1 && lastClickedCol === colIndex;
    const isBelow = rowIndex === lastClickedRow + 1 && lastClickedCol === colIndex;
    const isLeft = colIndex === lastClickedCol - 1 && lastClickedRow === rowIndex;
    const isRight = colIndex === lastClickedCol + 1 && lastClickedRow === rowIndex;

    if (isAbove || isBelow || isLeft || isRight) {
      callback(true);
    } else {
      callback(false);
    }
  }

  render() {

    const rows = [];

    for (let rowIndex = 0; rowIndex < this.props.size; rowIndex++) {
      const row = [];

      for (let colIndex = 0; colIndex < this.props.size; colIndex++) {

        let starting = null;
        let needsToggle = false;

        if (this.state.lastClicked === null) {
          starting = (rowIndex + colIndex) % 2 === 0 ? true : false;
          row.push(<Square
            key={ `${rowIndex}_${colIndex}` }
            location={ {rowIndex, colIndex} }
            starting={ starting }
            onSiblingClick={ this.onSiblingClick }
            needsToggle={ needsToggle }
          />);
        } else {
          this.isNeighbor(rowIndex, colIndex, (needsToggle) => {
            console.log("needsToggle: ", needsToggle);
            row.push(<Square
              key={ `${rowIndex}_${colIndex}` }
              location={ {rowIndex, colIndex} }
              starting={ starting }
              onSiblingClick={ this.onSiblingClick }
              needsToggle={ needsToggle }
            />);
          });   
        }
      }

      rows.push(<tr key={rowIndex}>{row}</tr>);
    }
    
    return (
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}