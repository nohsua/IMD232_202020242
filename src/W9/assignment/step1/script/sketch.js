const {
  Engine,
  Render,
  Runner,
  Body,
  Composite,
  Composites,
  Constraint,
  MouseConstraint,
  Mouse,
  Bodies,
  Common,
  Vertices,
} = Matter;

Common.setDecomp(decomp);

// create engine
const engine = Engine.create(),
  world = engine.world;

// create runner
const runner = Runner.create();

const oWidth = 800;
const oHeight = 600;

let ropeA;
let ropeB;
let ropeC;

let m;
let mc;

function setup() {
  setCanvasContainer('canvas', oWidth, oHeight, true);

  // add bodies
  group = Body.nextGroup(true);

  ropeA = Composites.stack(100, 50, 8, 1, 10, 10, function (x, y) {
    return Bodies.rectangle(x, y, 50, 20, {
      collisionFilter: { group: group },
    });
  });

  Composites.chain(ropeA, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2,
    render: { type: 'line' },
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

  group = Body.nextGroup(true);

  ropeB = Composites.stack(350, 50, 10, 1, 10, 10, function (x, y) {
    return Bodies.circle(x, y, 20, { collisionFilter: { group: group } });
  });

  Composites.chain(ropeB, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2,
    render: { type: 'line' },
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

  group = Body.nextGroup(true);

  ropeC = Composites.stack(600, 50, 13, 1, 10, 10, function (x, y) {
    return Bodies.rectangle(x - 20, y, 50, 20, {
      collisionFilter: { group: group },
      chamfer: 5,
    });
  });

  Composites.chain(ropeC, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });

  Composite.add(
    ropeC,
    Constraint.create({
      bodyB: ropeC.bodies[0],
      pointB: { x: -20, y: 0 },
      pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  m = Mouse.create(document.querySelector('.p5Canvas'));
  m.pixelRatio = (pixelDensity() * width) / oWidth;
  mc = MouseConstraint.create(engine, {
    mouse: m,
    constraint: {
      stiffness: 0.2,
    },
  });

  background('white');
  Composite.add(world, mc);

  Runner.run(runner, engine);
}

function draw() {
  m.pixelRatio = (pixelDensity() * width) / oWidth;
  background('white');

  ropeA.bodies.forEach((eachBody) => {
    beginShape();
    eachBody.vertices.forEach((each) => {
      vertex((each.x / oWidth) * width, (each.y / oHeight) * height);
    });
    endShape(CLOSE);
  });

  ropeB.bodies.forEach((eachBody) => {
    beginShape();
    eachBody.vertices.forEach((each) => {
      vertex((each.x / oWidth) * width, (each.y / oHeight) * height);
    });
    endShape(CLOSE);
  });

  ropeC.bodies.forEach((eachBody) => {
    beginShape();
    eachBody.vertices.forEach((each) => {
      vertex((each.x / oWidth) * width, (each.y / oHeight) * height);
    });
    endShape(CLOSE);
  });
}
