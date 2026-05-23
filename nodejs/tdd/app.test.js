import test from "node:test";
import { normalizeInput } from "./app.js";
import assert from "node:assert";

// test("that returns full name", (t) => {
//     const result = getFullName("Suryansh", "Pandey")

//     const expected = "Suryansh Pandey"

//     assert.strictEqual(result, expected)
// })

test("that it trims the spaces(normalization)", () => {
    const result = normalizeInput("  Suryansh Pandey  ")

    const expected = "Suryansh Pandey"

    assert.strictEqual(result, expected)
})

test("test that it returns empty string if input is empty", () => {
    const result = normalizeInput()

    const expected = ""

    assert.strictEqual(result, expected)
})

test("It removes extra white spaces", () => {
    const result = normalizeInput('Suryansh    Pandey')

    const expected = "Suryansh Pandey"

    assert.strictEqual(result, expected)
})

test("that capitalizes the input", () => {
    const result = normalizeInput('suryansh pandey')

    const expected = "Suryansh Pandey"

    assert.strictEqual(result, expected)
})