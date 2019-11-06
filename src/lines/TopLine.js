import React from 'react';
import Rotate from '../tiles/Rotate';
import Margin from '../tiles/Margin';

function TopLine(props) {
  return (
    <React.Fragment>
      <Margin />
      <Rotate
        stateOfTurn={props.stateOfTurn}
        direction={'A'}
        onRotate={() => props.firstRotate.onRotate('A', 2)}
      />
      <Margin />
      <Margin />
      <Margin />
      <Margin />
      <Rotate
        stateOfTurn={props.stateOfTurn}
        direction={'C'}
        onRotate={() => props.secondRotate.onRotate('C', 3)}
      />
      <Margin />
    </React.Fragment>
  );
}

export default TopLine;
