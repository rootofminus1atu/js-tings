console.log("hi")



function rangeContainingCenter(min, max, step) {
    const numbers = []
    const center = (max - min) / 2

    for (let num = center; num <= max; num += step) {
        numbers.push(num)
    }

    for (let num = center; num >= min; num -= step) {
        numbers.push(num)
    }

    numbers.sort((a, b) => a - b)

    return numbers
}


class P {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(dx, dy) {
        return new P(this.x + dx, this.y - dy)
    }

    distance(other) {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2))
    }
}


class Canvas {
    constructor(width, height, unit) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.width = width
        this.canvas.height = height;
        this.height = height
        this.canvas.style.border = '2px solid black';

        this.unit = unit;  // how many pixels for a single cell
        this.default_color = "black";
        this.default_line_width = 1
    }

    get center() {
        return new P(this.canvas.width / 2, this.canvas.height / 2);
    }

    get basisX() {
        return this.center.move(this.unit, 0)
    }

    get basisY() {
        return this.center.move(0, this.unit)
    }

    get left() {
        return new P(0, this.canvas.height / 2);
    }

    get right() {
        return new P(this.canvas.width, this.canvas.height / 2);
    }

    get up() {
        return new P(this.canvas.width / 2, 0);
    }

    get down() {
        return new P(this.canvas.width / 2, this.canvas.height);
    }

    drawLine(from, to, color, line_width) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = line_width;

        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.stroke();

        this.ctx.strokeStyle = this.default_color;
        this.ctx.lineWidth = this.default_line_width
    }

    drawXYaxes() {
        this.drawLine(this.left, this.right, "blue");
        this.drawLine(this.down, this.up, "blue");
    }

    drawLattice() {
        const xs = rangeContainingCenter(this.left.x, this.right.x, this.unit);
        xs.forEach(x => this.drawLine(new P(x, this.down.y), new P(x, this.up.y)));

        const ys = rangeContainingCenter(this.up.y, this.down.y, this.unit);
        ys.forEach(y => this.drawLine(new P(this.left.x, y), new P(this.right.x, y)));
    }

    drawBasisVecs() {
        const bigger = 2 * this.default_line_width
        this.drawLine(this.center, this.basisX, "red", bigger)
        this.drawLine(this.center, this.basisY, "blue", bigger)
    }

    drawMXplusB(m, b) {
        m ??= 0
        b ??= 0

        const xmovl = this.center.distance(this.left)
        const xmovr = this.center.distance(this.right)

        // ig this works for relative coords
        const start = this.center.move(-xmovl, m * (-xmovl) + b * this.unit)
        const end = this.center.move(xmovr, m * xmovr + b * this.unit)
        console.log(start, end)

        this.drawLine(start, end, "green", 2 * this.default_line_width)
    }
}

const c = new Canvas(200, 200, 40);
c.drawXYaxes();
c.drawLattice();
c.drawBasisVecs();
c.drawMXplusB(0.5, -1)
document.body.append(c.canvas);
