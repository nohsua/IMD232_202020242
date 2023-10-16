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
  background(255);

  const force = p5.Vector.mult(gravity, mover.mass);
  mover.applyForce(force);

  mover.update();
  mover.edgeBounce();
  mover.display();
}

function mouseMoved() {}

function mousePressed() {
  mover.mousePressed(mouseX, mouseY);
}

function mouseDragged() {
  mVec.set(mouseX, mouseY);
  mover.mouseDragged(mVec);
}

function mouseReleased() {
  pMVec.set(pmouseX, pmouseY);
  mVec.set(mouseX, mouseY);

  mover.applyForce(throwingForce);
}
