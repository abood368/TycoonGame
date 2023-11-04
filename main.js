// Store canvas in Javascript Variable

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const balance = document.querySelector('#balance');
let money = 0;

// Figured out how to make <canvas> responsive down below.

function setUpCanvas() {
  // update dimensions
  canvas.width = canvas.clientWidth; //
  canvas.height = canvas.width;

  return canvas.width;
}
setUpCanvas(); // render the canvas for the first time

// All the Event Listeners

window.addEventListener('resize', () => {
  grid.resize();
});

const mouse = {
  // track the mouse postions for interactivity
  x: undefined,
  y: undefined,
  clickedX: undefined,
  clickedY: undefined,
  reset: function () {
    this.x = undefined;
    this.y = undefined;
    this.clickedX = undefined;
    this.clickedY = undefined;
  },
};
canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.layerX;
  mouse.y = event.layerY;

  grid.highlight();
});

canvas.addEventListener('click', (e) => {
  mouse.clickedX = e.layerX;
  mouse.clickedY = e.layerY;
  grid.render();
}); // can we add this to each individual square? (no I tried lol)

const grid = {
  size: 10,
  squares: [],
  squareSize: () => {
    setUpCanvas(); // This ensures that the square size is relative to the current canvas size.
    let ss = canvas.width / grid.size;
    return ss;
  },

  // Creates the layout of the board and stores it in the squares array.

  create: function () {
    for (let i = 0; i < this.size; i++) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        let s = new Square(
          j * this.squareSize(), // x
          i * this.squareSize(), // y
          this.squareSize(), //  size
          'rgba(0,0,0,1)' // color
        );
        this.squares.push(s);
      }
    }
    this.render();
  },

  // Renders the squares created inside the squares array
  // always call this function below when any changes are made to a square.

  render: function () {
    for (let s of this.squares) {
      s.update();
    }
  },

  highlight: function () {
    for (let s of this.squares) {
      s.highlight();
    }
  },

  // resizes the squares and positions them accordingly.

  resize: function () {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const index = i * this.size + j;
        this.squares[index].x = j * this.squareSize();
        this.squares[index].y = i * this.squareSize();
      }
    }
    for (let s of this.squares) {
      s.size = this.squareSize();
    }

    this.render();
  },

  // resets the color or anything else back to it's original.

  random: function () {
    for (let i = 0; i < 10; i++) {
      let randomSquare =
        grid.squares[Math.floor(Math.random() * grid.squares.length)];
      randomSquare.color = 'rgba(255,255,255,1)';
      randomSquare.draw();
    }
  },

  // Resets everything

  reset: function () {
    mouse.reset(); // reset the mouse position so that the last square does not stay white.
    money = 0;
    balance.textContent = `$${money}`;
    for (let s of this.squares) {
      s.color = 'rgba(0,0,0,1)';
    }
    this.render();
    this.render();
  },
};

grid.create();
grid.random();

function playGame() {
  grid.reset(); // this should be grid.reset()
  let intervalId = setInterval(() => {
    let randomSquare =
      grid.squares[Math.floor(Math.random() * grid.squares.length)]; // get a random square and change its color.
    randomSquare.fade();
  }, 2000);
}

// ELEMENTS IN CANVAS

function Square(x, y, size, color) {
  this.x = x;
  this.y = y;
  // this.originalX = this.x;
  // this.originalY = this.y;
  this.size = size;
  this.color = color;
  // this.dx = 1;
  // this.dy = 1;
  // this.ds = 1;
  this.draw = () => {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.size, this.size);
    c.fill();
  };

  this.highlight = function () {
    // Set a new highlight function, that only highlights on square at a time, and does not need to clear the canvas each time.
    if (
      mouse.x > this.x &&
      mouse.x < this.x + this.size &&
      mouse.y > this.y &&
      mouse.y < this.y + this.size
    ) {
      if (this.color === 'rgba(0,0,0,1)' || this.color === 'black') {
        this.color = 'rgba(255,255,255,0.1)'; // light white
      }
    } else if (this.color === 'rgba(255,255,255,0.1)') {
      this.color = 'rgba(0,0,0,1)';
    }
    this.draw();
  };
  this.update = () => {
    // split the update function to multiple functions, each having a different purpose. Having everything in one function makes the logic hard to track the problem with this function is that you can't modify the colors of the squares at all when you are drawing out the squares later.

    if (
      mouse.clickedX > this.x &&
      mouse.clickedX < this.x + this.size &&
      mouse.clickedY > this.y &&
      mouse.clickedY < this.y + this.size &&
      this.color !== 'rgba(255,255,255,1'
    ) {
      this.color = 'rgba(255,255,255,1';
      money++;
      balance.textContent = `$${money}`;
      // mouse.clickedX = undefined;
      // mouse.clickedY = undefined;
    }
    this.draw();
  };
}
