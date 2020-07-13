import React from "react";
import Header from "./Header";
import Title from "./Title";
import Footer from "./Footer";
import Gameover from "./Gameover";
import Timer from "./Timer";
import Gamewon from "./Gamewon";

export default class Home extends React.Component {
  state = {
    gridM: 10, // default value
    gridN: 10, // default value
    mines: 10, // default value
    minePositions: {},
    mineArray: [],
    gameOver: false,
    gameStarted: false,
    totalClicks: 0,
    timerStarted: false,
    timerCount: 0,
    timerInterval: null,
    gameWon: false
  };

  componentDidMount() {
    this.reloadTheGame();
  }

  reloadTheGame = async () => {
    await this.setState({
      minePositions: {},
      mineArray: [],
      gameOver: false,
      gameStarted: false,
      timerCount: 0,
      gameWon: false,
      totalClicks: 0
    });
    await this.prepareInitialArray();
    await this.createMines();
    this.stopTheInterval();
  };

  updateM = value => {
    this.setState({
      gridM: value.target.value
    });
  };

  updateN = value => {
    this.setState({
      gridN: value.target.value
    });
  };

  updateMinesCount = value => {
    if (value > this.state.gridM * this.state.gridN) {
      alert("Provide valid mines count");
      return;
    }
    this.setState({
      mines: value.target.value
    });
  };

  generateRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * max) + min;
  };

  prepareInitialArray = () => {
    // Prepare the complete grid with initial values
    const data = [];
    for (let i = 0; i < this.state.gridM; i++) {
      const dataElem = [];
      for (let j = 0; j < this.state.gridN; j++) {
        dataElem.push(null);
      }
      data.push(dataElem);
    }

    this.setState({
      mineArray: data
    });
  };

  createMines = () => {
    // Create mines and store the positions
    if (this.state.mines >= this.state.gridM * this.state.gridN) {
      alert("Provide valid mines count");
      return;
    }
    while (Object.keys(this.state.minePositions).length < this.state.mines) {
      const x = this.generateRandomNumberInRange(0, this.state.gridM);
      const y = this.generateRandomNumberInRange(0, this.state.gridN);
      const key = `${x}${y}`;
      if (key in this.state.minePositions) {
        continue;
      } else {
        const data = this.state.mineArray;
        data[x][y] = "X";
        const obj = {};
        obj[key] = "X";
        this.setState({
          minePositions: Object.assign(this.state.minePositions, obj),
          mineArray: data
        });
      }
    }
  };

  onBoxClick = async (m, n) => {
    const data = this.state.mineArray;
    if (`${m}${n}` in this.state.minePositions) {
      // mine clicked
      this.stopTheInterval();
      this.setState({
        gameOver: true,
        gameStarted: false,
        gameWon: false,
        totalClicks: 0
      });
    } else {
      data[m][n] = 0;

      await this.setState(
        {
          mineArray: data,
          totalClicks: this.state.totalClicks + 1
        },
        () => this.checkMinesInAdjacent(m, n)
      );

      if (
        this.state.totalClicks ===
        this.state.gridM * this.state.gridN - this.state.mines
      ) {
        if (!this.state.gameOver && this.state.gameStarted) {
          this.setState({
            gameWon: true
          });
          this.stopTheInterval();
        }
      }
    }
  };

  checkMinesInAdjacent = (m, n) => {
    const data = this.state.mineArray;
    const minX = m - 1;
    const maxX = m + 1;
    const minY = n - 1;
    const maxY = n + 1;
    let adjacentMinesCount = 0;
    for (let i = minX; i <= maxX; i++) {
      for (let j = minY; j <= maxY; j++) {
        if (i === m && j === n) {
        } else {
          // Check if index are out of range for both
          if (i < m && i < 0) {
            continue;
          } else if (i > m && i >= this.state.gridM) {
            continue;
          } else {
          }

          if (j < n && j < 0) {
            continue;
          } else if (j > n && j >= this.state.gridN) {
            continue;
          } else {
            // j == m
          }

          // Check if mine present and increment accordingly
          if (data[i][j] === "X") {
            adjacentMinesCount += 1;
          }
        }
      }
    }

    data[m][n] = adjacentMinesCount;

    this.setState({
      mineArray: data
    });
  };

  checkAndRenderBoxItem = (m, n) => {
    const data = this.state.mineArray;
    const item = data[m][n];
    if (item === "X") {
      if (this.state.gameOver) {
        return <div className="mine-clicked-over">X</div>;
      }
    } else {
      return item;
    }
  };

  startTheGame = () => {
    if (Object.keys(this.state.minePositions).length <= 0) {
      alert("Provide valid mines count");
      return;
    }
    if (
      this.state.timerCount === 0 &&
      Object.keys(this.state.minePositions).length > 0
    ) {
      this.setState({
        gameStarted: true,
        gameOver: false,
        timerStarted: true,
        timerInterval: setInterval(() => this.startTheInterval(), 1000)
      });
    }
  };

  startTheInterval = () => {
    // Start the timer
    this.setState({
      timerCount: this.state.timerCount + 1
    });
  };

  stopTheInterval = () => {
    // Stop the timer
    if (this.state.timerInterval) {
      clearInterval(this.state.timerInterval);
    }
  };

  render() {
    return (
      <div className="container">
        {this.state.gameOver ? <Gameover /> : null}
        {this.state.gameWon ? <Gamewon /> : null}
        <Title />
        <Header
          m={this.state.gridM}
          n={this.state.gridN}
          mines={this.state.mines}
          updateM={this.updateM}
          updateN={this.updateN}
          updateMinesCount={this.updateMinesCount}
          reloadTheGame={this.reloadTheGame}
        />
        <Timer time={this.state.timerCount} />
        <div
          className={
            this.state.gameStarted
              ? "mine-container-enabled"
              : "mine-container-disabled"
          }
        >
          {this.state.mineArray.map((item, indexM) => (
            <div key={"r" + indexM} className="mine-row">
              {item.map((item, indexN) => (
                <div
                  key={"b" + indexN}
                  className={
                    item == null || item === "X"
                      ? "mine-box"
                      : "mine-box-clicked"
                  }
                  onClick={() => this.onBoxClick(indexM, indexN)}
                >
                  {this.checkAndRenderBoxItem(indexM, indexN)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <Footer
          startTheGame={this.startTheGame}
          reloadTheGame={this.reloadTheGame}
        />
      </div>
    );
  }
}
