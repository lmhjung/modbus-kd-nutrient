


function add(a, b) {
    return a + b;
}


function subtract(a, b) {
    return a - b;
}


function multiply(a, b) {
    return a * b;
}


function divide(a, b) {
    return a / b;
}


setInterval(() => {
    console.log( ' this is esm module, now developing ... ' )
}, 5000);

export { add, subtract, multiply, divide };