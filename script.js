import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Square extends Component {
  constructor(props) {
    super(props);
    const startAt = props.starting;
    this.state = { active: startAt };
    this.onSqClick = this.onSqClick.bind(this);
  }

  onSqClick(e) {
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <td
        className={ this.state.active ? 'on' : 'off' }
        onClick={ this.onSqClick }>
      </td>
    );
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