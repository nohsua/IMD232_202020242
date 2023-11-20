let aDrunkenObj;
let trace = [];

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  aDrunkenObj = new Drunken(width / 2, height / 2);

  background('white');
}

function draw() {
  const randomForce = p5.Vector.random2D();
  randomForce.mult(1);
  aDrunkenObj.applyForce(randomForce);
  aDrunkenObj.update();
  aDrunkenObj.infiniteEdge();

  trace.push([aDrunkenObj.pos.x, aDrunkenObj.pos.y]);

  if (aDrunkenObj.isCrossed) {
    background('red');
  } else {
    background('white');
  }

  beginShape();
  for (let idx = 0; idx < trace.length; idx++) {
    const point = trace[idx];
    vertex(point[0], point[1]);
  }
  endShape();
  aDrunkenObj.display();

  console.log(trace);
}
