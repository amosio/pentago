import React from 'react';
import SectionLine from './SectionLine';
//@TODO
function Section(props) {
  let linesRanges = [];

  for (let i = props.range.from; i < props.range.to; i = i + 3) {
    linesRanges.push({ from: i, to: i + 2 });
  }

  return linesRanges.map(range => {
    return (
      <div className="row">
        <SectionLine
          range={{ from: range.from, to: range.to }}
          squares={props.squares}
          onMove={props.onMove}
          color={props.color}
        />
      </div>
    );
  });
}

export default Section;
