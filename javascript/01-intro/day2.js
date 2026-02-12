// console.log("Age is :", age);

// var age = 24;
// age = 35;
// age="Suryansh Pandey";

// age = 65;
// console.log(age);

// let age = 24;
// console.log(age);
// age = 45;

// console.log(age);


// const a = 10;
// a = 20;

// function - A reusable set of instructios
// A block of code designed to perfome a specific task

// function sayHello() {
//     console.log("Hello World!");
// }

// sayHello()

// function greetUser(name) {
//     console.log(`Hello ${name}`);
// }

// greetUser("Harsh")

// function add(num1, num2) {
//     // console.log(`Result is ${num1 + num2}`);
//     const result = num1+num2;
//     return result
// }

// r = add(2,3)
// console.log(`Result is ${r}`);


// function cartoon() {
//     function cartoonInCartoon() {
//         return "Naruto";
//     }

//     return cartoonInCartoon;
// }

// const anime = cartoon()
// res = anime()
// console.log(res);


// let cartoon = function() {
//     console.log("hello cartoon");
// }

// cartoon()

// age = 45;
// console.log('Value of age is ', isAllowedVoteAge(age));

// var age = 12;

// function isAllowedVoteAge(age) {
//     return age >= 18;
// }

// const isAllowedVoteAge = function (age) {
//     return age >= 18;
// }

// arrow function
// const isAllowedVoteAge = (age) => {
//     return age >= 18;
// }

// const isAllowedVoteAge = age => age>=18

// const isUserAllowedToOpenBankAccount = (age, minBalance) => age >=18 && minBalance >= 1000
// console.log(isUserAllowedToOpenBankAccount(20, 55))

// Data Structures

const fruits = ["apple", "orange", "mango", "beetroot", true, 1]
//               0         1.       2         3          4.   5

// console.log(fruits);

// fruits.push("passion fruit")

// console.log(fruits);

// console.log(fruits.includes("apple"))

// fruits.shift()
// const firstElement = fruits.slice(2, 5)
// fruits.unshift('1', '2')
// fruits.pop()
// console.log(fruits.indexOf("apple"))
// console.log(fruits)

// High order function

// function func(newFunc) {
//     return 10 + newFunc()
// }

// function func2() {
//     return 10;
// }

// console.log(func(func2))

// for(let i=0; i<fruits.length;i+=1) {
//     console.log(fruits[i])
// }

// function doPrint(element) {
//     console.log(element)
// }

// fruits.forEach(doPrint)

// fruits.forEach((element) => console.log(`---> ${element}`))

// forEach((element) => console.log(`---> ${element}`))

// function forEach(func1) {
//     for(let i=0; i<fruits.length; i++) {
//         func1(fruits[i])
//     }
// }

const nums = [1,2,3,4,5,6,7,8]

// const result = nums.map((e) => e*2)
// console.log(result)

// const result = map((e) => e*2)
// console.log(result)

// function map(func) {
//     let result = [];
//     for(i=0; i<nums.length; i++) {
//         result.push(func(nums[i]))
//     }
//     return result
// }