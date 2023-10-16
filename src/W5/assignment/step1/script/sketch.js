const stripeNum = 8;
const stripeNum2 = 8;
const stripeBegin = 5;
const stripeGap = 20;

let gridC;
let gridR;
let angleBegin = 0;
let angleBeginVel;
let angleStep;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  let angleBeginVel = (TAU / 360) * 15;

  colorMode(HSL, 360, 100, 100, 100);
  background(360, 0, 100);
}

function draw() {
  background(360, 0, 100);

  for (let a = 0; a < stripeNum; a++) {
    for (let b = 0; b < stripeNum2; b++) {
      let x = ((a + 1) * width) / (stripeNum + 1);
      let y = ((b + 1) * height) / (stripeNum2 + 1);
      ellipse(x, y, 50);
    }
  }
}

for (let r = 0; r < rNum; r++) {
  for (let c = 0; r < rNum; r++) {
    push();
    translate();
    rotate(angleBegin);
    line(0, 0);
    ellipse(0, 0);
    pop();
  }

  angleBegin += angleBeginVel;
}
