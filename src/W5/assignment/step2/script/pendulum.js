class Pendulum {
  constructor(x, y, length, angle, rad) {
    this.angle = angle;
    this.angleVel = 0;
    this.angleAcc = 0;
    this.pos = createVector(x, y);
    this.length = length;
    this.ballPos = createVector(x, y);
    this.ballPos.add(
      cos(this.angle) * this.length,
      sin(this.angle) * this.length
    );
    this.rad = rad;
    this.draggingOffset = createVector();
    this.isHover = false;
    this.isDragging = false;
    this.child = null; // 새로 추가된 속성
  }

  applyGravity(gravity) {
    this.angleAcc =
      (sin(this.angle - (TAU / 360) * 90) * -gravity.y) / this.length;
  }

  update() {
    if (this.child) {
      this.child.pos.set(this.ballPos.x, this.ballPos.y);
      this.child.update();
    }

    if (!this.isDragging) {
      this.angleVel += this.angleAcc;
      this.angle += this.angleVel;
      this.angleVel *= 0.998;
    }
    this.ballPos.set(
      cos(this.angle) * this.length + this.pos.x,
      sin(this.angle) * this.length + this.pos.y
    );
  }

  display() {
    noStroke();
    fill(127);
    ellipse(this.pos.x, this.pos.y, 20);
    if (this.isDragging) {
      fill('#ff0000');
    } else if (this.isHover) {
      fill(127);
    } else {
      fill(191);
    }
    ellipse(this.ballPos.x, this.ballPos.y, 2 * this.rad);
    stroke(0);
    noFill();
    line(this.pos.x, this.pos.y, this.ballPos.x, this.ballPos.y);
    if (this.child) {
      this.child.display();
      line(this.ballPos.x, this.ballPos.y, this.child.pos.x, this.child.pos.y);
    }
  }

  mouseMoved(mX, mY) {
    this.isHover =
      (this.ballPos.x - mX) ** 2 + (this.ballPos.y - mY) ** 2 <= this.rad ** 2;

    if (this.child) {
      this.child.mouseMoved(mX, mY);
    }
  }

  mousePressed(mX, mY) {
    if (this.isHover) {
      this.isDragging = true;
      this.angleAcc = 0;
      this.angleVel = 0;
      this.draggingOffset.set(mX - this.ballPos.x, mY - this.ballPos.y);
    }

    if (this.child) {
      this.child.mousePressed(mX, mY);
    }
  }

  mouseDragged(mX, mY) {
    if (this.isDragging) {
      const ballShouldBe = createVector(
        mX - this.draggingOffset.x,
        mY - this.draggingOffset.y
      );
      const angle = atan2(
        ballShouldBe.y - this.pos.y,
        ballShouldBe.x - this.pos.x
      );
      this.angle = angle;
    }

    if (this.child) {
      this.child.mouseDragged(mX, mY);
    }
  }

  mouseReleased() {
    this.isDragging = false;

    if (this.child) {
      this.child.mouseReleased();
    }
  }

  addJoint(child, xOffset, yOffset) {
    this.child = child;
    this.child.pos.set(this.pos.x + xOffset, this.pos.y + yOffset);
  }
}
