// Store canvas in Javascript Variable

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Figured out how to make <canvas> responsive down below.

function setUpCanvas() {
  // update dimensions
  canvas.width = canvas.clientWidth; //
  canvas.height = canvas.width;

  return canvas.width;
}

// All the Event Listeners

window.addEventListener('resize', () => {
  // add all the render functions inside this resize event listener.
  //setUpCanvas();
  grid.resize();
  // grid.render();
});

setUpCanvas(); // render the canvas for the first time

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

  c.clearRect(0, 0, setUpCanvas(), setUpCanvas());
  grid.render();
});

canvas.addEventListener('click', (e) => {
  mouse.clickedX = e.layerX;
  mouse.clickedY = e.layerY;
  grid.render();
});

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
          'black' // color
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

  reset: function () {
    mouse.reset();
    for (let s of this.squares) {
      s.color = 'black';
    }
    this.render();
  },

  random: function () {
    let randomSquare =
      grid.squares[Math.floor(Math.random() * grid.squares.length)];
    randomSquare.color = 'white';
    grid.render();
    console.log(randomSquare);
  },
};

grid.create();

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
  this.originalX = this.x;
  this.originalY = this.y;
  this.size = size;
  this.color = color;
  this.dx = 1;
  this.dy = 1;
  this.ds = 1;
  this.draw = () => {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.size, this.size);
    c.fill();
  };
  this.update = () => {
    if (
      mouse.x > this.x &&
      mouse.x < this.x + this.size &&
      mouse.y > this.y &&
      mouse.y < this.y + this.size
    ) {
      if (this.color !== 'rgba(255,255,255,1)') {
        this.color = 'rgba(255,255,255,0.1)'; // light white
      }
    } else if (this.color !== 'rgba(255,255,255,1)') {
      // flawed logic
      this.color = 'rgba(0,0,0,1)';
    }
    if (
      mouse.clickedX > this.x &&
      mouse.clickedX < this.x + this.size &&
      mouse.clickedY > this.y &&
      mouse.clickedY < this.y + this.size
    ) {
      this.color = 'rgba(255,255,255,1)';
    }
    this.draw();
  };

  /* this.fade = function () {
    let intervalId = setInterval(() => {

    })
  }; */
}
