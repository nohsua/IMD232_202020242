function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('white');
  noStroke();
}

function draw() {
  background('	#6495ED');
  rectMode(CORNER);
  fill(255);
  colorMode(RGB);
  stroke(0);
  strokeWeight(0);

  rectMode(CENTER);
  fill('lightsalmon');
  rect(100, 150, 100, 200, 4);
  fill('#191970');
  rect(100, 50, 100, 6, 5);
  fill('#191970');
  rect(100, 150, 100, 6, 5);
  fill('#191970');
  rect(100, 250, 100, 6, 5);
  fill('#191970');
  rect(52, 150, 6, 205, 5);
  fill('#191970');
  rect(148, 150, 6, 205, 5);

  fill('#191970');
  rect(300, 345, 850, 40);

  fill('#C0C0C0');
  rect(350, 289, 30, 103, 10);
  fill('#C0C0C0');
  rect(350, 335, 120, 10, 10);
  fill('#32CD32');
  rect(350, 240, 200, 10, 10);

  fill('lightgray');
  rect(190, 310, 10, 60, 2);
  fill('lightgray');
  rect(250, 310, 10, 60, 2);
  fill('lightgray');
  rect(470, 310, 10, 60, 2);
  fill('lightgray');
  rect(530, 310, 10, 60, 2);
  fill('#90EE90');
  rect(500, 280, 80, 10, 10);
  fill('#90EE90');
  rect(220, 280, 80, 10, 10);

  fill('lightgray');
  rect(350, 30, 6, 150, 10);
  fill('#FFFACD');
  ellipse(350, 105, 60, 50);
  fill('#FF6347');
  rect(350, 90, 100, 50, 3);

  fill('#FFFFE0');
  rect(585, 150, 200, 100, 3);
  fill('#F08080');
  rect(585, 150, 185, 85, 3);
}
