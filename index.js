const screen = document.querySelector('.screen')
const screenBckg = document.querySelector('.screen-background')
const keys = Array.from(document.querySelectorAll('button'))

const displayLength = window.matchMedia("(min-width: 504px)").matches ? 16 : 9
console.log(displayLength)

let display = 0
let memory = {
    number1: 0,
    operator: '',
    number2: 0,
}

const concatenateNumber = (x, y) => {
    if (x == 0 && !x.toString().includes('.')) return y
    return x + y
}

const removeLastElement = (value) => {
    if (value.toString().length === 1) return 0
    return value.toString().slice(0, -1)
}

const adjustResultLength = (x, maxLength) => {
    const xLength = x.toString().length
    integralPartLentgh = Math.round(x).toString().length
    if (integralPartLentgh > maxLength) {
        return x
    } else if (xLength > maxLength) {
        return parseFloat(x).toFixed(maxLength - 1 - integralPartLentgh)
    }
    return x
}

const calculate = {
    add: (x, y) => x + y,
    subtract: (x, y) => x - y,
    divide: (x, y) => x / y,
    multiply: (x, y) => x * y
}

const operators = {
    '+': 'add',
    '-': 'subtract',
    '/': 'divide',
    '*': 'multiply'
}

keys.forEach(key => {
    key.addEventListener('click', e => handleBtnClick(e.target))
})

document.addEventListener('keydown', e => {
    handleKeyPress(e.key)
})

const handleBtnClick = (btn) => {
    switch (btn.id) {
        case '':
            display = concatenateNumber(display, btn.innerHTML)
            break
        case 'point':
            if (display.toString().includes('.')) break
            display = display.toString().concat(btn.innerHTML)
            break
        case 'delete':
            display = removeLastElement(display)
            break
        case 'add':
        case 'subtract':
        case 'divide':
        case 'multiply':
            if (memory.operator) {
                if (display) {
                    memory.number2 = display
                    memory.number1 = calculate[memory.operator](+memory.number1, +memory.number2)
                } else {
                    memory.number2 = memory.number1
                }
            } else {
                memory.number1 = display
            }
            memory.operator = btn.id
            display = 0
            break
        case 'equal':
            if (memory.operator) {
                memory.number2 = display || memory.number2 || memory.number1
                memory.number1 = calculate[memory.operator](+memory.number1, +memory.number2)
                display = 0
            }
            break
        case 'reset':
            display = 0
            memory = {
                number1: 0,
                operator: '',
                number2: 0,
            }
            break
    }
    screen.innerHTML = display || memory.number1
    console.log(adjustResultLength(screen.innerHTML, displayLength))
    screen.innerHTML = adjustResultLength(screen.innerHTML, displayLength)
    if (screen.innerHTML.length > displayLength) screen.innerHTML = parseFloat(screen.innerHTML).toExponential(displayLength - 5)
}

const handleKeyPress = (key) => {
    if (!isNaN(+key)) {
        display = concatenateNumber(display, key)
    } else if (key === '.' || key === ',') {
        if (display.toString().includes('.')) return
        display = display.toString().concat('.')
    } else if (key === 'Backspace') {
        display = removeLastElement(display)
    } else if (key === '+' || key === '-' || key === '/' || key === '*') {
        memory = operatorMemory ? calculate[operatorMemory](+memory, +display) : display
        operatorMemory = operators[key]
        display = 0
    } else if (key === '=' || key === 'Enter') {
        if (operatorMemory) {
            memory = calculate[operatorMemory](+memory, +display)
            display = 0
        }
    } else if (key === 'Escape') {
        display = 0
        memory = 0
        operatorMemory = 0
    }
    screen.innerHTML = display ? display : memory
}