// var shipName = "Amber";
// console.log("shipName : ", shipName);

// let crewCount = 12;
// console.log("crewCount : ", crewCount)
// crewCount = 14

// const captainName = "Jack Sparrow";
// console.log("captainName : ", captainName)
// captainName = "Dipesh" -> error


// problem with var - no block scoping
// if (true) {
//     var leakyTreasure = "abc";
//     let letTreasure = "xyz";
//     console.log(leakyTreasure);
//     console.log(letTreasure);
// }

// console.log(leakyTreasure); //-> accessible beyond blocks
// console.log(letTreasure); //-> block scoping , will throw error


// let shipSpeed = 22;
// let _privatelog = "private variable"; // private class variable
// let __protectedVar = "protected variable"; // protected class variable
// let _ = "a"; // value is there but variable is not use, mainly happens in looping proble
// let MONGO_URL = "xyz"; // used for env variable or constant


// const treasureChest = {
//     gold: 100,
//     rubies: 50,
//     maps: 2,
// }

// treasureChest.gold = 200
// treasureChest = {gold: 50} -> Error
// console.log(treasureChest)

// const crewRoaster = ["Alok", "Surya", "Bittu"]
// crewRoaster.push("Sam")
// console.log(crewRoaster);
// crewRoaster.pop()
// crewRoaster[0] = "Abbas"
// console.log(crewRoaster);

// crewRoaster = [1] //-> Error


