// Hello world

// console.log("hello World!");

// Code structure
// kebab-case - file
// snake_case(py), camelCase(js)

/* 
Comments 
*/

// Topic: Strict Mode

// Topic variable
// steps -> create(declaration), store(initialization), use, modify

// use camelCase for variable names
// variable name can start only with character, $ or _
// can not contain special characters like 'a&b'
// are case sensitive

// let $myName;
// $myName = 'Suryansh Pandey'

// console.log($myName)

// let _myName4 = 'Suraj Pandey'

// console.log(_myName4)

// const G = 9.8; // UPPER case constant if same throughout the program

// G = 10; -----> this will not work as it is constant
// console.log(G);
// console.log(Math.PI)

// There are 8 datatypes in JS
// ========> Primitive datatypes
// - number for numbers of any kind: integer or floating point
// - bigint for integer number of arbitriary length
// - string for zero or single or combination/collection of characters
// - boolean for conditional true/false
// - null for unknown values
// - undefined for un assigned values
// - symbol for unique identifiers
// =============> Non-Primitive datatypes
// - objects for more complex data structures

// Numbers - Interger or Float

// let myNum = 89.99
// console.log(myNum);

// INFINITY, -INFINITY, NaN

// console.log(1/0);
// console.log(0/1)
// console.log(6 + "Not a number");
// console.log(6 / "Not a number");
// console.log(NaN + 1);
// console.log(NaN ** 0);


// BigInt
// 2^53 - 1
// let bigBalance = 2222222222333334n
// console.log(bigBalance)

// let single = 'I am single'
// let double = "I am double" // preffred
// let backtick = `I am backtick : ${bigBalance}` // string interpolation
// console.log(backtick);

// console.log(("HELLO WORLD").toLowerCase())

// Boolean (true, false) - Flag
// let isPassed = true;

// NULL - empty, unknown - variable declared and assigned with empty value
// let partner = null;

// undefined - variable declared but value not assigned
// let oneVariable;
// console.log(oneVariable)

// Symbol
// Used to create unique identifier for objects.

// Object

// const person = {
//     name: "Surya",
//     age: 10,
//     DOB: "20-08-2000",
//     Mob: "9898343484",
//     isMarried: false,
// }

// typeOf

// console.log(typeof(person))
// console.log(typeof(23.33))
// console.log(typeof(2333n))
// console.log(typeof(false))
// console.log(typeof("Hola"))
// console.log(typeof(undefined))
// console.log(typeof Math.PI)

// Quirky
// console.log("Type of null : ", typeof null)
// console.log(typeof console.log);

// Type conversion/casting
// let choice = false;

// let stringChoice = String(choice);

// console.log(stringChoice);

// Number Conversion
// let strInput = "   25\t\t";
// let age = Number(strInput);
// console.log(age);

// let strInput = "Twenty Five";
// let age = Number(strInput);
// console.log(age);

// let x = "\n"
// console.log(Number(x));

// Boolean conversion
// console.log(Boolean(0))
// truthy, falsy value -> (false, zero(0, 0.0, 0n), empty string('', ""), null, undefined, NAN)

// Topic : Operators
// Operator - [+, -, /, *, **]
// Operand - on which we apply operators
// Unary Operator (single operand) -> !, -
// Binary Operator (two operand) -> +
// Ternary Operator (three operand) -> x>y?x:y (?:)

// Arithmatic operator

// console.log(10**2)
// console.log(10%2)
// console.log(10/5)
// console.log((10>5)?"greater":"smaller")
// console.log(!false)
// console.log(-5)

// console.log(81 ** (1/2))
// console.log(27 ** (1/3));
// console.log(Math.sqrt(9))

// String concatination

// console.log(6 + "abc");

// rule : if any one operand is string, concatanation will happen

// console.log("3"+5);

// console.log("3" + 4 + "6");

// console.log("6" - 2);
// console.log(6 - "2")

// only sum(+) work with string and rest other arithematic operator will work with numbers only

// Operator Precedence

// Assignment operators -> "=", "+=", "++", "--"
// let a = 4
// console.log(a++)
// console.log(++a)
// console.log(--a)
// console.log(a += 3)

// Increment ++ | Decrement --
// Prefix - ++a, --a
// Postfix - a++, a--

// Comparisions 
// >, <, >=, <=, ==, ===, !=, !==
// console.log(5>10);
// console.log(10==10);
// console.log(10===10);
// console.log("beee" > "bee");
// Strict equality (===), Loose equality (==)
// console.log('2'==2); // true
// console.log('2'===2); // false


// if else

// let a = 19
// if (a > 18) {
//     console.log("Vote");
// } else {
//     console.log("No vote")
// }

