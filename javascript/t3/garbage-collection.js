// Reachability
// Objects are retained in memory while they are reachable

let temp = {
    email: "gibberish@tempmail.com",
    valid: 5, // min
}

// after 5 mins
temp = null;

// console.log(temp)

// There is no way to access it, no reference to it
// Garbage collector will junk the data and free the memory

const movie = {
    title: "Ghosted",
    release: 2023,
    production: "Apple TV",
};

function coStar(actor, actress) {
    actor.coStar = actress;
    actress.coStar = actor;

    return {
        leading: actor,
        supporting: actress,
    }
}

movie.cast = coStar(
    {name: "Krish Evans", salary: 10_000_000},
    {name: "Ana de Armas", salary: 2_000_000},
)

console.log(movie);

movie.cast = null;

console.log(movie);
