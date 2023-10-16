let mover;
let gravity;
let mVec;
let pMVec;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  mover = new Mover(width / 2, height / 2, 100);
  gravity = createVector(0, 0.5);

  mVec = createVector();
  pMVec = createVector();

  background(255);
}

function draw() {
  const force = p5.Vector.mult(gravity, mover.mass);

  background(255);
}

function mouseMoved() {}

function mousePressed() {}

function mouseDragged() {}

function mouseReleased() {
  pMVec.set(pmouseX, pmouseY);
  mVec.set(mouseX, mouseY);

  mover.applyForce(throwingForce);
}
