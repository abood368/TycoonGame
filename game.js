const balance = document.querySelector('#balance');
let money = 0;

// make the user have money instead just so it is more organized.

const user = {
  money: 0,
  multiplier: 1,

  // refreshes the score
  // call this function everytime the score changes

  update: function () {
    balance.textContent = `$${this.money}`;
  },

  scored: function () {
    this.money += this.multiplier;
    this.update();
  },

  reset: function () {
    this.money = 0;
    this.update();
  },
};

// function randomize() {
//   let randomIndex = Math.floor(Math.random() * grid.squares.length);
//   let randomSquare = grid.squares[randomIndex];
//   randomSquare.color = 'rgba(255,255,255,1)';
//   grid.render();
// }

// let intervalId = setInterval(() => {
//   grid.clear();
//   randomize();
// }, 1000);

// let randomSquare;

function appear() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      clearCanvas();
      let randomIndex = Math.floor(Math.random() * grid.squares.length);
      randomSquare = grid.squares[randomIndex];
      randomSquare.color = 'rgba(255,255,255,1)';
      grid.render();
      if (randomSquare.color === 'rgba(255,255,255,1)') {
        resolve(randomSquare); // return the square to use it in the promise chain.
      } else {
        reject('There was an error.');
      }
    }, 1000);
  });
}

function disappear(square) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      clearCanvas();
      square.color = 'rgba(0,0,0,1)';
      grid.render();
      if (square.color === 'rgba(0,0,0,1)') {
        resolve('it turned black');
      } else {
        reject('error');
      }
    }, 1000);
  });
}

let gameStart = false;
async function playGame() {
  if (!gameStart) {
    gameStart = true;
    while (gameStart) {
      await appear()
        .then(disappear) // the square gets passed in as a parameter for the disappear function.
        .catch((err) => console.log(err));
    }
    // for (let i = 0; i < 1000; i++) {
    //   await appear()
    //   .then(disappear) // the square gets passed in as a parameter for the disappear function.
    //   .catch((err) => console.log(err));
    // }
  }
}

// playGame();

// Random Squares appearing function Gamemode:

/* function random() {
  let filteredGrid = [];
  let intervalId = setInterval(() => {
    if (!filteredGrid.length) {
      filteredGrid = grid.squares.filter((square) => {
        if (square.color !== 'rgba(255,255,255,1)') {
          return true;
        } else {
          return false;
        }
      });
    } else if (filteredGrid.length) {
      filteredGrid = filteredGrid.filter((square) => {
        if (square.color !== 'rgba(255,255,255,1)') {
          return true;
        } else {
          return false;
        }
      });
    }

    if (filteredGrid.length) {
      let randomIndex = Math.floor(Math.random() * filteredGrid.length);
      filteredGrid[randomIndex].color = 'rgba(255,255,255,1)';
      filteredGrid[randomIndex].draw();
    }
  }, 1000);
}
random(); */
