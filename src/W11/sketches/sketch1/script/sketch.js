let cam;

function setup() {
  //   setCanvasContainer('canvas', 3, 2, true);
  //   createCanvas(800, 300);
  cam = createCapture(VIDEO);
  //   cam.size(320, 480);
  cam.hide();
}

function draw() {
  background('white');
  image(cam, 0, 0, cam.width / width, height);
  cam.loadPixels();
  console.log('width', cam.width);
  console.log('height', cam.height);
  console.log('pixel', cam.pixels[0]);
  for (let y = 0; y < cam.height; y++) {
    for (let x = 0; x < cam.width; x++) {
      const idx = cam.width * y + x;
      //   cam.pixels[idx];
      const color = cam.pixels[idx];
      const brightness = brightness(color);
      ellipse(x, y, (brightness / 255) * 20);
    }
  }
}
