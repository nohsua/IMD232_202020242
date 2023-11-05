let traffic;
let infiniteOffset = 80;

function setup() {
  // Canvas 설정
  setCanvasContainer('canvas', 3, 2, true);
  colorMode(HSL, 360, 100, 100, 100);
  background('white');

  // Traffic 객체 생성과 초기 Vehicle 추가
  traffic = new Traffic();
  for (let n = 0; n < 10; n++) {
    traffic.addVehicle(random(width), random(height));
  }
}

function draw() {
  // 화면을 계속 갱신하며 Traffic 객체 실행
  background('white');
  traffic.run();
}

function mouseDragged() {
  // 마우스를 드래그할 때마다 새로운 Vehicle 추가
  traffic.addVehicle(mouseX, mouseY);
}
