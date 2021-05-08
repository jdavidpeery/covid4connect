import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
function Square(props) {
  if (props.color === 'white') {
    return (
      <div class='box has-text-white has-text-centered is-size-5'>⬤</div>
    );
  } else if (props.color === 'blue') {
    return (
      <div class='box has-text-link has-text-centered is-size-5'>⬤</div>
    );
  } else {
    return (
      <div class='box has-text-danger has-text-centered is-size-5'>⬤</div> 
    );
  }
}
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(42).fill('white'),
        blueIsUp: true
      };
    }
    handleClick(i) {
      if (i === 8) {
        this.setState({
          squares: Array(42).fill('white'),
          blueIsUp: true
        })
      } else {
        let dropResult = handleDrop(this.state.squares, i, this.state.blueIsUp);
        let newSquares = dropResult[0];
        let isValidMove = dropResult[1];
        if (isValidMove) {
          this.setState({
            squares: newSquares,
            blueIsUp: !this.state.blueIsUp
          })
          checkForWinner(newSquares)
        }
      }
    }
    renderSquare(c) {
      return (
        <Square
          color={c}
        />
      );
    }
    renderButton(number) {
      return (
      <button class = 'button is-primary is-size-5 is-rounded' onClick = {() => this.handleClick(number)}>
        Drop
      </button>)
    }
    renderRow(seven, nRow) {
      let newGameButton =
        <div class = 'column has-text-centered'>
          <button class = 'button is-danger' onClick = {() => this.handleClick(8)}>
            New Game
          </button>
        </div>
      let upNext;
      if (this.state.blueIsUp) {
        upNext = <div class = 'column has-text-link  is-size-5 has-text-centered' >Up next: ⬤</div>
      } else {
        upNext = <div class = 'column has-text-danger is-size-5 has-text-centered'> Up next: ⬤</div>
      }
      return (
        <div class = 'columns' >
          <div class = 'column is-1 is-offset-2'>{this.renderSquare(seven[0])}</div>
          <div class = 'column is-1'>{this.renderSquare(seven[1])}</div>
          <div class = 'column is-1'>{this.renderSquare(seven[2])}</div>
          <div class = 'column is-1'>{this.renderSquare(seven[3])}</div>
          <div class = 'column is-1'>{this.renderSquare(seven[4])}</div>
          <div class = 'column is-1'>{this.renderSquare(seven[5])}</div>
          <div class = 'column is-1'>{this.renderSquare(seven[6])}</div>
          {nRow === 3 ? newGameButton: nRow === 4 ? upNext: ''}
        </div>
      )
    }
  
    render() {
      let arr = this.state.squares
      return (
        <div>
        <div class = 'columns'><div class = 'column is-offset-2 is-size-2'>4connect</div></div>
        <div class = 'columns '>
          <div class = 'column is-1 is-offset-2'>{this.renderButton(1)}</div>
          <div class = 'column is-1'>{this.renderButton(2)}</div>
          <div class = 'column is-1'>{this.renderButton(3)}</div>
          <div class = 'column is-1'>{this.renderButton(4)}</div>
          <div class = 'column is-1'>{this.renderButton(5)}</div>
          <div class = 'column is-1'>{this.renderButton(6)}</div>
          <div class = 'column is-1'>{this.renderButton(7)}</div>
        </div>
        <div>
          {this.renderRow(arr.slice(0,7), 1)}
          {this.renderRow(arr.slice(7,14), 2)}
          {this.renderRow(arr.slice(14,21), 3)}
          {this.renderRow(arr.slice(21,28), 4)}
          {this.renderRow(arr.slice(28,35), 5)}
          {this.renderRow(arr.slice(35,42), 6)}
        </div>
        </div>
      );
    }
  }
  
  class Question extends React.Component {
    handleClick(yes) {
      if (yes) {
        if (this.props.first) {
          ReactDOM.render(<Affirmation immunocompromised = {false} />, document.getElementById("root"));
        }
         else {
          ReactDOM.render(<Affirmation immunocompromised = {true} />, document.getElementById("root"));
         }
      } else {
        if (this.props.first) {
          ReactDOM.render(<Question first = {false} />, document.getElementById("root"));
        } else {
          ReactDOM.render(<VaccineShame />, document.getElementById("root"));
        }
      }
    } 
    render() {
      let message;
      if (this.props.first) {
        message = `Have you recieved a vaccine for Covid-19?`
      } else {
        message = `Has a doctor told you not get a Covid-19 vaccine because you are immuncompromoised or have another similar condition?`
      }
      return(
        <div>
        <div class = 'block'>
          <h1 class = "has-text-centered is-size-2">{message}</h1>
        </div>
        <div class = 'columns'>
          <div class = 'column is-1 is-offset-5'>
            <button class = 'button is-success is-large' onClick = {() => this.handleClick(true)} >
              Yes
            </button>
          </div>
          <div class = 'column'>
            <button class = 'button is-danger is-large' onClick = {() => this.handleClick(false)}>
              No
            </button>
          </div>
        </div>
        </div>
      )
    }
  }
