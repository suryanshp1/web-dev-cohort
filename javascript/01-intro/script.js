// console.log("Hello from javascript")

// var fname = 'Suraj'
// var lanme = "Pandey"

// Javascript is a loosely/dynamically typed language
// console.log("Value of fname is : ", fname);

// fname = "Suryansh"

// console.log("Value of fname is : ", fname);

// fname = 32

// console.log("Value of fname is : ", fname);

// function is use to avoid repeatation of code and maintain code reusability
// provide single source to maintain logic

// function addNumbers(num1, num2) {
//     var result = num1 + num2
//     return result
// }

// res = addNumbers(2, 3)
// console.log("Result : ", res);

// Conditionals
// var age = 19
// var condition = age >= 18
// var conditionKaUlta = age < 18

// if (condition) {
//     console.log('Vote is allowed');
// } else {
//     console.log("You are not allowed to vote")
// }

// verbose
// if (condition) {
//     console.log('Vote is allowed');
// }

// if (conditionKaUlta) {
//     console.log("You are not allowed to vote");
// }

// var age = 36;
// var childCondition = age <= 12;
// var teenCondition = age <= 19;
// var adultCondition = age <= 40;
// var seniorCondition = age > 40 && age < 120;

// if (childCondition) {
//     console.log("Child");
// } else if (teenCondition) {
//     console.log("Teen");
// } else if (adultCondition) {
//     console.log("Adult");
// } else if (seniorCondition) {
//     console.log("Senior");
// } else {
//     console.log("Others");
// }

// loops
//.  Init.    condirtion    increment 
// for (var x=1; x<=10; x=x+1) {
//     console.log("My x val : ", x)
// }

// function getRandomNumber(min, max) {
//     return Math.floor(Math.random() * (max-min+1)) + min
// }

// var fileSize = 1024
// var currentFileDownloaded = 0
// while (currentFileDownloaded < fileSize) {
//     console.log("Downloading file : ", currentFileDownloaded);
//     currentFileDownloaded += getRandomNumber(10, 40);
// }

// do {
//     console.log("Downloading file : ", currentFileDownloaded);
//     currentFileDownloaded += getRandomNumber(10, 40);
// } while (currentFileDownloaded < fileSize)