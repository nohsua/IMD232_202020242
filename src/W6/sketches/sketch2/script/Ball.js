class Ball {
  constructor(posX, posY, velAngle, velMag, mass, h, s, v) {
    this.pos = createVector(posX, posY);
    this.vel = createVector(1, 0);
    this.vel.rotate(velAngle);
    this.vel.mult(velMag);
    this.acc = createVector();
    this.mass = mass;
    this.rad = this.mass * 5;
    this.color = color(h, s, v);

    const totalObjects = 25;

    const objectsArray = [];

    for (let i = 1; i <= totalObjects; i++) {
      objectsArray.push(`물체 ${i}`);
    }

    for (let i = objectsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [objectsArray[i], objectsArray[j]] = [objectsArray[j], objectsArray[i]];
    }
  }

  applyForce(force) {
    const calcedAcc = p5.Vector.div(force, this.mass);
    // const calcedAcc = force.div(this.mass);
    this.acc.add(calcedAcc);
  }

  update() {
    this.vel.add(this.acc);
    // this.vel.limit(5);
    this.pos.add(this.vel);
    // this.acc.set(0, 0);
    // this.acc.setMag(0);
    this.acc.mult(0);
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }

  isDead() {
    return (
      this.pos.x < -this.rad ||
      this.pos.x > width + this.rad ||
      //  this.pos.y < -this.rad ||
      this.pos.y > height + this.rad
    );
  }
}
