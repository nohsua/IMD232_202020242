// 상단의 막대기를 위한 용수철(spring) 그리기
let springHeight1 = 16;
let springHeight2 = 24;
let springHeight3 = 32;
let left1, right1, left2, right2, left3, right3;

// let springHeight = 32,
//   left,
//   right,
//   maxHeight = 200,
//   minHeight = 100,
//   over = false,
//   move = false;

// 용수철 시뮬레이션 상수들
let M = 0.8, // Mass(질량)
  K = 0.2, // 용수철(spring) 상수
  D = 0.92, // Damping(감쇠)
  R = 140; // Rest Position(놓인 위치)

// 용수철 시뮬레이션 변수들
let ps = R, // 위치
  vs = 0.0, // 속도
  as = 0, // 가속도
  f = 0; // 힘

function setup() {
  createCanvas(500, 600);
  rectMode(CORNERS);
  noStroke();
  updateSpringVariables(); // 초기 변수 설정 함수 호출
}

function draw() {
  background('lightyellow');
  updateSpring();
  drawSpring();
}

function drawSpring() {
  // 바탕 그리기
  fill(0.2);
  let baseWidth = 0.5 * ps + -8;
  rect(
    width / 2 - baseWidth,
    ps + springHeight3,
    width / 2 + baseWidth,
    height
  );

  // 첫 번째 용수철 그리기
  fill('orange');
  rect(left1, ps, right1, ps + springHeight1);

  // 두 번째 용수철 그리기
  fill('orange');
  rect(left2, ps + springHeight1, right2, ps + springHeight1 + springHeight2);

  // 세 번째 용수철 그리기
  fill('orange');
  rect(
    left3,
    ps + springHeight1 + springHeight2,
    right3,
    ps + springHeight1 + springHeight2 + springHeight3
  );
}

function updateSpring() {
  // 용수철(spring) 위치 업데이트
  if (!move) {
    f = -K * (ps - R); // f=-ky
    as = f / M; // 가속도 설정, f=ma == a=f/m
    vs = D * (vs + as); // 속도 설정
    ps = ps + vs; // 업데이트된 위치
  }

  if (abs(vs) < 0.1) {
    vs = 0.0;
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
}

function mousePressed() {
  if (COVER) {
    move = true;
  }
}

function mouseReleased() {
  move = false;
}

// 추가: 변수들을 초기화하고 창 크기에 맞게 설정하는 함수
function updateSpringVariables() {
  left1 = width / 2 - 100;
  right1 = width / 2 + 100;

  left2 = width / 2 - 90; // 두 번째 용수철 좌측 시작 위치
  right2 = width / 2 + 90; // 두 번째 용수철 우측 끝 위치

  left3 = width / 2 - 80; // 세 번째 용수철 좌측 시작 위치
  right3 = width / 2 + 80; // 세 번째 용수철 우측 끝 위치
}
