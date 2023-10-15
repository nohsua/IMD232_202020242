const stripeNum = 8;
const stripeNum2 = 8;
const stripeBegin = 5;
const stripeGap = 10;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  background(255);
}

function draw() {
  background(255);

  // for (let a = 0; a < stripeNum; a++) {
  //  const rectWidth = width / (stripeNum + stripeNum + 1);
  //  const rectX = (width / (stripeNum + stripeNum + 1)) * (2 * a + 1);
  //  rect(rectX, 0, rectWidth, height);
  //}
  //for (let a = 0; a < stripeNum; a++) {
  //  const rectHeight = height / (stripeNum + stripeNum + 1);
  //  const rectY = (height / (stripeNum + stripeNum + 1)) * (2 * a + 1);
  //  rect(0, rectY, width, rectHeight);
  //}

  for (let a = 0; a < stripeNum; a++) {
    for (let b = 0; b < stripeNum2; b++) {
      let x = ((a + 1) * width) / (stripeNum + 1);
      let y = ((b + 1) * height) / (stripeNum2 + 1);
      ellipse(x, y, 80);
    }
  }
}
