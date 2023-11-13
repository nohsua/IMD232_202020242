var {
  Engine,
  Render,
  Runner,
  Body,
  Composite,
  Composites,
  Constraint,
  MouseConstraint,
  Mouse,
  Vertices,
  Svg,
  Bodies,
} = Matter;

// 엔진 만들기
var engine = Engine.create(),
  world = engine.world;

// 러너 만들기
var runner = Runner.create();

let ropeA, ropeB, ropeC;

const A = [];
const C = [];

let oWidth, oHeight;

function setup() {
  oWidth = 800;
  oHeight = 600;

  setCanvasContainer('canvas', oWidth, oHeight, true);

  for (let i = 0; i < 10; i++) {
    A[i] = random(100, 200);
    C[i] = random(200, 300);
  }

  // add bodies
  ropeA = Composites.stack(width / 4, 50, 8, 1, 10, 10, function (x, y) {
    return Bodies.rectangle(x, y, 50, 20);
  });

  Composites.chain(ropeA, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2,
  });

  Composite.add(
    ropeA,
    Constraint.create({
      bodyB: ropeA.bodies[0],
      pointB: { x: -25, y: 0 },
      pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  ropeB = Composites.stack(width / 2, 50, 10, 1, 10, 10, function (x, y) {
    return Bodies.circle(x, y, 20);
  });

  Composites.chain(ropeB, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2,
  });

  Composite.add(
    ropeB,
    Constraint.create({
      bodyB: ropeB.bodies[0],
      pointB: { x: -20, y: 0 },
      pointA: { x: ropeB.bodies[0].position.x, y: ropeB.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  ropeC = Composites.stack((width * 3) / 4, 50, 8, 1, 10, 10, function (x, y) {
    return Bodies.rectangle(x, y, 50, 20);
  });

  Composites.chain(ropeC, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2,
  });

  Composite.add(
    ropeC,
    Constraint.create({
      bodyB: ropeC.bodies[0],
      pointB: { x: -25, y: 0 },
      pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  // add mouse control
  let mouse = Mouse.create(document.querySelector('.p5Canvas'));
  mouse.pixelRatio = (pixelDensity() * width) / oWidth;
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
    },
  });

  Composite.add(world, [mouseConstraint, ropeA, ropeB, ropeC]);

  background('white');
  Runner.run(runner, engine);
}

const vertices = [
  { x: 5.5 * 4, y: -4.8 * 4 },
  { x: 7.6 * 4, y: -1.6 * 4 },
  { x: 6.5 * 4, y: 1.8 * 4 },
  { x: 2.7 * 4, y: 4.5 * 4 },
  { x: -1.2 * 4, y: 4.2 * 4 },
  { x: -3.6 * 4, y: 1.9 * 4 },
  { x: -1.3 * 4, y: -2.8 * 4 },
];

function draw() {
  background('white');
  rectMode(CENTER);
  noStroke();

  // ropeA에 도형 그리기
  fill(255, 51, 0);
  for (let i = 0; i < ropeA.bodies.length; i++) {
    const pos = ropeA.bodies[i].position;
    const angle = ropeA.bodies[i].angle;
    push();
    beginShape();
    translate(pos.x, pos.y);
    rotate(angle);
    vertices.forEach((each) => {
      vertex(each.x, each.y);
    });
    endShape(CLOSE);
    pop();
  }

  // ropeB에 도형 그리기
  fill(102, 102, 255);
  for (let i = 0; i < ropeB.bodies.length; i++) {
    const pos = ropeB.bodies[i].position;
    circle(pos.x, pos.y, width / 25);
  }

  // ropeC에 도형 그리기
  fill(0, 204, 51);
  for (let i = 0; i < ropeC.bodies.length; i++) {
    const pos = ropeC.bodies[i].position;
    const angle = ropeC.bodies[i].angle;
    push();
    beginShape();
    translate(pos.x, pos.y);
    rotate(angle);
    vertices.forEach((each) => {
      vertex(each.x, each.y);
    });
    endShape(CLOSE);
    pop();
  }
}
