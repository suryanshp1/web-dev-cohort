
function bootNavigation(mapLoaded) {
    try {
        console.log(`Is navigation loaded : ${mapLoaded}`)

        if (!mapLoaded) {
            throw new Error("Map was not passed in this function")
        }

        return "NAV_OK"
    } catch(err) {
        console.log(err)
        console.log("NAvigation failed")
    } finally {
        console.log("Navigation sequence completed")
    }
}

// const status1 = bootNavigation(true);
// console.log(`Result : ${status1}`)

const status2 = bootNavigation(false);
console.log(`Result : ${status2}`)