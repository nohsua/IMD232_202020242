let engine;
let world;
let ropeA;
let ropeB;
let ropeC;
let mouseConstraint;

function setup() {
  createCanvas(800, 600);

  // Initialize Matter.js
  engine = Matter.Engine.create();
  world = engine.world;

  // Create ropes
  ropeA = createRope(100, 50, 8, 1, 10, 10, 50, 20, -25);
  ropeB = createRope(350, 50, 10, 1, 10, 10, 20);
  ropeC = createRope(
    600,
    50,
    13,
    1,
    10,
    10,
    50,
    20,
    -20,
    0,
    0.3,
    0,
    -0.3,
    0,
    1,
    0,
    -20,
    0,
    0.5
  );

  // Add static ground
  let ground = Matter.Bodies.rectangle(400, 600, 1200, 50.5, {
    isStatic: true,
  });
  Matter.World.add(world, [ropeA, ropeB, ropeC, ground]);

  // Setup mouse control
  let mouse = Matter.Mouse.create(canvas.elt),
    mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

  Matter.World.add(world, mouseConstraint);
}

function draw() {
  background(255);
  Matter.Engine.update(engine);

  // Draw ropes
  drawRope(ropeA);
  drawRope(ropeB);
  drawRope(ropeC);
}

function drawRope(rope) {
  for (let i = 1; i < rope.bodies.length; i++) {
    let bodyA = rope.bodies[i - 1];
    let bodyB = rope.bodies[i];

    stroke(0);
    strokeWeight(2);
    line(
      bodyA.position.x,
      bodyA.position.y,
      bodyB.position.x,
      bodyB.position.y
    );
  }
}

function createRope(x, y, numBodies, bodyWidth, spacingX, spacingY, ...params) {
  let group = Matter.Body.nextGroup(true);
  let rope = Matter.Composites.stack(
    x,
    y,
    numBodies,
    1,
    spacingX,
    spacingY,
    function (x, y) {
      return Matter.Bodies.rectangle(x, y, bodyWidth, 20, {
        collisionFilter: { group: group },
      });
    }
  );

  Matter.Composites.chain(rope, ...params);

  return rope;
}
