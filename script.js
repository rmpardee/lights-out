import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = { active: props.starting };
  }

  render() {
    if (this.state.active) {
      return <td className="on"></td>;
    } else {
      return <td className="off"></td>;
    }
  }
}

const Board = (props) => {
  const rows = [];
  for (let rowIndex = 0; rowIndex < props.size; rowIndex++) {
    const row = [];
    for (let colIndex = 0; colIndex < props.size; colIndex++) {
      const starting = (rowIndex + colIndex) % 2 === 0 ? true : false;
      row.push(<Square key={`${rowIndex}_${colIndex}`} starting={starting} />);
    }
    rows.push(
      <tr key={rowIndex}>
        {row}
      </tr>
    )
  }
  
  return (
    <table>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

ReactDOM.render(
  <Board size='8'/>
, document.querySelector('#container'));