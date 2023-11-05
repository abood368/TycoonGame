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
  let intervalId = setInterval(() => {
    let randomSquare =
      grid.squares[Math.floor(Math.random() * grid.squares.length)];
    randomSquare.color = 'rgba(255,255,255,1)';
    randomSquare.draw();
  }, 1000);
}

for (let i = 0; i < 10; i++) {
  let randomSquare =
    grid.squares[Math.floor(Math.random() * grid.squares.length)];
  randomSquare.color = 'rgba(255,255,255,1)';
  randomSquare.draw();
}
