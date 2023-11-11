const balance = document.querySelector('#balance');
let money = 0;

// make the user have money instead just so it is more organized.

const shapes = {
  list: [],
  isClicked: function () {
    for (let shape of this.list) {
      if (
        mouse.clickedX > shape.x &&
        mouse.clickedX < shape.x + shape.size &&
        mouse.clickedY > shape.y &&
        mouse.clickedY < shape.y + shape.size
      ) {
        if (shape.color === 'rgba(255,255,255,1)' || shape.color === 'white') {
          if (!shape.clicked) {
            user.scored();
            shape.color = 'rgba(0,0,0,1)';
            shape.draw();
            mouse.reset();
          }
        }
      }
    }
  },

  isMouseOver: function () {
    for (let shape of this.list) {
      if (
        mouse.x > shape.x &&
        mouse.x < shape.x + shape.size &&
        mouse.y > shape.y &&
        mouse.y < shape.y + shape.size
      ) {
        if (shape.color === 'rgba(255,255,255,1)' || shape.color === 'white') {
          if (!shape.clicked) {
            user.scored();
            shape.color = 'rgba(0,0,0,1)';
            shape.draw();
            mouse.reset();
          }
        }
      }
    }
  },
};

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.layerX;
  mouse.y = event.layerY;
  shapes.isMouseOver();
});

canvas.addEventListener('click', (e) => {
  mouse.clickedX = e.layerX;
  mouse.clickedY = e.layerY;
  // shapes.isClicked();
});

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

let squareSize = canvas.width / 6; // 6 refers to how many squares can fit in one row / column, you can change that as a variable.

function appear() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      clearCanvas();
      let randomX = Math.random() * (setUpCanvas() - squareSize);
      let randomY = Math.random() * (setUpCanvas() - squareSize);
      let square = new Square(
        randomX,
        randomY,
        squareSize,
        'rgba(255,255,255,1)'
      );
      shapes.list.push(square);
      square.draw();
      console.log(square.color === 'rgba(255,255,255,1)');
      if (square.color === 'rgba(255,255,255,1)') {
        resolve(square); // return the square to use it in the promise chain.
      } else {
        reject('There was an error.');
      }
    }, 1000); // can replace with a speed variable
  });
}

function disappear(square) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      clearCanvas();
      shapes.list.pop();
      square.color = 'rgba(0,0,0,1)';
      square.draw();
      if (square.color === 'rgba(0,0,0,1)') {
        resolve('It turned black');
      } else {
        reject('error');
      }
    }, 1000); // can replace with a speed variable
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
  }
}

function endGame() {
  gameStart = false;
  user.reset();
}
