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

    slope(other) {
        return (-1) * (this.y - other.y) / (this.x - other.x)
    }
}

class CanvasWindow {
    constructor(width, height) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.canvas.style.border = '2px solid black';
        this.ctx = this.canvas.getContext("2d");
    }

    // these below belong to the canvas border
    get left() {
        return new P(0, this.height / 2);
    }

    get right() {
        return new P(this.width, this.height / 2);
    }

    get up() {
        return new P(this.width / 2, 0);
    }

    get down() {
        return new P(this.width / 2, this.height);
    }

    get globalCenter() {
        return new P(this.canvas.width / 2, this.canvas.height / 2);
    }

    appendTo(element) {
        element.append(this.canvas);
    }
}


class CoordinateSystem {
    // maybe 2 basis points instead
    constructor(canvasWindow, unit, basisX, basisY, centerAlt) {
        this.canvasWindow = canvasWindow
        this.ctx = canvasWindow.ctx

        this.unit = unit  // how many pixels for a single cell
        this.center = centerAlt || canvasWindow.globalCenter
        this.basisX = this.center.move(unit * basisX.x, unit * basisX.y)
        this.basisY = this.center.move(unit * basisY.x, unit * basisY.y)
        // by default center would be at the center of the canvasWindow

        this.originalBasisX = basisX
        this.originalBasisY = basisY

        this.default_color = "black";
        this.default_line_width = 1
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvasWindow.width, this.canvasWindow.height);
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
        this.drawMXplusB(this.center.slope(this.basisX), 0, null, 1.5 * this.default_line_width)
        this.drawMXplusB(this.center.slope(this.basisY), 0, null, 1.5 * this.default_line_width)
    }

    drawLattice() {
        const color = "rgba(0, 0, 0, 0.5)"
                
        const xs = rangeContainingCenter(this.canvasWindow.left.x, this.canvasWindow.right.x, this.unit);
        xs.forEach(x => this.drawLine(new P(x, this.canvasWindow.down.y), new P(x, this.canvasWindow.up.y), color));

        const ys = rangeContainingCenter(this.canvasWindow.up.y, this.canvasWindow.down.y, this.unit);
        ys.forEach(y => this.drawLine(new P(this.canvasWindow.left.x, y), new P(this.canvasWindow.right.x, y), color));
    }

    setBasisVecs(basisX, basisY) {
        this.basisX = this.center.move(this.unit * basisX.x, this.unit * basisX.y)
        this.basisY = this.center.move(this.unit * basisY.x, this.unit * basisY.y)
    }

    drawBasisVecs() {
        const bigger = 3 * this.default_line_width
        this.drawLine(this.center, this.basisX, "red", bigger)
        this.drawLine(this.center, this.basisY, "blue", bigger)
    }

    drawMXplusB(m, b, color, width) {
        m ??= 0
        b ??= 0

        const xmovl = this.center.distance(this.canvasWindow.left)
        const xmovr = this.center.distance(this.canvasWindow.right)

        // ig this works for relative coords
        const start = this.center.move(-xmovl, m * (-xmovl) + b * this.unit)
        const end = this.center.move(xmovr, m * xmovr + b * this.unit)

        this.drawLine(start, end, color, width)
    }
}

const cw = new CanvasWindow(200, 200)
cw.appendTo(document.body)

const cs = new CoordinateSystem(cw, 20, new P(1, 0), new P(0, 1))
cs.drawLattice()
cs.drawXYaxes()
cs.drawBasisVecs()

function lerpStep(start, end, howMany, i) {
    return (i * (end - start) / howMany + start)
}

async function animate(cs, endBasisX, endBasisY) {
    const startBasisX = new P(cs.originalBasisX.x, cs.originalBasisX.y)
    const startBasisY = new P(cs.originalBasisY.y, cs.originalBasisY.y)

    const totalTime = 1 // in seconds
    const howMany = 40
    for (let i = 1; i <= howMany; i++) {
        cs.clear()

        console.log(`from ${startBasisX.x} to ${endBasisX.x}`)
        const x1 = lerpStep(startBasisX.x, endBasisX.x, howMany, i)
        const y1 = lerpStep(startBasisX.y, endBasisX.y, howMany, i)
        const x2 = lerpStep(startBasisY.x, endBasisY.x, howMany, i)
        const y2 = lerpStep(startBasisY.y, endBasisY.y, howMany, i)
        console.log(x1, y1)

        cs.setBasisVecs(new P(x1, y1), new P(x2, y2))
        cs.drawLattice()
        cs.drawXYaxes()
        cs.drawBasisVecs()
        await new Promise(resolve => setTimeout(resolve, totalTime / howMany * 1000));

    }
}



function buttonThing() {
    animate(cs, new P(3, 1), new P(-2, 2))
}
