import { Point } from "./point.js";

const FOLLOW_SPEED = 0.08;
const ROTATE_SPEED = 0.12;
const MAX_ANGLE = 30;
const FPS = 1000 / 60;
const WIDTH = 150;
const HEIGHT = 150;

export class Dialog {
  constructor() {
    this.pos = new Point();
    this.target = new Point();
    this.prevPos = new Point();
    this.downPos = new Point();
    this.startPos = new Point();
    this.mousePos = new Point();
    this.centerPos = new Point();
    this.origin = new Point();
    this.rotation = 0;
    this.sideValue = 0;
    this.isDown = false;
  }

  resize(stageWidth, stageHeight) {
    // resize 됬을때, 사각형의 왼쪽 위의 점의 위치를 만드는 코드. WIDTH 와 HEIGHT 를 빼주는 이유또한 사각형을 만든다는 의미임.
    this.pos.x = Math.random() * (stageWidth - WIDTH);
    this.pos.y = Math.random() * (stageHeight - HEIGHT);
    this.target = this.pos.clone();
    this.prevPos = this.pos.clone();
  }

  animate(ctx) {
    const move = this.target.clone().subtract(this.pos).reduce(FOLLOW_SPEED);

    this.pos.add(move);

    this.centerPos = this.pos.clone().add(this.mousePos);

    ctx.beginPath();
    ctx.fillStyle = `#f4e55a`;
    ctx.fillRect(this.pos.x, this.pos.y, WIDTH, HEIGHT);
  }

  // swingDrag(ctx) {
  //     const dx = this.pos.x - this.prevPos.x;
  //     const speedX = Math.abs(dx) / FPS;
  //     const speed = Math.min(Math.max(speedX, 0), 1);

  //     let rotation = (MAX_ANGLE / 1) * speed;
  //     rotation = rotation * (dx > 0 ? 1 : -1) - this.sideValue;

  //     this.rotation += (rotation - this.rotation) * ROTATE_SPEED;

  //     const tmpPos = this.pos.clone().add(this.origin);
  //     ctx.save();
  //     ctx.translate(tmpPos.x, tmpPos.y);
  //     ctx.rotate((this.rotatioin * Math.PI) / 180);
  //     ctx.beginPath();
  //     ctx.fillStyle = `#f4e55a`;
  //     ctx.fillRect(-this.origin.x, -this.origin.y, WIDTH, HEIGHT);
  //     ctx.restore();
  // }

  // down 함수의 인자 point 는 현재 마우스의 좌표를 나타냄. 즉 마우스가 노란 상자안에 들어가 클릭할 경우 발생하는 이벤트를 나타내는 함수임. this.pos 는 사각형 오른쪽 맨 위 꼭짓점의 좌표임.
  down(point) {
    if (point.collide(this.pos, WIDTH, HEIGHT)) {
      this.isDown = true;
      this.startPos = this.pos.clone();
      this.downPos = point.clone();
      this.mousePos = point.clone().subtract(this.pos);

      // const xRatioValue = this.mousePos.x / WIDTH;
      // this.origin.x = WIDTH * xRatioValue;
      // this.origin.y = (HEIGHT * this.mousePos.y) / HEIGHT;

      // this.sideValue = xRatioValue - 0.5;

      return this;
    } else {
      return null;
    }
  }

  //target 은 이동할 곳의 오른쪽 맨 위 사각형 꼭짓점
  move(point) {
    if (this.isDown) {
      this.target = this.startPos.clone().add(point).subtract(this.downPos);
    }
  }

  up() {
    this.isDown = false;
  }
}
