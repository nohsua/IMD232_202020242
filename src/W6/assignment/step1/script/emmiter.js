class Emitter {
  constructor(emittingPosX, emittingPosY) {
    this.emittingPos = createVector(emittingPosX, emittingPosY);
    this.particles = [];
  }
  createparticles() {
    this.particles.push(
      new particles(
        this.emittingPos.x,
        this.emittingPos.y,
        (TAU / 360) * -90 + random((TAU / 360) * -30, (TAU / 360) * 30),
        random(2, 15),
        random(1, 5),
        random(360),
        100,
        50
      )
    );
  }

  applyGravity(gravity) {
    this.particles.forEach((each) => {
      const scaledG = p5.Vector.mult(gravity, each.mass);
      each.applyForce(scaledG);
    });
  }

  applyForce(force) {
    this.particles.forEach((each) => {
      each.applyForce(force);
    });
  }

  update() {
    // this.particles.forEach((each) => {
    //   each.update();
    // });
    for (let index = this.particles.length - 1; index >= 0; index--) {
      this.particles[index].update();
      if (this.particles[index].isdead()) {
        this.particles.splice(index, 1);
      }
    }
  }

  display() {
    this.particles.forEach((each) => {
      each.display();
    });
  }
}
