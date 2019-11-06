import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import './index.css';

const PLAYER_ONE = String.fromCodePoint(0x1f316);
const PLAYER_TWO = String.fromCodePoint(0x1f318);
const GRID_AREA = 9;

// const PLAYER_ONE = String.fromCodePoint(0x1f436);
// const PLAYER_TWO = String.fromCodePoint(0x1f420);

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.lines = [];
    this.clockwise = new Map();
    this.state = {
      history: [
        {
          squares: Array(36).fill(null)
        }
      ],
      oneIsNext: true,
      stepNumber: 0,
      stateOfTurn: 'move'
      //move or rotate
    };
  }

  componentDidMount() {
    //  |00:01:02|09:...
    //  |03:04:05|12:...
    //  |06:07:08|15:...
    //  +--------+-----
    //  |18:19:20|27:...
    //  |........|
    this.clockwise = new Map([
      [0, 2],
      [1, 5],
      [2, 8],
      [5, 7],
      [8, 6],
      [7, 3],
      [6, 0],
      [3, 1],
      [4, 4]
    ]);
    function updateLineContainer(targetLine, baseLine, addedValue) {
      baseLine.forEach(list =>
        targetLine.push(list.map(value => value + addedValue))
      );
    }
    const LEFT_TOP_DIAGONALLY = [
      [3, 7, 20, 30, 34],
      [0, 4, 8, 27, 31],
      [4, 8, 27, 31, 35],
      [1, 5, 15, 28, 32]
    ];

    const RIGHT_TOP_DIAGONALLY = [
      [10, 12, 8, 19, 21],
      [11, 13, 15, 20, 22],
      [13, 15, 20, 22, 24],
      [14, 16, 27, 23, 25]
    ];

    const ROWS = [];
    const FIRST_ROW_LINES = [[0, 1, 2, 9, 10], [1, 2, 9, 10, 11]];
    for (let i = 0; i < 3; i++) {
      updateLineContainer(ROWS, FIRST_ROW_LINES, i * 3);
    }

    const THIRD_ROW_LINES = [[18, 19, 20, 27, 28], [19, 20, 27, 28, 29]];
    for (let i = 0; i < 3; i++) {
      updateLineContainer(ROWS, THIRD_ROW_LINES, i * 3);
    }

    const COLS = [];
    const FIRST_COL_LINES = [[0, 3, 6, 18, 21], [3, 6, 18, 21, 24]];

    for (let i = 0; i < 3; i++) {
      updateLineContainer(COLS, FIRST_COL_LINES, i);
    }

    const THIRD_COLS_LINES = [[9, 12, 15, 27, 30], [12, 15, 27, 30, 33]];

    for (let i = 0; i < 3; i++) {
      updateLineContainer(ROWS, THIRD_COLS_LINES, i);
    }

    this.lines = [
      ...LEFT_TOP_DIAGONALLY,
      ...RIGHT_TOP_DIAGONALLY,
      ...ROWS,
      ...COLS
    ];
  }

  handleRotate(direction, boardGridIndex) {
    const OFFSET = GRID_AREA * boardGridIndex;
    console.log('ROTATE: ', boardGridIndex, direction);
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (direction === 'C') {
      for (let [origin, target] of this.clockwise) {
        squares[target + OFFSET] = current.squares[origin + OFFSET];
      }
    } else {
      for (let [origin, target] of this.clockwise) {
        squares[origin + OFFSET] = current.squares[target + OFFSET];
      }
    }

    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      oneIsNext: !this.state.oneIsNext,
      stateOfTurn: 'move'
    });
  }

  handleMove(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (
      this.checkFor5InLine(squares) ||
      this.state.stateOfTurn === 'rotate' ||
      squares[i]
    ) {
      return;
    }
    squares[i] = this.state.oneIsNext ? PLAYER_ONE : PLAYER_TWO;
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      stateOfTurn: 'rotate'
      // oneIsNext: !this.state.oneIsNext
    });
  }

  jumpTo(step) {
    console.log(step, 'step');
    this.setState({
      stepNumber: step,
      oneIsNext: Math.floor(step / 2) % 2 === 0,
      stateOfTurn: step % 2 === 0 ? 'move' : 'rotate'
    });
  }

  checkFor5InLine(squares) {
    let result = { hasPlayerOne5InLine: false, hasPlayerTwo5InLine: false };
    for (let i = 0; i < this.lines.length; i++) {
      if (
        this.lines[i].every(index => {
          return squares[index] === PLAYER_ONE;
        })
      ) {
        result.hasPlayerOne5InLine = true;
      }
      if (
        this.lines[i].every(index => {
          return squares[index] === PLAYER_TWO;
        })
      ) {
        result.hasPlayerTwo5InLine = true;
      }
    }
    if (
      result.hasPlayerOne5InLine === true ||
      result.hasPlayerTwo5InLine === true
    ) {
      return result;
    } else return false;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const is5InLine = this.checkFor5InLine(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : `Go to game start`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (is5InLine) {
      status = `Result: ${
        is5InLine.hasPlayerOne5InLine ? `${PLAYER_ONE} has 5 in row!` : ''
      } ${is5InLine.hasPlayerTwo5InLine ? `${PLAYER_TWO} has 5 in row!` : ''}`;
    } else {
      status = `Waiting for player ${
        this.state.oneIsNext ? PLAYER_ONE : PLAYER_TWO
      } to ${this.state.stateOfTurn}`;
    }
    return (
      <React.Fragment>
        <header className="game-desc">
          <h2>
            <a href="https://en.wikipedia.org/wiki/Pentago">Pentago</a> game by:{' '}
            <a href="https://github.com/amosio">A.M.</a>
          </h2>
        </header>
        <main>
          <div className="game-info">
            <h3>{status}</h3>
          </div>
          <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onMove={i => this.handleMove(i)}
                onRotate={(direction, boardGridIndex) =>
                  this.handleRotate(direction, boardGridIndex)
                }
                stateOfTurn={this.state.stateOfTurn}
              />
            </div>
            <div className="game-log">
              <ul>{moves}</ul>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));
