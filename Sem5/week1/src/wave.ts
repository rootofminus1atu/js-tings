
interface CreateWaveOptions {
    space: string
    newLine: string
}

export function createWave(text: string, amplitude: number, wavelen: number, howMany: number, options: CreateWaveOptions = { space: " ", newLine: "\n" }): string {
    const spaceAmounts = Array.from(
        { length:  wavelen * howMany }, 
        (_, i) => Math.floor(amplitude * Math.pow(Math.sin(1 / wavelen * Math.PI * i), 2))
    )
    
    const wave = spaceAmounts
        .map(spaceAmount => options.space.repeat(spaceAmount))
        .map(spaceStr => spaceStr += text)
        .join(options.newLine)

    return wave
}

// console.log(createWave("hi", 30, 10, 2))