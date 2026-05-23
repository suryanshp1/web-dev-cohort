// export function getFullName(fname, lname) {
//     return `${fname} ${lname}`;
// }

// res = getFullName("Suryansh", "Pandey")
// console.log(res)

export function normalizeInput(input) {
    let result = "";

    if (!input) {
        return result;
    }

    result = input.trim();
    result = result.replace(/\s+/g, " ");
    result = result.split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase())
        .join(" ");

    return result
}