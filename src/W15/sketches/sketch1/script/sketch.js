// 상단의 막대기를 위한 용수철(spring) 그리기
let springHeight1 = 16;
let springHeight2 = 24;
let springHeight3 = 32;
let left1, right1, left2, right2, left3, right3;
let baseHeight1, baseHeight2, baseHeight3; // 각 용수철의 기둥 위치
let spacing = 20; // 각 용수철 간격

// 기둥의 초기 위치
let base1Initial, base2Initial, base3Initial;

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

  // 기둥 그리기
  fill(0);
  rect(left1 - 10, baseHeight1, right1 + 10, height);
  rect(left2 - 10, baseHeight2, right2 + 10, height);
  rect(left3 - 10, baseHeight3, right3 + 10, height);

  // 첫 번째 용수철 그리기
  fill('orange');
  rect(left1, baseHeight1, right1, baseHeight1 + springHeight1);

  // 두 번째 용수철 그리기
  fill('orange');
  rect(
    left2,
    baseHeight2 + spacing,
    right2,
    baseHeight2 + springHeight2 + spacing
  );

  // 세 번째 용수철 그리기
  fill('orange');
  rect(
    left3,
    baseHeight3 + 2 * spacing,
    right3,
    baseHeight3 + springHeight3 + 2 * spacing
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

  // 용수철과 기둥 위치 업데이트
  baseHeight1 = base1Initial + sin(frameCount * 0.05) * 20;
  baseHeight2 = base2Initial + sin(frameCount * 0.05) * 20;
  baseHeight3 = base3Initial + sin(frameCount * 0.05) * 20;

  // 마우스가 상단 막대기 위에 있는지 여부 테스트
  if (
    mouseX > left1 &&
    mouseX < right1 &&
    mouseY > baseHeight1 &&
    mouseY < baseHeight1 + springHeight1
  ) {
    over = true;
  } else {
    over = false;
  }

  // 상단 막대기의 위치 설정 및 제한
  if (move) {
    ps = mouseY - springHeight1 / 2;
    ps = constrain(ps, baseHeight1 + minHeight, baseHeight1 + maxHeight);
  }
}

// 추가: 변수들을 초기화하고 창 크기에 맞게 설정하는 함수
function updateSpringVariables() {
  left1 = width / 4 - 50;
  right1 = width / 4 + 50;
  baseHeight1 = height / 2;

  left2 = width / 2 - 50;
  right2 = width / 2 + 50;
  baseHeight2 = height / 2;

  left3 = (3 * width) / 4 - 50;
  right3 = (3 * width) / 4 + 50;
  baseHeight3 = height / 2;

  // 각각의 용수철 높이 설정
  springHeight1 = 16;
  springHeight2 = 24;
  springHeight3 = 32;

  minHeight = 50;
  maxHeight = height - 50;
}

function updateSpring() {
  // 용수철(spring) 위치 업데이트
  if (!MOVE) {
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
    mouseX > left1 &&
    mouseX < right1 &&
    mouseY > ps &&
    mouseY < ps + springHeight1
  ) {
    over = true;
  } else {
    over = false;
  }

  // 상단 막대기의 위치 설정 및 제한
  if (MOVE) {
    ps = mouseY - springHeight1 / 2;
    ps = constrain(ps, minHeight, maxHeight);
  }
}
