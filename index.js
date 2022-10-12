const screen = document.querySelector('.screen')
const keys = Array.from(document.querySelectorAll('button'))

let display = 0
let memory = 0
let operatorMemory = ''

const concatenate = (value1, value2) => {
    if (value1 == 0 && !value1.toString().includes('.')) return value2
    return value1 + value2
}

const removeLastElement = (value) => {
    if (value.toString().length === 1) return 0
    return value.toString().slice(0, -1)
}

const calculate = {
    'add': (x, y) => x + y,
    'subtract': (x, y) => x - y,
    'divide': (x, y) => x / y,
    'multiply': (x, y) => x * y
}

keys.forEach(key => {
    key.addEventListener('click', (e) => handleBtnClick(e.target))
})

const handleBtnClick = (btn) => {
    switch (btn.id) {
        case '':
            display = concatenate(display, btn.innerHTML)
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
            memory = operatorMemory ? calculate[operatorMemory](+memory, +display) : display
            operatorMemory = btn.id
            display = 0
            break
        case 'equal':
            if (operatorMemory) {
                memory = calculate[operatorMemory](+memory, +display)
                display = 0
            }
            break
        case 'reset':
            display = 0
            memory = 0
            operatorMemory = 0
            break
    }
    screen.innerHTML = display ? display : memory
}