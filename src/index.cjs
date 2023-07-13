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
    console.log( ' this is cjs module, now developing ... ' )
}, 5000);


module.exports = {
    add,
    subtract,
    multiply,
    divide,
};