const balance = document.querySelector('#balance');
let money = 0;

// make the user have money instead just so it is more organized.

const user = {
  money: 0,
  multiplier: 2,

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

// Now create the game functionality:

function random() {
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
      console.log(filteredGrid);
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
  }, 500);
}
random();
