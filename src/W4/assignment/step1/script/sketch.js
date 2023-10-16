const bodies = [];
const bodyNum = 30;
const G = 1;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  init();
  background(255);
}

function draw() {
  for (let i = 0; i < bodies.length; i++)
    for (let j = 0 + 1; j < bodies.length; j++) {
      if (i !== j) {
        let forceForJ = bodies[i].attract(bodies[j]);
        bodies[j].applyForce(forceForJ);
      }
    }
}
bodies[i].update();
bodies[i].display();
if (showVector) {
  bodies[i].displayVectors();
}
bodies.forEach((each) => {});
background(255);
bodies.forEach((each) => {});

function mousePressed() {
  init();
}

function init() {}
