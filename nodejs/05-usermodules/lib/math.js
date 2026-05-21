// const xyz = require('../tests/a/b/test')
// console.log(xyz.xyz)

function add(a, b) {
    return a + b
}

function sub(a, b) {
    return a - b
}

function mul(a, b) {
    return a * b
}

function div(a, b) {
    return a / b
}

// Named exports
// exports.add = add;
// exports.sub = sub;
// exports.mul = mul;
// exports.div = div;

// Default exports
module.exports = {
    add,
    sub,
    mul,
    div
}