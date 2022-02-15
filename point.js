export class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(point) {
        this.x += point.x;
        this.y += point.y;
        return this;
    }

    subtract(point) {
        this.x -= point.x;
        this.y -= point.y;
        return this;
    }

    reduce(value) {
        this.x *= value;
        this.y *= value;
        return this;
    }

    collide(point, width, height) {
        if (
            this.x >= point.x &&
            this.x <= point.x + width &&
            this.y >= point.y &&
            this.y <= point.y + height
        ) {
            return true;
        } else {
            return false;
        }
    }

    clone() {
        return new Point(this.x, this.y);
    }
}