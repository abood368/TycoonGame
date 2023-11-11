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
setUpCanvas(); // render the canvas for the first time

// All the Event Listeners

window.addEventListener('resize', () => {
  // grid.resize();
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

// ELEMENTS IN CANVAS

function Square(x, y, size, color = 'rgba(0,0,0,1)') {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;

  this.clicked = false;
  this.draw = () => {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.size, this.size);
    c.fill();
  };

  this.update = () => {
    if (
      mouse.clickedX > this.x &&
      mouse.clickedX < this.x + this.size &&
      mouse.clickedY > this.y &&
      mouse.clickedY < this.y + this.size
    ) {
      if (this.color === 'rgba(255,255,255,1)' || this.color === 'white') {
        if (!this.clicked) {
          user.scored();
          this.color = 'rgba(0,0,0,1)';
          mouse.reset();
        }
      }
    }
    this.draw();
  };
}

function clearCanvas() {
  c.clearRect(0, 0, setUpCanvas(), setUpCanvas());
}

// hello, this is from the laptop
