import React from 'react';

function Square(props) {
  return (
    <button
      className="square"
      onClick={() => props.onMove()}
      style={{ backgroundColor: props.color }}
    >
      {props.value}
      {/* {props.index} */}
    </button>
  );
}

export default Square;