class Welcome extends React.Component {
  handleClick(yes) {
    ReactDOM.render(<Question first = {true} />, document.getElementById("root"));
  } 
  render() {
    return (
      <div>
      <div class = 'block'>
        <h1 class = "has-text-centered is-size-1">Welcome to 4connect!</h1>
      </div>
      <div class = 'block'>
        <h1 class = "has-text-centered is-size-2"> </h1>
      </div>
      <div class = 'block'>
        <h1 class = "has-text-centered is-size-2">Before we get started, please fill out a quick survey: </h1>
      </div>
      <div class="level-item has-text-centered">
        <div>
        <button class = 'button is-info is-large' onClick = {() => this.handleClick()} >
          Ok!
        </button>
        </div>
      </div>
      </div>
    )
  }
}

  class VaccineShame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {d: '...', nd: '...'}
  }

  async componentDidMount() {
    const result = await axios({
      method: 'get',
      url: 'https://data.cdc.gov/resource/w9zu-fywh.json',
    });
    const summer = function(accumulator, current_value) {
      accumulator += parseInt(current_value['_1st_dose_allocations']);
      return accumulator
    }
    let doses = result['data']
      .slice(0,63)
      .reduce(summer,0)

    const deathResult = await axios({
      method: 'get',
      url: 'https://corona.lmao.ninja/v2/countries/USA?yesterday&strict&query%20',
    });
    let nDeaths = deathResult['data']['todayDeaths']
    this.setState({d: doses, nd: nDeaths})
  }

  render() {
    return(
      <div>
      <div class = 'block'>
        <h1 class = "has-text-centered is-size-2">US Covid-19 deaths today: {this.state.nd}</h1>
      </div>
      <div class = 'block'>
        <h1 class = "has-text-centered is-size-2">Number of Covid-19 vaccines allocated for distribution in the US this week: {this.state.d}</h1>
      </div>
      <div class = 'block'>
        <h1 class = "has-text-centered is-size-2">Please get a Covid-19 vaccine then return to this website to play 4connect</h1>
      </div>
      <div class = 'block'>
        <h1 class = "has-text-centered is-size-4">
          *For more information on why the Covid-19 vaccines are safe and effective, visit   
           <a href = 'https://www.cdc.gov/coronavirus/2019-ncov/vaccines/safety/safety-of-vaccines.html' target = '_blank' rel="noreferrer"> this website</a> 
        </h1>
      </div>
      </div>
    )
  }
}
class Affirmation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {v: '...'}
  }
  async handleClick(yes) {
    ReactDOM.render(<Board/>, document.getElementById("root"));
  } 

  async componentDidMount() {
    const result = await axios({
      method: 'get',
      url: 'https://disease.sh/v3/covid-19/vaccine/coverage/countries/USA?lastdays=1&fullData=false',
    });
    let nDoses = Object.values(result['data']['timeline'])[0]
    this.setState({v: nDoses})
  }

  render() {
    let message1;
    let message2;
    let message3;
    if (this.props.immunocompromised) {
      message1 = `Well, so far  `
      message2 = ` doses of the Covid-19 vaccine have been administered in the U.S. Hopefully we reach herd immunity soon!`
      message3 = `Until then, please enjoy a game of 4connect with a friend!`
    } else {
      message1 = `Thanks for getting one or two of the `
      message2 = ` doses of Covid-19 vaccines that have been administered in the U.S.!`
      message3 = `As a reward, please enjoy a game of 4connect with a friend.`
    }
    return(
      <div>
      <div class = 'block'>
        <h1 class = "has-text-centered is-size-2">{message1}{this.state.v}{message2}</h1>
      </div>
      <div class = 'block'>
        <h1 class = "has-text-centered is-size-2">{message3}</h1>
      </div>
      <div class="level-item has-text-centered">
        <div>
        <button class = 'button is-info is-large' onClick = {() => this.handleClick()} >
          Ok!
        </button>
        </div>
      </div>
      </div>
    )
  }
}

