import React from 'react';
import Square from './tiles/Square';

function Grid(props) {
  let range = [];
  for (let i = props.range.from; i <= props.range.to; i++) {
    range.push(i);
  }
  return range.map(index => {
    return (
      <Square
        index={index}
        value={props.squares[index]}
        onMove={() => props.onMove(index)}
        color={props.color}
      />
    );
  });
}

export default Grid;
