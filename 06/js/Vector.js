class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mult(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    static mult(v, n) {
        return new Vector(v.x * n, v.y * n);
    }
}
