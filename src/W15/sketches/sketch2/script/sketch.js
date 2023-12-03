// 상단의 막대기를 위한 용수철(spring) 그리기
let springHeight = 32,
  left,
  right,
  maxHeight = 200,
  minHeight = 100,
  over = false,
  move = false,
  firstBounce = false; // 첫 번째 튕김 여부

// 용수철 시뮬레이션 상수들
let M = 0.8, // Mass(질량)
  K = 0.2, // 용수철(spring) 상수
  D = 0.92, // Damping(감쇠)
  R = 150; // Rest Position(놓인 위치)

// 용수철 시뮬레이션 변수들
let ps = R, // 위치
  vs = 0.0, // 속도
  as = 0, // 가속도
  f = 0; // 힘

// 추가: 튕기는 원 배열
let circles = [];

function setup() {
  createCanvas(500, 600);
  rectMode(CORNERS);
  noStroke();
  left = width / 2 - 100;
  right = width / 2 + 100;
}

function draw() {
  background('lightyellow');
  updateSpring();
  drawSpring();
  if (firstBounce) {
    drawCircles();
  }
}

function drawSpring() {
  // 바탕 그리기
  fill(0.2);
  let baseWidth = 0.5 * ps + -8;
  rect(width / 2 - baseWidth, ps + springHeight, width / 2 + baseWidth, height);

  // 상단 막대기의 색상 설정하고 그리기
  if (over || move) {
    fill('orange');
  } else {
    fill('orange');
  }

  rect(left, ps, right, ps + springHeight);
}

// 추가: 튕기는 원 그리기 함수
function drawCircles() {
  fill('skyblue');
  for (let circle of circles) {
    ellipse(circle.x, circle.y, circle.size, circle.size);
  }
}

function updateSpring() {
  // 용수철(spring) 위치 업데이트
  if (!move) {
    f = -K * (ps - R); // f=-ky
    as = f / M; // 가속도 설정, f=ma == a=f/m
    vs = D * (vs + as); // 속도 설정
    ps = ps + vs; // 업데이트된 위치
  }

  // 추가: 튕기는 원 생성 조건 추가 (첫 번째 튕김 이후에만)
  if (abs(vs) < 0.1 && !move && firstBounce) {
    vs = -vs; // 튕겨 올라가도록 방향 변경

    // 추가: 튕기는 원 추가
    let size = random(10, 30);
    let angle = random(-PI / 4, PI / 4); // 무작위 각도 (-45도에서 45도 사이)
    let speed = random(2, 5); // 무작위 속도
    let x = width / 2 + cos(angle) * size;
    let y = ps - springHeight / 2 - sin(angle) * size;

    circles.push({ x, y, size, speed });
  }

  // 추가: 튕기는 원의 위치 업데이트
  for (let i = circles.length - 1; i >= 0; i--) {
    let circle = circles[i];
    circle.y += circle.speed;

    // 튕긴 원이 화면 바닥에 닿으면 위치 조정
    if (circle.y + circle.size / 2 > height) {
      circle.y = height - circle.size / 2;
      circle.speed = 0; // 원이 멈추도록 속도를 0으로 설정
    }
  }

  // 마우스가 상단 막대기 위에 있는지 여부 테스트
  if (
    mouseX > left &&
    mouseX < right &&
    mouseY > ps &&
    mouseY < ps + springHeight
  ) {
    over = true;
  } else {
    over = false;
  }

  // 상단 막대기의 위치 설정 및 제한
  if (move) {
    ps = mouseY - springHeight / 2;
    ps = constrain(ps, minHeight, maxHeight);
  }

  // 추가: 첫 번째 튕김 확인
  if (!firstBounce && abs(vs) < 0.1 && move) {
    firstBounce = true;
  }
}

function mousePressed() {
  if (over) {
    move = true;
  }
}

function mouseReleased() {
  move = false;
}
