
export async function calculator({op, num1, num2}) {
    if (typeof op !== "string" || typeof num1 !== "number" || typeof num2 !== "number") {
        throw new Error("Invalid Input");
    }

    switch (op) {
        case "add":
            return num1 + num2;
        case "subtract":
            return num1 - num2;
        case "multiply":
            return num1 * num2;
        case "divide":
            return num1 / num2;
        default:
            throw new Error("Invalid Operation");
    }
}

export const calculatoTool = {
    type: "function",
    function: {
        name: "Calculator",
        description: "A simple calculator",
        parameters: {
            type: "object",
            properties: {
                op: {
                    type: "string",
                    enum: ["add", "subtract", "multiply", "divide"],
                },
                num1: {
                    type: "number",
                },
                num2: {
                    type: "number",
                },
            },
            required: ["op", "num1", "num2"],
        },
        result: {
            type: "number",
        },
    }
}