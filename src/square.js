import React, { Component } from 'react';

export default class Square extends Component {
  constructor(props) {
    super(props);
    this.state = { active: props.starting };

    // bind instances of this for all other methods
    this.onSqClick = this.onSqClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ active: !this.state.active });
  }

  onSqClick() {
    this.toggle();
    // pass the location that was clicked back up to the parent Board
    // so it can change its state and pass it back to the other children Squares
    this.props.onSiblingClick(this.props.location);
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.needsToggle) {
      this.toggle();
    }
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