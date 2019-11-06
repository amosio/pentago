import React from "react";

function Rotate(props) {
  const CLOCKWISE = String.fromCodePoint(0x27f3);
  const ANTI_CLOCKWISE = String.fromCodePoint(0x27f2);

  let content;
  if (props.stateOfTurn === "rotate") {
    content = (
      <button className="rotate" onClick={() => props.onRotate()}>
        {props.direction === "C" ? CLOCKWISE : ANTI_CLOCKWISE}
      </button>
    );
  } else {
    content = <button className="margin"></button>;
  }

  return content;
}

export default Rotate;
