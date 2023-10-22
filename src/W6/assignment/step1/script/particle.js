class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-5, 5), random(-10, -1));
    this.rotationSpeed = random(-0.1, 0.1);
    this.sideLength = 20;
  }

  applyForce(force) {
    this.velocity.add(force);
  }

  update() {
    this.position.add(this.velocity);

    this.position.rotate(this.rotationSpeed);
  }

  display() {
    rect(this.position.x, this.position.y, this.sideLength, this.sideLength);
  }

  isdead() {
    return (
      this.position.x < 0 ||
      this.position.x > width ||
      this.position.y < 0 ||
      this.position.y > height
    );
  }
}

function mousePressed() {
  emitter.particles.push(new Particle(width / 2, 0));
}
