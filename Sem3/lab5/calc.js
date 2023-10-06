// improved code (I hope)

function getNums()
{
    // instead get the nums from inputs with this class name
    const numsElems = document.getElementsByClassName("num-box")
    const numsElemsArr = Array.from(numsElems)

    // and store them in an array
    const nums = numsElemsArr
        .map(elem => elem.value)
        .map(n => parseInt(n))

    // we can unpack the array and use its values like this
    addNums(...nums);
    subtractNums(...nums);
    multiplyNums(...nums);
    divideNums(...nums);
}


// the args could also be from an array instead
function addNums(...nums)
{
    const result = nums.reduce((a, c) => a + c, 0)

    displayAnswer("addition", result);
}

function subtractNums(...nums)
{
    const result = nums.reduce((a, c) => a - c, nums[0])

    displayAnswer("subtraction", result);
}

function multiplyNums(...nums)
{
    const result = nums.reduce((a, c) => a * c, 1)

    displayAnswer("multiplication", result);
}

function divideNums(...nums)
{
    const result = nums.reduce((a, c) => a / c, Math.pow(nums[0], 2))

    displayAnswer("division", result);
}

function displayAnswer(operationType, operationResult)
{
    const message = `The ${operationType} is: ${operationResult}`
    document.getElementById('answer').innerHTML+= message + '<br/>';
}
