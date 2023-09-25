let x;
let y;
let addX = 1;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('white');
  x = width / 2.0;
  y = height / 2.0;
}
function draw() {
  background('white');
  x += addX;
  ellipse(X, Y, 50);
}
