let emitter;
let gravity;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);
  rectMode(CENTER);
  colorMode(HSL, 360, 100, 100, 100);
  emitter = new Emitter(width / 2, height / 2);
  gravity = createVector(0, 0.25);
  background(360, 0, 100);
}

function draw() {
  console.log('Particle Count:', emitter.particles.length);

  background(360, 0, 100);
  emitter.applyForce(gravity);
  emitter.update();
  emitter.display();
  emitter.isdead();
}