class End extends React.Component {
  constructor(props) {
    super(props)
    this.state = {url: '...'}
  }
  async handleClick() {
    ReactDOM.render(<Board/>, document.getElementById("root"));
  } 

  async componentDidMount() {
    this.setState({url: await getDogURL()})
  }

  render() {
    let header;
    if (this.props.blue) {
      header  = <div class = 'block is-size-1 has-text-link has-text-centered'>Blue Won!</div>
    } else {
      header  = <div class = 'block is-size-1 has-text-danger has-text-centered'>Red Won!</div>
    }
    return(
      <div>
      {header}
      <div class = 'block'>
        <h1 class = "has-text-centered is-size-5">
          Wow, you got vaccinated and won 4connect? You deserve to look at a picture of an Excellent Dog
        </h1>
      </div>
      <div class = 'block'>
        <figure class = "image">
          <img src = {this.state.url} alt = 'an Excellent Dog'></img>
        </figure>
      </div>
      <div class="level-item has-text-centered">
        <div>
        <button class = 'button is-danger is-large' onClick = {() => this.handleClick()} >
          Play Again
        </button>
        </div>
      </div>
      </div>
    )
  }
}

  // ========================================
  
  //ReactDOM.render(<Question first = {true}/>, document.getElementById("root"));
  ReactDOM.render(<Welcome/>, document.getElementById("root"));

export async function getDogURL() {
    const result = await axios({
        method: 'get',
        url: 'https://api.thedogapi.com/v1/images/search',
      });
    return result['data'][0]['url']
};

function handleDrop(squares, i, blueIsUp) {
  i = i - 1 + 35;
  let isValidMove = false;
  while (i >= 0)  {
    if (squares[i] === 'white') {
      squares[i] = blueIsUp ? 'blue': 'red'
      isValidMove = true;
      break;
    }
    i = i - 7;
  }
  return ([squares, isValidMove])
}

function checkForWinner(squares) {
  checkHorizontal(squares)
  checkVertical(squares)
  checkDiagonal(squares)
}

function checkHorizontal(squares) {
  let i = 0;
  while (i < 40) {
    checkRow(squares.slice(i,i+7), 7)
    i = i + 7
  }
}
function checkRow (arr, n) {
  for (let i = 0; i < n - 3; i++) {
    if (arr[i] === 'white') {
      continue;
    }
    if (arr[i] === arr[i+1] && arr[i] === arr[i+2] && arr[i] === arr[i+3]) {
      arr[i] === 'blue' ? blueWin() : redWin()
    }
  }
}
function checkVertical(squares) {
  for (let i = 0; i < 7; i++) {
    checkRow([squares[i],squares[i+7],squares[i+14],squares[i+21],squares[i+28],squares[i+35]], 6)
  }
}

function checkDiagonal(squares) {
  let brPossibilities = [0,1,2,37,8,9,10,14,15,16,17];
  for (let i = 0; i < brPossibilities.length; i++) {
    checkBottomRight(squares,brPossibilities[i])
  }
  let blPossibilities = [3,4,5,6,10,11,12,13,17,18,19,20]
  for (let i = 0; i < blPossibilities.length; i++) {
    checkBottomLeft(squares,blPossibilities[i])
  }
}

function checkBottomRight(squares,i) {
  if (squares[i] === 'white') {
    return
  }
  let color = squares[i]
  if (color === squares[i+8] && color === squares[i+16] && color === squares[i+24]) {
    color === 'blue' ? blueWin() : redWin()
  }
}

function checkBottomLeft(squares,i) {
  if (squares[i] === 'white') {
    return
  }
  let color = squares[i]
  if (color === squares[i+6] && color === squares[i+12] && color === squares[i+18]) {
    color === 'blue' ? blueWin() : redWin()
  }
}

function blueWin() {
  ReactDOM.render(<End blue = {true}/>, document.getElementById("root"));
}

function redWin() {
  ReactDOM.render(<End blue = {false}/>, document.getElementById("root"));
}