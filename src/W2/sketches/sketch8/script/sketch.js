function setup() {
  setCanvasContainer('canvas-goes-here', 400, 300, true);
  background('#ff7733');
}

function draw() {
  background('#ff7733');
  circle(mouseX, mouseY, width * 0.1);
}
