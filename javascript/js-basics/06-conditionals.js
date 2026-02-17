const playerHealth = 75;
const hasShield = true;
const hasSword = false;

// if(playerHealth <= 30 && hasShield) {
//     console.log("Gayila Beta")
// }

// const isLoggedIn = true
// const hasCourseAccess = false
// const wonFreeAccess = true

// if(isLoggedIn && (hasCourseAccess || wonFreeAccess)) {
//     console.log("Access Granted")
// } else {
//     console.log("Access Denied")
// }


// Switch - Case
const chosePath = "left"
switch (chosePath) {
    case "left":
        console.log("move left")
        break;
    case "right":
        console.log("move right")
        break;
    case "up":
        console.log("move up")
        break;
    case "down":
        console.log("move down")
        break;
    default:
        console.log("wrong path")
        break;
}