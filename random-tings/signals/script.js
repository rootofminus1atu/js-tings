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
        this.computeFn = computeFn
        this.isStale = true
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
    RUNNING = task
    task.execute()
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





