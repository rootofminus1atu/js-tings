class Signal {
    _value
    dependencies

    constructor(initValue) {
        this.dependencies = new Set()
        this._value = initValue
    }

    get value() {
        if (RUNNING) {
            this.dependencies.add(RUNNING)
        }
        return this._value
    }

    set value(newValue) {
        if (this._value === newValue) {
            return
        }
        this._value = newValue
        this.notify()
    }

    notify() {
        for (const dependency of this.dependencies) {
            dependency.update()
        }
    }
}

class Computed {
    _value
    computeFn
    isStale

    constructor(computeFn) {
        console.log(`Creating Computed with ${computeFn}`)
        this.computeFn = computeFn
        this.isStale = true
        console.log(this)
        runAndExtractDependencies(this)
    }

    get value() {
        if (this.isStale) {
            this._value = this.computeFn()
            this.isStale = false
        }
        return this._value
    }

    execute() {
        this.computeFn()
    }

    update() {
        this.isStale = true
    }
}

class Effect {
    effectFn

    constructor(effectFn) {
        this.effectFn = effectFn
        runAndExtractDependencies(this)
    }

    execute() {
        this.effectFn()
    }

    update() {
        this.execute()
    }
}

let RUNNING = null

function runAndExtractDependencies(task) {
    console.log(`The task: ${RUNNING}`)
    RUNNING = task
    console.log(`The task after assigning: ${RUNNING}`)
    task.execute()
    console.log(`The task after executing `)
    RUNNING = null
}




let counter = new Signal(1)
let double = new Computed(() => counter.value * 2)

const container = document.createElement("h1")
document.body.append(container)

new Effect(() => {
    container.innerHTML = `${counter.value} x 2 = ${double.value}`
})

const button = document.createElement("button")
document.body.append(button)
button.innerHTML = "+1"

button.addEventListener("click", () => {
    counter.value += 1
})




let anotherCounter = new Signal(5)
let tripleAnotherCounter = new Computed(() => anotherCounter.value * 3)

const h2 = document.createElement("h2")
document.body.append(h2)

new Effect(() => {
    h2.innerHTML = `${anotherCounter.value} x 3 = ${tripleAnotherCounter.value}`
})

const button2 = document.createElement("button")
document.body.append(button2)
button2.innerHTML = "+1"

button2.addEventListener("click", () => {
    anotherCounter.value += 1
})




function createReactiveCounter() {
    const h3 = document.createElement("h3")
    const button = document.createElement("button")

    
}





