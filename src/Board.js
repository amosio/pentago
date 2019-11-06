import React from 'react';
import Section from './Section';
import Rotate from './tiles/Rotate';
import Margin from './tiles/Margin';
import BottomLine from './lines/BottomLine';
import TopLine from './lines/BottomLine';

class Board extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <TopLine
            stateOfTurn={this.props.stateOfTurn}
            firstRotate={{
              direction: 'C',
              onRotate: () => this.props.onRotate('C', 0)
            }}
            secondRotate={{
              direction: 'A',
              onRotate: () => this.props.onRotate('A', 1)
            }}
          />
        </div>
        <div className="row">
          <div className="column">
            <Rotate
              stateOfTurn={this.props.stateOfTurn}
              direction={'A'}
              onRotate={() => this.props.onRotate('A', 0)}
            />
            <Margin />
            <Margin />
          </div>
          <div className="column">
            <Section
              range={{ from: 0, to: 8 }}
              squares={this.props.squares}
              onMove={this.props.onMove}
              color={'lightYellow'}
            />
          </div>
          <div className="column">
            <Section
              range={{ from: 9, to: 17 }}
              squares={this.props.squares}
              onMove={this.props.onMove}
              color={'lightBlue'}
            />
          </div>
          <div className="column">
            <Rotate
              stateOfTurn={this.props.stateOfTurn}
              direction={'C'}
              onRotate={() => this.props.onRotate('C', 1)}
            />
            <Margin />
            <Margin />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <Margin />
            <Margin />
            <Rotate
              stateOfTurn={this.props.stateOfTurn}
              direction={'C'}
              onRotate={() => this.props.onRotate('C', 2)}
            />
          </div>
          <div className="column">
            <Section
              range={{ from: 18, to: 26 }}
              squares={this.props.squares}
              onMove={this.props.onMove}
              color={'lightBlue'}
            />
          </div>
          <div className="column">
            <Section
              range={{ from: 27, to: 35 }}
              squares={this.props.squares}
              onMove={this.props.onMove}
              color={'lightYellow'}
            />
          </div>
          <div className="column">
            <Margin />
            <Margin />
            <Rotate
              stateOfTurn={this.props.stateOfTurn}
              direction={'A'}
              onRotate={() => this.props.onRotate('A', 3)}
            />
          </div>
        </div>
        <div className="row">
          <BottomLine
            stateOfTurn={this.props.stateOfTurn}
            firstRotate={{
              direction: 'A',
              onRotate: () => this.props.onRotate('A', 2)
            }}
            secondRotate={{
              direction: 'C',
              onRotate: () => this.props.onRotate('C', 3)
            }}
          />
        </div>
      </div>
    );
  }
}

export default Board;
