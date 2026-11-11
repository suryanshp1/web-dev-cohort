# Top 120 JavaScript, TypeScript and React interview questions with answers

This is designed for a Full Stack Developer interview, covering fundamentals, practical coding concepts, debugging, performance, architecture and scenario-based questions.

The questions are divided into:

| Section    | Questions | Focus                                               |
| ---------- | --------- | --------------------------------------------------- |
| JavaScript | 1–40      | Core language, async programming, browser APIs      |
| TypeScript | 41–70     | Types, interfaces, generics, advanced typing        |
| React      | 71–120    | Components, hooks, state, performance, architecture |

Each answer includes an explanation so you can understand the concept instead of just memorizing an interview response.

# Part 1: JavaScript — 40 questions

## Fundamentals, scope and functions

### 1. What is the difference between `var`, `let` and `const`?

Answer:

- `var`: Function-scoped, can be redeclared and reassigned.
- `let`: Block-scoped, can be reassigned but not redeclared in the same scope.
- `const`: Block-scoped, cannot be reassigned after initialization.

```
var a = 10;
var a = 20; // Allowed

let b = 10;
b = 20; // Allowed
// let b = 30; // Error

const c = 10;
// c = 20; // Error
```

Explanation: Prefer `const` by default. Use `let` when a variable needs reassignment. Avoid `var` in modern JavaScript because its function-scoping behavior can lead to unexpected bugs.

One important detail: `const` prevents reassignment of the variable, not modification of an object stored in it.

```
const user = { name: "John" };
user.name = "Mike"; // Allowed
```

### 2. What is hoisting in JavaScript?

Answer:

Hoisting is JavaScript's behavior of processing declarations before executing code within their scope.

```
console.log(a); // undefined
var a = 10;
```

JavaScript effectively processes this as:

```
var a;
console.log(a);
a = 10;
```

With `let` and `const`, declarations are also hoisted, but cannot be accessed before initialization.

```
console.log(b); // ReferenceError
let b = 20;
```

Explanation: Function declarations are also hoisted, so they can generally be called before their declaration. Function expressions assigned to `var`, `let` or `const` follow the behavior of those variables.

### 3. What is the Temporal Dead Zone (TDZ)?

Answer:

The Temporal Dead Zone is the period between entering a scope and initializing a `let` or `const` variable.

```
{
    // TDZ starts
    console.log(name); // ReferenceError

    let name = "Alex";
    // TDZ ends
}
```

Explanation: The variable exists in the scope but cannot be accessed until its declaration is evaluated. This helps catch errors caused by using variables before initialization.

### 4. What is the difference between global, function and block scope?

Answer:

- Global scope: Variables accessible throughout their applicable global environment.
- Function scope: Variables declared inside a function are accessible within that function.
- Block scope: Variables declared with `let` and `const` are accessible inside the `{}` block where they are declared.

```
var x = 10;

function example() {
    let y = 20;

    if (true) {
        const z = 30;
        console.log(y, z);
    }

    console.log(y);
    // console.log(z); // ReferenceError
}
```

Explanation: Understanding scope helps prevent accidental variable sharing, naming conflicts and unexpected behavior in loops and callbacks.

### 5. What is a closure in JavaScript?

Answer:

A closure occurs when a function retains access to variables from its outer lexical scope, even after the outer function has finished executing.

```
function counter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

const increment = counter();

console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3
```

Explanation: The returned function remembers the `count` variable. Closures are commonly used for:

- Data privacy and encapsulation.
- Function factories.
- Event handlers.
- Maintaining state between function calls.

### 6. What is `this` in JavaScript?

Answer:

`this` refers to the execution context of a function. Its value generally depends on how a function is called.

```
const user = {
    name: "Alex",

    greet() {
        console.log(this.name);
    }
};

user.greet(); // Alex
```

In this example, `this` refers to `user`.

```
function showName() {
    console.log(this);
}

showName();
```

In strict mode, `this` is `undefined` for a regular function called without an explicit receiver. In non-strict browser scripts, it may refer to the global object.

Explanation: A common interview mistake is saying that `this` always refers to the object where a function is defined. It is more accurate to say that it is determined by the call site for regular functions.

### 7. What is the difference between arrow functions and regular functions?

Answer:

Arrow functions have lexical `this`, while regular functions get their `this` value from how they are called.

```
const user = {
    name: "Alex",

    regularFunction() {
        console.log(this.name);
    },

    arrowFunction: () => {
        console.log(this.name);
    }
};

user.regularFunction(); // Alex
```

The arrow function does not create its own `this`.

Other differences:

- Arrow functions cannot be used as constructors with `new`.
- They do not have their own `arguments` object.
- They cannot be used as generator functions.
- They are useful for callbacks that should retain the surrounding `this`.

### 8. Explain `call()`, `apply()` and `bind()`.

Answer:

All three methods allow you to control the `this` value of a regular function.

```
function introduce(city, country) {
    console.log(`${this.name} from ${city}, ${country}`);
}

const user = { name: "Alex" };

introduce.call(user, "Delhi", "India");

introduce.apply(user, ["Delhi", "India"]);

const boundFunction = introduce.bind(user, "Delhi");
boundFunction("India");
```

Explanation:

| Method    | Behavior                                                        |
| --------- | --------------------------------------------------------------- |
| `call()`  | Invokes immediately with individual arguments                   |
| `apply()` | Invokes immediately with arguments in an array-like object      |
| `bind()`  | Returns a new function with bound `this` and optional arguments |

### 9. What is the difference between primitive and reference types?

Answer:

Primitive values include:

- String
- Number
- Boolean
- Undefined
- Null
- BigInt
- Symbol

Objects, arrays and functions are reference types.

```
let a = 10;
let b = a;

b = 20;

console.log(a); // 10
```

Primitive values are copied by value.

```
const user1 = { name: "Alex" };
const user2 = user1;

user2.name = "John";

console.log(user1.name); // John
```

Both variables refer to the same object.

Explanation: This distinction is important when passing objects to functions, modifying state and debugging unexpected mutations.

### 10. What is the difference between `==`, `===` and `Object.is()`?

Answer:

- `==`: Compares values after performing type coercion when required.
- `===`: Compares without converting types.
- `Object.is()`: Similar to strict equality, but handles a few edge cases differently.

```
console.log(5 == "5");       // true
console.log(5 === "5");      // false

console.log(NaN === NaN);    // false
console.log(Object.is(NaN, NaN)); // true

console.log(0 === -0);       // true
console.log(Object.is(0, -0)); // false
```

Explanation: Prefer `===` for normal comparisons. Use `Object.is()` when its special handling of `NaN` and signed zero is important.

### 11. What is type coercion in JavaScript?

Answer:

Type coercion is the automatic or explicit conversion of one data type into another.

```
console.log("5" + 2);  // "52"
console.log("5" - 2);  // 3
console.log(Boolean("hello")); // true
console.log(Number("123")); // 123
```

Explanation: The `+` operator may perform string concatenation, while operators such as `-` generally convert operands to numbers.

Unexpected coercion is one reason to use strict equality and explicit conversions in production code.

### 12. What is the difference between `null`, `undefined` and `NaN`?

Answer:

- `undefined`: A variable has been declared but not assigned a value, or a property does not exist.
- `null`: An intentional absence of a value.
- `NaN`: Represents an invalid numeric result.

```
let a;
console.log(a); // undefined

let b = null;
console.log(b); // null

console.log(Number("hello")); // NaN
console.log(typeof NaN); // "number"
```

Explanation: `NaN` is a special numeric value. Use `Number.isNaN()` to check whether a value is actually `NaN`.

```
Number.isNaN(NaN); // true
```

### 13. What is the prototype chain in JavaScript?

Answer:

JavaScript uses prototype-based inheritance. An object can inherit properties and methods from another object through its internal prototype link.

```
const animal = {
    eat() {
        console.log("Eating");
    }
};

const dog = Object.create(animal);

dog.bark = function () {
    console.log("Barking");
};

dog.eat();  // Eating
dog.bark(); // Barking
```

Explanation: When JavaScript cannot find a property on an object itself, it searches its prototype, then that prototype's prototype, continuing until it reaches `null`.

This lookup mechanism is called the prototype chain.

### 14. What are classes in JavaScript?

Answer:

Classes provide a cleaner syntax for creating objects and implementing prototype-based inheritance.

```
class User {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return `Hello ${this.name}`;
    }
}

const user = new User("Alex");

console.log(user.greet());
```

Inheritance:

```
class Admin extends User {
    deleteUser() {
        console.log("User deleted");
    }
}
```

Explanation: JavaScript classes are built on top of prototypes. Instance methods are generally stored on the class prototype rather than copied into every instance.

### 15. What is the difference between shallow copy and deep copy?

Answer:

A shallow copy creates a new outer object but keeps references to nested objects.

```
const original = {
    name: "Alex",
    address: {
        city: "Delhi"
    }
};

const copy = { ...original };

copy.address.city = "Mumbai";

console.log(original.address.city); // Mumbai
```

A deep copy duplicates nested data as well.

```
const deepCopy = structuredClone(original);
```

Explanation: Use a shallow copy when nested references can safely be shared. Use a deep copy when independent nested data is required.

`structuredClone()` supports many built-in data types, but cannot clone every JavaScript value, such as functions.

### 16. How do you clone an object in JavaScript?

Answer:

For a shallow copy:

```
const copy1 = { ...original };
const copy2 = Object.assign({}, original);
```

For a deep copy:

```
const copy3 = structuredClone(original);
```

Explanation: Avoid automatically using `JSON.parse(JSON.stringify(object))` as a deep-copy solution. It loses certain values, including `undefined`, functions and symbols, and does not preserve types such as `Date` correctly.

### 17. What are spread and rest operators?

Answer:

Both use `...`, but their purpose depends on where they appear.

Spread: Expands an iterable or object.

```
const numbers = [1, 2, 3];
const copy = [...numbers];

const user = { name: "Alex" };
const updated = { ...user, age: 25 };
```

Rest: Collects remaining elements into an array or object.

```
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3)); // 6
```

Explanation: Spread is useful for copying and combining arrays or objects. Rest is useful for functions with a variable number of arguments and for extracting remaining properties.

### 18. Explain `map()`, `filter()` and `reduce()`.

Answer:

These are array methods that process elements.

```
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

const even = numbers.filter(n => n % 2 === 0);
// [2, 4]

const total = numbers.reduce((sum, n) => sum + n, 0);
// 15
```

Explanation:

- `map()` transforms every element and returns a new array.
- `filter()` returns elements that satisfy a condition.
- `reduce()` combines elements into one accumulated result.

They are commonly used for transforming API responses and rendering data in React.

### 19. What is the difference between `find()`, `some()` and `every()`?

Answer:

```
const numbers = [2, 4, 6, 7];

numbers.find(n => n > 5);  // 6
numbers.some(n => n > 5);  // true
numbers.every(n => n > 0); // true
```

- `find()` returns the first matching element or `undefined`.
- `some()` returns `true` if at least one element matches.
- `every()` returns `true` if all elements match.

Explanation: Use `find()` when you need an item, `some()` when you need to check whether a condition exists, and `every()` when you need to validate all elements.

### 20. What is the difference between `forEach()` and `map()`?

Answer:

`map()` returns a new array containing transformed results. `forEach()` executes a callback for each element and returns `undefined`.

```
const numbers = [1, 2, 3];

const result = numbers.map(n => n * 2);
console.log(result); // [2, 4, 6]

const output = numbers.forEach(n => console.log(n));
console.log(output); // undefined
```

Explanation: Use `map()` when transforming data and `forEach()` when performing side effects such as logging or updating an external system.

## Asynchronous JavaScript and browser concepts

### 21. What is the JavaScript event loop?

Answer:

JavaScript uses an event loop to coordinate synchronous execution with asynchronous callbacks.

Its main parts include:

1. Call stack: Executes synchronous JavaScript.
2. Web APIs or runtime APIs: Handle operations such as timers and network requests.
3. Task queues: Hold callbacks ready to execute.
4. Event loop: Coordinates when queued callbacks can run.

Example:

```
console.log("Start");

setTimeout(() => console.log("Timer"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");
```

Output:

```
Start
End
Promise
Timer
```

Explanation: Synchronous code runs first. Promise callbacks run as microtasks, which are processed before the next timer task in this example.

### 22. What is the difference between microtasks and macrotasks?

Answer:

Microtasks are higher-priority queued callbacks that are processed after the current JavaScript execution finishes and before the next task.

Examples of microtasks:

- Promise `.then()`, `.catch()` and `.finally()` callbacks.
- `queueMicrotask()`.

Examples of tasks, often informally called macrotasks:

- `setTimeout()`.
- `setInterval()`.
- Many browser event callbacks.

Example:

```
console.log("A");

setTimeout(() => console.log("B"), 0);

queueMicrotask(() => console.log("C"));

console.log("D");
```

Output:

```
A
D
C
B
```

Explanation: The synchronous code runs first, then the microtask queue, then the next task.

### 23. What is a Promise in JavaScript?

Answer:

A Promise represents the eventual result of an asynchronous operation.

It has three states:

- Pending: Operation is still running.
- Fulfilled: Operation completed successfully.
- Rejected: Operation failed.

```
const promise = new Promise((resolve, reject) => {
    const success = true;

    if (success) {
        resolve("Completed");
    } else {
        reject(new Error("Failed"));
    }
});

promise
    .then(result => console.log(result))
    .catch(error => console.error(error));
```

Explanation: Promises help manage asynchronous operations without deeply nested callbacks.

### 24. What is `async/await`?

Answer:

`async/await` is syntax that makes Promise-based asynchronous code easier to read.

```
async function getUser() {
    try {
        const response = await fetch("/api/users/1");

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const user = await response.json();

        return user;
    } catch (error) {
        console.error(error);
    }
}
```

Explanation:

- An `async` function always returns a Promise.
- `await` pauses that function's execution until the Promise settles.
- It does not block the JavaScript thread.
- `try/catch` can handle rejected Promises.

### 25. Explain `Promise.all()`, `Promise.allSettled()`, `Promise.race()` and `Promise.any()`.

Answer:

| Method                 | Behavior                                                  |
| ---------------------- | --------------------------------------------------------- |
| `Promise.all()`        | Resolves when all succeed; rejects as soon as one rejects |
| `Promise.allSettled()` | Waits for all to settle, regardless of success or failure |
| `Promise.race()`       | Settles with the first Promise to settle                  |
| `Promise.any()`        | Fulfills with the first successfully fulfilled Promise    |

Example:

```
const results = await Promise.all([
    fetch("/api/users"),
    fetch("/api/products"),
    fetch("/api/orders")
]);
```

Explanation: Use `Promise.all()` when independent operations can run in parallel and every result is required. Use `allSettled()` when you need to collect every outcome, even if some operations fail.

### 26. How do you handle errors in asynchronous JavaScript?

Answer:

Use `try/catch` with `async/await`, or `.catch()` with Promise chains.

```
async function loadData() {
    try {
        const response = await fetch("/api/data");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Could not load data:", error);
        throw error;
    }
}
```

Explanation: A good production implementation should also distinguish network failures, HTTP errors, parsing errors and application-level errors. Do not silently swallow errors that callers need to know about.

### 27. What is debouncing?

Answer:

Debouncing delays function execution until a specified period has passed without another call.

```
function debounce(callback, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}
```

Example use cases:

- Search autocomplete.
- Input validation.
- Saving a form after the user stops typing.

Explanation: If a user types ten characters quickly, a debounced search can wait until typing stops before making a request.

### 28. What is throttling?

Answer:

Throttling ensures a function executes at most once within a given time interval.

```
function throttle(callback, delay) {
    let lastExecution = 0;

    return function (...args) {
        const now = Date.now();

        if (now - lastExecution >= delay) {
            lastExecution = now;
            callback.apply(this, args);
        }
    };
}
```

Example use cases:

- Scroll event handling.
- Mouse movement tracking.
- Repeated resize events.

Explanation: Debouncing waits until calls stop. Throttling limits how frequently calls can execute while events are still happening.

### 29. What is event bubbling and event capturing?

Answer:

Event propagation describes how events travel through the DOM.

- Capturing: Event travels from the outer ancestors towards the target.
- Target: Event reaches the target element.
- Bubbling: Event travels back through its ancestors.

```
parent.addEventListener("click", () => {
    console.log("Parent");
});

child.addEventListener("click", () => {
    console.log("Child");
});
```

Clicking the child normally logs:

```
Child
Parent
```

Explanation: Event listeners use bubbling by default. To listen during capturing, pass `true` or `{ capture: true }` as the third argument to `addEventListener()`.

### 30. What is event delegation?

Answer:

Event delegation means attaching an event listener to a parent element instead of attaching separate listeners to every child.

```
document.querySelector("#list").addEventListener("click", event => {
    const item = event.target.closest("li");

    if (item && event.currentTarget.contains(item)) {
        console.log(item.textContent);
    }
});
```

Explanation: Event delegation uses event bubbling. It is useful for dynamic lists because newly added child elements can be handled without attaching new listeners individually.

### 31. What is the difference between `preventDefault()` and `stopPropagation()`?

Answer:

- `preventDefault()` prevents the browser's default behavior.
- `stopPropagation()` prevents the event from continuing through the propagation path.

```
form.addEventListener("submit", event => {
    event.preventDefault();
    console.log("Custom form submission");
});
```

Explanation: Preventing a form's default submission does not automatically stop its event from bubbling to parent elements. These methods solve different problems.

### 32. What is the difference between `event.target` and `event.currentTarget`?

Answer:

- `event.target`: The original element where the event occurred.
- `event.currentTarget`: The element whose event listener is currently executing.

```
parent.addEventListener("click", event => {
    console.log(event.target);
    console.log(event.currentTarget);
});
```

Explanation: In event delegation, `target` often identifies the clicked child, while `currentTarget` identifies the parent holding the listener.

### 33. What is the difference between ES Modules and CommonJS?

Answer:

Both are JavaScript module systems.

ES Modules:

```
export const name = "Alex";

import { name } from "./user.js";
```

CommonJS:

```
const name = "Alex";

module.exports = name;

const userName = require("./user");
```

Explanation: ES Modules use static `import` and `export` syntax and support features such as tree shaking. CommonJS uses `require()` and `module.exports` and is historically common in Node.js projects.

### 34. What is synchronous versus asynchronous execution?

Answer:

Synchronous execution processes operations sequentially. Each operation completes before the next one executes.

Asynchronous execution allows an operation to be initiated without blocking the rest of the program while it waits.

```
console.log("First");

setTimeout(() => {
    console.log("Third");
}, 1000);

console.log("Second");
```

Output:

```
First
Second
Third
```

Explanation: Network requests, timers and many I/O operations are commonly handled asynchronously. This keeps applications responsive while waiting for slow operations.

### 35. How does the Fetch API work? Does it reject on HTTP errors?

Answer:

The Fetch API makes HTTP requests and returns a Promise that resolves to a `Response` object.

```
async function getUsers() {
    const response = await fetch("/api/users");

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}
```

Explanation: Fetch generally rejects on network-level failures, but it does not automatically reject for HTTP statuses like `400`, `404` or `500`. You must check `response.ok` or `response.status`.

### 36. What is `AbortController`?

Answer:

`AbortController` allows you to cancel operations that support an `AbortSignal`, including Fetch requests.

```
const controller = new AbortController();

fetch("/api/users", {
    signal: controller.signal
});

// Cancel the request
controller.abort();
```

Explanation: It is useful when a user changes search terms quickly or navigates away from a page. Canceling an obsolete request prevents unnecessary work and helps avoid outdated results being displayed.

### 37. What is CORS?

Answer:

CORS stands for Cross-Origin Resource Sharing. It is a browser-enforced mechanism that controls whether a web page can access resources from a different origin.

An origin consists of the scheme, host and port.

For example, these are different origins:

```
http://localhost:3000
http://localhost:8000
```

Explanation: The server must return appropriate CORS headers, such as:

```
Access-Control-Allow-Origin: http://localhost:3000
```

Some requests also trigger a preflight `OPTIONS` request.

CORS is not an authentication mechanism. It does not stop non-browser clients such as command-line tools from making HTTP requests.

### 38. What is the difference between localStorage, sessionStorage and cookies?

Answer:

| Feature                               | localStorage  | sessionStorage                 | Cookies                   |
| ------------------------------------- | ------------- | ------------------------------ | ------------------------- |
| Lifetime                              | Until cleared | Usually until tab session ends | Configurable              |
| Scope                                 | Same origin   | Same origin and tab session    | Controlled by domain/path |
| Sent automatically with HTTP requests | No            | No                             | Yes, when applicable      |
| Typical capacity                      | Larger        | Larger                         | Small                     |
| JavaScript access                     | Yes           | Yes                            | Depends on HttpOnly       |

Explanation: `HttpOnly` cookies cannot be accessed through JavaScript, which helps reduce token theft through certain XSS attacks. Cookies can also use `Secure` and `SameSite` attributes.

Do not store sensitive authentication credentials in browser storage without carefully considering the security implications.

### 39. What causes memory leaks in JavaScript?

Answer:

A memory leak happens when memory that is no longer needed remains reachable and cannot be reclaimed.

Common causes:

- Unremoved event listeners.
- Timers that continue running.
- Unnecessary global variables.
- Closures retaining large objects.
- Detached DOM elements still referenced by JavaScript.

```
const timer = setInterval(() => {
    console.log("Running");
}, 1000);

// Clean up when no longer needed
clearInterval(timer);
```

Explanation: JavaScript has automatic garbage collection, but it cannot reclaim objects that are still reachable through references.

### 40. How does garbage collection work in JavaScript?

Answer:

JavaScript automatically manages memory. Modern engines generally use reachability-based garbage collection, commonly involving mark-and-sweep techniques.

The engine identifies objects reachable from roots such as:

- Global variables.
- Active function call stacks.
- Other references maintained by the runtime.

Objects that are no longer reachable can be collected.

Explanation: Developers normally do not manually free memory. They should remove unnecessary references, clean up listeners and timers, and avoid retaining large objects unnecessarily.

# Part 2: TypeScript — 30 questions

## TypeScript fundamentals

### 41. What is TypeScript, and why is it used?

Answer:

TypeScript is a programming language built on JavaScript that adds a static type system. It helps developers catch many errors during development and makes code easier to maintain.

```
function add(a: number, b: number): number {
    return a + b;
}

add(10, 20); 
// add("10", 20); // Type error
```

Explanation: TypeScript compiles into JavaScript. Browsers and Node.js ultimately execute JavaScript, not TypeScript types.

Its biggest advantages include better IDE support, safer refactoring, autocomplete and improved maintainability in large applications.

### 42. What is the difference between `any` and `unknown`?

Answer:

Both can hold values of any type, but `unknown` is safer.

```
let value1: any = "Hello";
console.log(value1.toUpperCase()); // Allowed

let value2: unknown = "Hello";
// console.log(value2.toUpperCase()); // Error

if (typeof value2 === "string") {
    console.log(value2.toUpperCase());
}
```

Explanation:

- `any` disables most type checking.
- `unknown` requires you to verify the type before using the value.

Prefer `unknown` when accepting untrusted data, such as API responses or external input.

### 43. What is the `never` type?

Answer:

`never` represents values that should never occur.

It commonly appears in functions that never return normally or in exhaustive type checking.

```
function throwError(message: string): never {
    throw new Error(message);
}
```

Another example:

```
type Status = "success" | "failure";

function handleStatus(status: Status) {
    switch (status) {
        case "success":
            return "Completed";

        case "failure":
            return "Failed";

        default: {
            const exhaustiveCheck: never = status;
            return exhaustiveCheck;
        }
    }
}
```

Explanation: `never` helps identify missing cases when a union type changes. If a new status is added, TypeScript can flag the incomplete switch statement.

### 44. What is the difference between `void` and `undefined`?

Answer:

`void` indicates that a function's return value should not be used. `undefined` is an actual JavaScript value and can be used as a return type.

```
function logMessage(): void {
    console.log("Hello");
}

function getValue(): undefined {
    return undefined;
}
```

Explanation: A function returning `void` can still technically return a value, but callers are expected to ignore it. In everyday TypeScript, use `void` for functions that are intended to perform an action rather than return useful data.

### 45. What is the difference between `interface` and `type`?

Answer:

Both can describe object structures.

Using an interface:

```
interface User {
    id: number;
    name: string;
}
```

Using a type alias:

```
type User = {
    id: number;
    name: string;
};
```

Explanation:

| Interface                             | Type                                 |
| ------------------------------------- | ------------------------------------ |
| Describes object contracts            | Can describe objects and other types |
| Supports declaration merging          | Does not support declaration merging |
| Supports `extends`                    | Supports intersections using `&`     |
| Cannot directly represent union types | Can represent union types            |

For example:

```
type ID = number | string;
type Admin = User & { role: "admin" };
```

Both are valid choices for object modelling. Consistency within the project is often more important than choosing one universally.

### 46. What are union and intersection types?

Answer:

A union (`|`) allows a value to be one of several types.

```
type ID = string | number;

let userId: ID = 100;
userId = "ABC123";
```

An intersection (`&`) combines multiple types.

```
type User = {
    name: string;
};

type Employee = {
    employeeId: number;
};

type Staff = User & Employee;

const person: Staff = {
    name: "Alex",
    employeeId: 101
};
```

Explanation: Use unions when something can be one of several alternatives. Use intersections when an object must satisfy multiple type definitions simultaneously.

### 47. What is type narrowing in TypeScript?

Answer:

Type narrowing means reducing a broad type to a more specific type using runtime checks.

```
function printValue(value: string | number) {
    if (typeof value === "string") {
        console.log(value.toUpperCase());
    } else {
        console.log(value.toFixed(2));
    }
}
```

Explanation: TypeScript understands the control flow and determines the type of `value` within each branch.

Common narrowing techniques include `typeof`, `instanceof`, equality checks, `in` checks and custom type guards.

### 48. What is a discriminated union?

Answer:

A discriminated union is a union of object types that share a common property with different literal values.

```
type Response =
    | { status: "success"; data: string }
    | { status: "error"; message: string }
    | { status: "loading" };

function handleResponse(response: Response) {
    if (response.status === "success") {
        console.log(response.data);
    }

    if (response.status === "error") {
        console.log(response.message);
    }
}
```

Explanation: Checking the common `status` property allows TypeScript to determine which object structure is available. This is useful for API responses, state management and UI loading states.

### 49. What are generics in TypeScript?

Answer:

Generics allow you to write reusable code that works with different types while preserving type information.

```
function identity<T>(value: T): T {
    return value;
}

const name = identity<string>("Alex");
const age = identity<number>(25);
```

Explanation: Instead of using `any`, generics preserve the relationship between input and output types.

This is especially useful for reusable API functions, utility functions, collections and React components.

### 50. What are generic constraints?

Answer:

Generic constraints restrict the types that can be passed to a generic function.

```
function getLength<T extends { length: number }>(value: T): number {
    return value.length;
}

getLength("Hello"); 
getLength([1, 2, 3]);

// getLength(123); // Error
```

Explanation: `extends` tells TypeScript that the generic type must satisfy a particular structure. This lets you safely access the `length` property.

### 51. What is `keyof` in TypeScript?

Answer:

`keyof` creates a union of an object's property names.

```
type User = {
    id: number;
    name: string;
    email: string;
};

type UserKeys = keyof User;

// "id" | "name" | "email"
```

A practical example:

```
function getProperty<T, K extends keyof T>(
    object: T,
    key: K
): T[K] {
    return object[key];
}
```

Explanation: `keyof` is useful for writing type-safe utilities that access object properties dynamically.

### 52. What is the `typeof` operator in TypeScript?

Answer:

In a type position, `typeof` extracts the type of an existing JavaScript variable or value.

```
const user = {
    name: "Alex",
    age: 25
};

type User = typeof user;
```

The resulting type is equivalent to:

```
type User = {
    name: string;
    age: number;
};
```

Explanation: This helps prevent duplication between an existing value and its type definition.

### 53. What is indexed access typing?

Answer:

Indexed access types let you extract the type of a particular property.

```
type User = {
    id: number;
    name: string;
    active: boolean;
};

type UserName = User["name"]; // string
type UserId = User["id"];     // number
```

You can also access multiple properties:

```
type UserInfo = User["id" | "name"];
// number | string
```

Explanation: It is useful when one type needs to reuse part of another type without redefining it.

### 54. What are utility types in TypeScript?

Answer:

Utility types are built-in types that transform existing types.

Common examples:

```
interface User {
    id: number;
    name: string;
    email: string;
}
```

Partial: Makes every property optional.

```
type UpdateUser = Partial<User>;
```

Required: Makes every property required.

```
type RequiredUser = Required<User>;
```

Pick: Selects specific properties.

```
type UserPreview = Pick<User, "id" | "name">;
```

Omit: Excludes selected properties.

```
type PublicUser = Omit<User, "email">;
```

Explanation: These are very useful when defining create, update, response and database models without repeating entire interfaces.

### 55. What is the `Record` utility type?

Answer:

`Record<K, V>` creates an object type whose keys are of type `K` and values are of type `V`.

```
type Role = "admin" | "user" | "manager";

const permissions: Record<Role, boolean> = {
    admin: true,
    user: false,
    manager: true
};
```

Explanation: `Record` is useful for dictionaries, lookup maps, configuration objects and permission mappings.

### 56. What is the `Readonly` utility type?

Answer:

`Readonly<T>` makes all properties of a type read-only.

```
interface User {
    name: string;
    age: number;
}

const user: Readonly<User> = {
    name: "Alex",
    age: 25
};

// user.name = "John"; // Error
```

Explanation: It prevents direct reassignment of properties at the TypeScript type level. It is shallow by default, so nested objects can still be mutable unless their types are also made read-only.

### 57. What is the difference between enums and union types?

Answer:

Enums define a named set of values.

```
enum Status {
    Pending,
    Success,
    Failed
}
```

Union types can represent a set of literal values.

```
type Status = "pending" | "success" | "failed";
```

Explanation: Union types are often simpler for string-based states and compile away entirely. Enums are useful when a named enum-like object is required, but their runtime behavior and emitted JavaScript should be considered.

### 58. What is the difference between optional properties and nullable properties?

Answer:

An optional property may be absent. A nullable property must be present but may contain `null`.

```
type User = {
    name: string;
    age?: number;
    email: string | null;
};
```

Explanation:

- `age?` means the property may not exist.
- `email: string | null` means the property exists but may intentionally have no email value.

When `strictNullChecks` is enabled, TypeScript checks these cases separately.

### 59. What are function types and function overloads?

Answer:

A function type describes a function's input and output.

```
type Calculator = (a: number, b: number) => number;

const add: Calculator = (a, b) => a + b;
```

Function overloads allow different calling signatures.

```
function format(value: string): string;
function format(value: number): string;

function format(value: string | number): string {
    return String(value);
}
```

Explanation: Function types help define contracts for callbacks and services. Overloads give callers more precise types when a function supports different input patterns.

### 60. What is type inference?

Answer:

Type inference means TypeScript automatically determines the type based on the assigned value or surrounding context.

```
let name = "Alex";
// Inferred as string

let age = 25;
// Inferred as number

const numbers = [1, 2, 3];
// Inferred as number[]
```

Explanation: You do not need to explicitly annotate every variable. Use annotations when they improve clarity, define public contracts or protect against overly broad inferred types.

### 61. What is structural typing?

Answer:

TypeScript primarily uses structural typing. An object is compatible with a type if it has the required structure.

```
type User = {
    name: string;
};

const employee = {
    name: "Alex",
    employeeId: 101
};

const user: User = employee; // Allowed
```

Explanation: Type compatibility is based primarily on the members that a value has, rather than the name of the type or the class from which it originated.

### 62. What is excess property checking?

Answer:

TypeScript performs additional checks on object literals to catch unexpected properties.

```
type User = {
    name: string;
};

const user: User = {
    name: "Alex",
    age: 25 // Error
};
```

But assigning the object to a variable first can change the result:

```
const employee = {
    name: "Alex",
    age: 25
};

const user: User = employee; // Allowed
```

Explanation: TypeScript is structurally typed, but fresh object literals receive an extra check to help catch spelling mistakes and unintended properties.

### 63. What is the difference between type assertion and type casting?

Answer:

TypeScript uses type assertions to tell the compiler how you want it to treat a value.

```
const input = document.querySelector("#email") as HTMLInputElement;

console.log(input.value);
```

Explanation: An assertion does not convert the value at runtime. It only changes the compiler's understanding of the value.

For actual conversion, use JavaScript operations:

```
const numberValue = Number("123");
```

Assertions should be used carefully because an incorrect assertion can hide a real runtime error.

### 64. What is the `satisfies` operator?

Answer:

The `satisfies` operator checks that a value conforms to a type without simply replacing the value's more specific inferred type with that type.

```
type Config = {
    mode: "development" | "production";
    debug: boolean;
};

const config = {
    mode: "development",
    debug: true
} satisfies Config;
```

Explanation: This is particularly useful for configuration objects, route definitions and lookup maps where you want type validation while retaining useful literal type information.

### 65. What is `as const`?

Answer:

`as const` tells TypeScript to infer literal types and make properties read-only.

```
const status = {
    SUCCESS: "success",
    FAILED: "failed"
} as const;
```

The property values are inferred as the literal types `"success"` and `"failed"` instead of the general `string` type.

Explanation: It is useful for defining constants, action types and fixed configuration values.

### 66. What are mapped types?

Answer:

Mapped types create a new type by iterating over the properties of an existing type.

```
type User = {
    name: string;
    age: number;
};

type OptionalUser = {
    [K in keyof User]?: User[K];
};
```

This produces:

```
type OptionalUser = {
    name?: string;
    age?: number;
};
```

Explanation: Mapped types power utility types such as `Partial`, `Readonly` and `Required`.

### 67. What are conditional types?

Answer:

Conditional types select a type based on a condition.

Syntax:

```
T extends U ? X : Y
```

Example:

```
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

Explanation: They are useful for building reusable types whose output depends on another type.

### 68. What is the `infer` keyword?

Answer:

`infer` allows TypeScript to infer a type within a conditional type.

```
type ReturnTypeOf<T> =
    T extends (...args: any[]) => infer R ? R : never;

type Result = ReturnTypeOf<() => number>;
// number
```

Explanation: `infer` is often used to extract function return types, Promise result types, array element types and other nested types.

### 69. What is declaration merging?

Answer:

Declaration merging is a TypeScript feature where multiple declarations with the same name can be combined.

```
interface User {
    name: string;
}

interface User {
    age: number;
}
```

The resulting interface is equivalent to:

```
interface User {
    name: string;
    age: number;
}
```

Explanation: This is useful for extending third-party types and augmenting library declarations. It applies to certain declarations, including interfaces and namespaces, not universally to all type definitions.

### 70. What is `tsconfig.json`, and which compiler options are important?

Answer:

`tsconfig.json` is the configuration file for a TypeScript project. It controls compilation behavior, type checking and language features.

Important options include:

| Option             | Purpose                                  |
| ------------------ | ---------------------------------------- |
| `strict`           | Enables the strict type-checking family  |
| `noImplicitAny`    | Reports implicit `any` types             |
| `strictNullChecks` | Checks `null` and `undefined` explicitly |
| `target`           | Specifies the JavaScript language target |
| `module`           | Controls module generation               |
| `moduleResolution` | Controls how modules are resolved        |
| `outDir`           | Specifies the output directory           |
| `noEmit`           | Checks types without generating output   |

Explanation: For production applications, enabling `strict` is generally a good starting point. It encourages explicit and reliable type definitions across the codebase.

# Part 3: React — 50 questions

## React fundamentals and components

### 71. What is React?

Answer:

React is a JavaScript library used to build user interfaces through reusable components.

Its main features include:

- Component-based architecture.
- Declarative UI development.
- State and props management.
- Hooks.
- Efficient UI updates.
- Support for server-side and client-side rendering architectures.

Explanation: Instead of manually manipulating the DOM whenever data changes, you describe what the UI should look like for a particular state. React manages updating the rendered interface.

### 72. What is declarative programming in React?

Answer:

Declarative programming means describing the desired result rather than specifying every step required to achieve it.

Imperative approach:

```
const element = document.createElement("h1");
element.textContent = "Hello";
document.body.appendChild(element);
```

Declarative React approach:

```
function App() {
    return <h1>Hello</h1>;
}
```

Explanation: React determines how to update the DOM based on the component's current state and props. This makes complex user interfaces easier to manage.

### 73. What is the Virtual DOM?

Answer:

The Virtual DOM is a representation of the UI maintained by React using JavaScript objects.

When component state or props change, React creates an updated representation and determines what changes are needed in the actual DOM.

Explanation: The Virtual DOM is not automatically faster than every direct DOM operation. Its value is primarily in providing a declarative programming model and allowing React to coordinate updates efficiently.

### 74. What is reconciliation in React?

Answer:

Reconciliation is the process React uses to determine how the existing UI should change when a component produces a new element tree.

React compares the new tree with the previous one and determines which parts need to be updated.

For example:

```
function Counter({ count }) {
    return <h1>Count: {count}</h1>;
}
```

When `count` changes, React updates the relevant UI rather than rebuilding the entire page.

Explanation: Element types and keys are important in reconciliation. They help React determine whether an existing component can be reused or needs to be recreated.

### 75. What is JSX?

Answer:

JSX stands for JavaScript XML. It is a syntax extension that allows us to write HTML-like markup inside JavaScript.

```
function Welcome() {
    const name = "Alex";

    return <h1>Hello, {name}</h1>;
}
```

It is transformed into JavaScript calls that create React elements.

Explanation: JSX supports JavaScript expressions inside `{}`. It is not exactly HTML; for example, use `className` rather than `class`, and `onClick` rather than `onclick`.

### 76. What is the difference between functional and class components?

Answer:

Functional components are JavaScript functions that return React elements.

```
function Welcome() {
    return <h1>Hello</h1>;
}
```

Class components extend `React.Component`.

```
class Welcome extends React.Component {
    render() {
        return <h1>Hello</h1>;
    }
}
```

Explanation:

| Functional components           | Class components           |
| ------------------------------- | -------------------------- |
| Use Hooks for state and effects | Use lifecycle methods      |
| Less boilerplate                | More boilerplate           |
| Preferred for modern React      | Common in older projects   |
| Can use custom Hooks            | Cannot call Hooks directly |

Modern React development generally favors functional components.

### 77. What is the difference between props and state?

Answer:

Props and state are both used to manage component data, but they serve different purposes.

Props: Data passed from a parent component to a child component.

```
function User({ name }) {
    return <h1>{name}</h1>;
}

<User name="Alex" />
```

State: Data managed inside a component that can change over time.

```
function Counter() {
    const [count, setCount] = React.useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}
```

Explanation: Props are read-only from the receiving component's perspective. State is managed by the component or its state owner and updated through React's state mechanisms.

### 78. When does a React component re-render?

Answer:

A component typically re-renders when:

1. Its state changes.
2. Its parent renders and React renders the child as part of that update.
3. A context value it consumes changes.
4. An external store it subscribes to reports a relevant update.

Example:

```
function Counter() {
    const [count, setCount] = useState(0);

    console.log("Rendering");

    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}
```

Explanation: A re-render means React calls the component function again to calculate its output. It does not necessarily mean the entire DOM is recreated.

### 79. Why are keys important in React lists?

Answer:

Keys help React identify elements across renders.

```
const users = [
    { id: 1, name: "Alex" },
    { id: 2, name: "John" }
];

function UserList() {
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    {user.name}
                </li>
            ))}
        </ul>
    );
}
```

Explanation: Keys help React preserve component identity when items are added, removed or reordered.

Avoid using array indexes as keys when the list can change order or items can be inserted or removed. Prefer stable unique IDs.

### 80. What is the difference between controlled and uncontrolled components?

Answer:

A controlled form element gets its value from React state.

```
function Form() {
    const [name, setName] = useState("");

    return (
        <input
            value={name}
            onChange={e => setName(e.target.value)}
        />
    );
}
```

An uncontrolled form element maintains its value in the DOM.

```
function Form() {
    const inputRef = useRef(null);

    return (
        <>
            <input ref={inputRef} defaultValue="Alex" />
            <button onClick={() => alert(inputRef.current.value)}>
                Submit
            </button>
        </>
    );
}
```

Explanation: Controlled inputs are useful for validation and dynamic forms. Uncontrolled inputs can be useful for simpler forms and integrations with non-React code.

## React Hooks and state management

### 81. What is `useState()`?

Answer:

`useState()` is a React Hook that adds state to functional components.

```
import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );
}
```

Explanation: It returns the current state and a function to update it. When the state is updated, React schedules a re-render.

### 82. Are React state updates synchronous or asynchronous?

Answer:

React state setters schedule updates; they do not immediately change the state variable in the currently executing function.

```
function Counter() {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
        console.log(count);
    }

    return <button onClick={increment}>Increment</button>;
}
```

The log prints the state value from the current render, not the updated value.

Explanation: React batches state updates in many situations to avoid unnecessary renders. In modern React, automatic batching also applies to many updates originating in Promises and timers.

### 83. Why should we use functional state updates?

Answer:

Functional updates are useful when the next state depends on the previous state.

```
setCount(prev => prev + 1);
```

Consider:

```
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

These updates may all use the same `count` value from the current render.

Instead:

```
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

Explanation: React processes each updater using the result of the previous update. In this example, the counter increases by three.

### 84. What is lifting state up in React?

Answer:

Lifting state up means moving shared state to the closest common parent of the components that need it.

```
function Parent() {
    const [message, setMessage] = useState("");

    return (
        <>
            <Input value={message} onChange={setMessage} />
            <Preview message={message} />
        </>
    );
}
```

Explanation: Both children use the same state maintained by their parent. This ensures that shared data remains consistent.

### 85. What is prop drilling?

Answer:

Prop drilling occurs when data is passed through multiple intermediate components just to reach a deeply nested component.

```
function App() {
    const user = { name: "Alex" };

    return <Layout user={user} />;
}

function Layout({ user }) {
    return <Sidebar user={user} />;
}

function Sidebar({ user }) {
    return <Profile user={user} />;
}
```

Explanation: It becomes difficult to maintain when applications grow. Solutions include Context API, component composition and state management libraries.

### 86. What is the Context API?

Answer:

Context allows components to share data without passing props through every intermediate component.

```
const UserContext = createContext(null);

function App() {
    const user = { name: "Alex" };

    return (
        <UserContext.Provider value={user}>
            <Profile />
        </UserContext.Provider>
    );
}

function Profile() {
    const user = useContext(UserContext);

    return <h1>{user.name}</h1>;
}
```

Explanation: Common use cases include:

- Authentication information.
- Theme settings.
- Language preferences.
- Application-level configuration.

Avoid putting all frequently changing application state into one large context. Context updates can cause consuming components to render again.

### 87. What is `useEffect()`?

Answer:

`useEffect()` lets a component synchronize with external systems after rendering.

Common use cases include:

- API subscriptions or data synchronization.
- Event listeners.
- Timers.
- WebSocket connections.
- Integrating third-party systems.

```
function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/api/users")
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    return <pre>{JSON.stringify(users)}</pre>;
}
```

Explanation: Effects are intended for synchronization with external systems, not for every calculation or state change. Derived values can often be calculated directly during rendering.

### 88. Explain the dependency array in `useEffect()`.

Answer:

The dependency array controls when an effect should re-synchronize.

No dependency array:

```
useEffect(() => {
    console.log("After every render");
});
```

Empty dependency array:

```
useEffect(() => {
    console.log("After initial mount");
}, []);
```

With dependencies:

```
useEffect(() => {
    console.log("User changed");
}, [userId]);
```

Explanation: React compares dependencies with their previous values using `Object.is`. The effect re-runs when a dependency changes.

### 89. What is the cleanup function in `useEffect()`?

Answer:

The cleanup function removes resources created by an effect before the effect re-synchronizes and when the component is removed.

```
useEffect(() => {
    const controller = new AbortController();

    fetch("/api/users", {
        signal: controller.signal
    })
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => {
            if (error.name !== "AbortError") {
                console.error(error);
            }
        });

    return () => {
        controller.abort();
    };
}, []);
```

Explanation: Cleanup is important for:

- Cancelling requests.
- Removing event listeners.
- Clearing timers.
- Closing WebSocket connections.
- Avoiding outdated subscriptions.

This is particularly useful when a component's dependencies change or users navigate away quickly.

### 90. What is the difference between `useEffect()` and `useLayoutEffect()`?

Answer:

Both are Hooks that run after React commits DOM updates, but their timing differs.

- `useEffect()`: Generally runs after the browser paints.
- `useLayoutEffect()`: Runs after the DOM update but before the browser paints.

Example:

```
useLayoutEffect(() => {
    const height = elementRef.current.getBoundingClientRect().height;
    setHeight(height);
}, []);
```

Explanation: Use `useLayoutEffect()` when you must measure or adjust the DOM before the user sees the updated screen, such as positioning a tooltip. Prefer `useEffect()` for normal effects because layout effects can block painting.

### 91. What is `useRef()`?

Answer:

`useRef()` stores a mutable value that persists between renders without triggering a re-render when changed.

```
function Input() {
    const inputRef = useRef(null);

    function focusInput() {
        inputRef.current.focus();
    }

    return (
        <>
            <input ref={inputRef} />
            <button onClick={focusInput}>Focus</button>
        </>
    );
}
```

Explanation: Common use cases include:

- Accessing DOM elements.
- Storing timer IDs.
- Keeping previous values.
- Maintaining mutable values that do not directly affect rendering.

### 92. What is `useMemo()`?

Answer:

`useMemo()` caches the result of a calculation between renders until its dependencies change.

```
function ProductList({ products, search }) {
    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [products, search]);

    return <div>{filteredProducts.length}</div>;
}
```

Explanation: It can reduce the cost of expensive calculations. However, it adds complexity and should be used when there is a meaningful performance benefit, not for every variable.

### 93. What is `useCallback()`?

Answer:

`useCallback()` caches a function definition between renders until its dependencies change.

```
function Parent() {
    const [count, setCount] = useState(0);

    const handleClick = useCallback(() => {
        console.log("Clicked");
    }, []);

    return (
        <>
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>

            <Child onClick={handleClick} />
        </>
    );
}
```

Explanation: It is useful when passing callbacks to memoized child components or when a stable function reference is required by another Hook.

### 94. What is `React.memo()`?

Answer:

`React.memo()` is a higher-order component that can skip rendering a component when its props have not changed.

```
const User = React.memo(function User({ name }) {
    console.log("User rendered");

    return <h1>{name}</h1>;
});
```

Explanation: React normally compares each prop with its previous value using `Object.is`. A new object or function reference may cause the component to render again even when its contents are equivalent.

`React.memo()` is a performance optimization, not a guarantee that a component will never render again.

### 95. What are custom Hooks?

Answer:

Custom Hooks are reusable functions that encapsulate React Hook logic.

```
function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const updateWidth = () => setWidth(window.innerWidth);

        window.addEventListener("resize", updateWidth);

        return () => {
            window.removeEventListener("resize", updateWidth);
        };
    }, []);

    return width;
}
```

Usage:

```
function App() {
    const width = useWindowWidth();

    return <h1>Width: {width}</h1>;
}
```

Explanation: Custom Hooks help reuse stateful logic without duplicating code or introducing unnecessary wrapper components. The Hook itself does not share state between different component instances.

### 96. What are the Rules of Hooks?

Answer:

React Hooks must follow two important rules:

1. Call Hooks only at the top level of a function component or custom Hook.
2. Do not call Hooks conditionally, inside loops or nested functions.

Incorrect:

```
if (isLoggedIn) {
    const [user, setUser] = useState(null);
}
```

Correct:

```
const [user, setUser] = useState(null);

if (!isLoggedIn) {
    return <Login />;
}
```

Explanation: React relies on Hooks being called in the same order on every render to associate Hook state with the correct component.

### 97. What is a stale closure in React?

Answer:

A stale closure occurs when a callback captures values from an older render and continues using those values.

```
function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            console.log(count);
        }, 1000);

        return () => clearInterval(timer);
    }, []);
}
```

Here, the effect captures the initial value of `count`.

Solutions:

- Add the required dependencies.
- Use functional state updates where appropriate.
- Use refs for values that need to stay current without triggering a re-render.

Explanation: Stale closures are particularly common in timers, subscriptions and asynchronous callbacks.

### 98. What is React Strict Mode?

Answer:

`StrictMode` is a development-only tool that helps identify potential problems in React applications.

```
import { StrictMode } from "react";

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
```

It can intentionally re-render components and perform an additional effect setup and cleanup cycle in development to help uncover bugs.

Explanation: This is why some logs or effect activity may appear twice during development. It does not mean React will necessarily perform the same extra checks in production.

### 99. How do you handle events in React?

Answer:

React uses event props such as `onClick`, `onChange` and `onSubmit`.

```
function Button() {
    function handleClick() {
        console.log("Button clicked");
    }

    return (
        <button onClick={handleClick}>
            Click me
        </button>
    );
}
```

Explanation: Pass a function as the event handler, not the result of calling it.

Correct:

```
<button onClick={handleClick}>Click</button>
```

Incorrect:

```
<button onClick={handleClick()}>Click</button>
```

The second version invokes the function during rendering.

### 100. How do you handle forms and validation in React?

Answer:

One common approach is to manage input values with state and validate them before submission.

```
function LoginForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (!email.includes("@")) {
            setError("Enter a valid email");
            return;
        }

        setError("");
        console.log("Submitted:", email);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={email}
                onChange={event => setEmail(event.target.value)}
            />

            {error && <p>{error}</p>}

            <button type="submit">Submit</button>
        </form>
    );
}
```

Explanation: For real applications, validate on both frontend and backend. Libraries such as React Hook Form and Zod can help manage larger forms and schemas.

### 101. How do you implement conditional rendering in React?

Answer:

React supports multiple JavaScript approaches to conditional rendering.

Using `if`:

```
if (isLoggedIn) {
    return <Dashboard />;
}

return <Login />;
```

Using ternary:

```
return isLoggedIn ? <Dashboard /> : <Login />;
```

Using logical AND:

```
return isLoading && <p>Loading...</p>;
```

Explanation: Choose the approach that keeps the UI logic easy to understand. Be careful with expressions such as `count && <Component />` because a value of `0` can be rendered as text.

### 102. What is `useReducer()`?

Answer:

`useReducer()` manages state using a reducer function that receives the current state and an action and returns the next state.

```
function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };

        case "decrement":
            return { count: state.count - 1 };

        default:
            return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    return (
        <>
            <button onClick={() => dispatch({ type: "increment" })}>
                Increment
            </button>

            <h1>{state.count}</h1>
        </>
    );
}
```

Explanation: `useReducer()` is useful when state transitions are complex or multiple related state values must be updated together.

## State management and application architecture

### 103. What is Redux?

Answer:

Redux is a predictable state management library that manages shared application state through a centralized store.

Its traditional data flow consists of:

1. A component dispatches an action.
2. The reducer calculates the next state.
3. The store updates.
4. Connected components receive the updated state.

Modern Redux development generally uses Redux Toolkit.

Example:

```
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: { value: 0 },
    reducers: {
        increment(state) {
            state.value += 1;
        }
    }
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
```

Explanation: Redux Toolkit uses Immer internally, allowing reducer code to look mutable while producing immutable state updates.

### 104. What is the difference between Context API and Redux?

Answer:

| Context API                                         | Redux                                       |
| --------------------------------------------------- | ------------------------------------------- |
| Built into React                                    | External library                            |
| Useful for sharing values                           | Designed for structured state management    |
| Less setup for simple use cases                     | More features and conventions               |
| No built-in action/reducer architecture             | Uses actions and reducers                   |
| Context consumers update when their context changes | Offers more selective subscription patterns |

Explanation: Context is a good fit for relatively simple shared values such as themes and authentication information.

Redux can be useful when the application needs complex state transitions, predictable updates, middleware, debugging tools and well-organized global state.

Neither is automatically necessary for every React application.

### 105. What is the difference between client state and server state?

Answer:

Client state is owned by the frontend application.

Examples:

- Modal visibility.
- Selected tab.
- Current form input.
- Local UI preferences.

Server state represents data owned by an external backend.

Examples:

- User profiles.
- Product lists.
- Orders.
- Dashboard analytics.

Explanation: Server state requires concerns such as caching, refetching, synchronization, loading states, retries and invalidation.

Libraries such as TanStack Query and SWR are designed to manage server state, while Context, Redux or component state can manage client state.

### 106. What are Error Boundaries in React?

Answer:

Error Boundaries are components that catch rendering errors in their descendant component tree and display fallback UI.

A basic class-based example:

```
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}
```

Explanation: Error Boundaries are useful for preventing an error in one part of the UI from taking down the entire application.

Traditional Error Boundaries do not catch errors in event handlers, ordinary asynchronous callbacks or errors thrown inside the boundary itself.

### 107. What is Suspense in React?

Answer:

Suspense lets a component display a fallback while its children are not ready.

```
<Suspense fallback={<p>Loading...</p>}>
    <Profile />
</Suspense>
```

Explanation: Suspense integrates with supported React features, including lazy-loaded components and Suspense-enabled data sources.

It is not a universal mechanism that automatically detects every ordinary `fetch()` call inside `useEffect()`.

### 108. What is `React.lazy()`?

Answer:

`React.lazy()` allows a component to be loaded dynamically when needed.

```
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));

function App() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Dashboard />
        </Suspense>
    );
}
```

Explanation: This helps reduce the initial JavaScript bundle size by loading some components only when required.

### 109. What is code splitting?

Answer:

Code splitting means dividing application JavaScript into smaller bundles that can be loaded independently.

Example:

```
const AdminPanel = React.lazy(
    () => import("./AdminPanel")
);
```

Explanation: Instead of loading the entire application upfront, you can load certain features when users navigate to them.

Benefits include:

- Smaller initial bundle.
- Faster initial page load.
- Less unnecessary JavaScript.
- Better performance for large applications.

### 110. What are CSR, SSR and SSG?

Answer:

These are different ways of generating web page content.

| Rendering type | Meaning                |
| -------------- | ---------------------- |
| CSR            | Client-Side Rendering  |
| SSR            | Server-Side Rendering  |
| SSG            | Static Site Generation |

CSR:

The browser downloads JavaScript and renders much of the page.

SSR:

The server renders the page for a particular request and sends HTML to the browser.

SSG:

HTML is generated ahead of time, usually during the build process.

Explanation: CSR is useful for highly interactive applications. SSR can improve initial content delivery and search engine accessibility. SSG works well for static content such as blogs and documentation.

Modern frameworks can combine these approaches.

### 111. What is hydration in React?

Answer:

Hydration is the process of attaching React's event handling and component behavior to HTML that has already been rendered, commonly by the server.

Example:

```
hydrateRoot(
    document.getElementById("root"),
    <App />
);
```

Explanation: The browser initially receives HTML from the server. React then makes that HTML interactive.

Hydration errors can occur if server-rendered HTML differs from what React initially expects to render on the client.

### 112. What are React Server Components?

Answer:

React Server Components are components that render on the server as part of a supported Server Component architecture.

They can:

- Access server-side resources.
- Fetch data close to the backend.
- Reduce the amount of JavaScript sent for server-only components.
- Compose with Client Components.

Example in a compatible framework:

```
async function Products() {
    const products = await getProducts();

    return (
        <ul>
            {products.map(product => (
                <li key={product.id}>{product.name}</li>
            ))}
        </ul>
    );
}
```

Explanation: Server Components are not the same as traditional SSR. SSR produces HTML, whereas Server Components provide a component-level server rendering model.

They cannot directly use client-side Hooks such as `useState` or browser APIs.

### 113. What is `useTransition()`?

Answer:

`useTransition()` allows certain state updates to be marked as non-urgent transitions.

```
function Search() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [isPending, startTransition] = useTransition();

    function handleChange(event) {
        const value = event.target.value;

        setSearch(value);

        startTransition(() => {
            setResults(filterLargeList(value));
        });
    }

    return (
        <>
            <input
                value={search}
                onChange={handleChange}
            />

            {isPending && <p>Updating...</p>}

            <Results results={results} />
        </>
    );
}
```

Explanation: React can prioritize urgent updates, such as keeping an input responsive, over less urgent UI updates.

It does not make the underlying filtering function execute faster.

### 114. What is `useDeferredValue()`?

Answer:

`useDeferredValue()` allows part of the UI to use a deferred version of a value, helping React prioritize more urgent updates.

```
function Search({ query }) {
    const deferredQuery = useDeferredValue(query);

    return <SearchResults query={deferredQuery} />;
}
```

Explanation: It is useful when a rapidly changing input drives an expensive part of the UI.

The input can respond immediately while React updates the slower results when it has an opportunity.

It is not a replacement for debouncing network requests.

### 115. What is Concurrent Rendering in React?

Answer:

Concurrent rendering refers to React's ability to prepare and manage rendering work in a way that allows it to prioritize more urgent updates.

It can pause, resume or abandon rendering work when necessary.

Explanation: This improves responsiveness in complex applications.

APIs such as `useTransition()` and `useDeferredValue()` help developers mark updates that can be treated as less urgent.

It does not mean JavaScript rendering happens on multiple threads.

### 116. What is `useId()`?

Answer:

`useId()` generates IDs that can be used to connect related elements, especially in accessible forms.

```
function EmailInput() {
    const id = useId();

    return (
        <>
            <label htmlFor={id}>Email</label>
            <input id={id} type="email" />
        </>
    );
}
```

Explanation: It is particularly useful when multiple instances of the same component appear on a page. React's generated IDs also support consistency between server rendering and hydration.

Do not use `useId()` for list keys. Use stable data IDs instead.

### 117. What are Portals in React?

Answer:

Portals allow a component to render its children into a DOM node outside its normal DOM hierarchy.

```
import { createPortal } from "react-dom";

function Modal() {
    return createPortal(
        <div className="modal">
            Modal Content
        </div>,
        document.getElementById("modal-root")
    );
}
```

Explanation: Portals are commonly used for:

- Modal dialogs.
- Tooltips.
- Dropdowns.
- Notifications.

The portal changes the DOM placement, but the component still belongs to its original React tree. React event propagation follows the React tree.

### 118. What is `forwardRef()` and how do refs work in modern React?

Answer:

Refs allow a parent or component to access a DOM element or an exposed imperative handle.

Historically, `forwardRef()` was used to pass a ref through a functional component.

```
const CustomInput = React.forwardRef((props, ref) => {
    return <input ref={ref} {...props} />;
});
```

A parent can then use it:

```
function App() {
    const inputRef = useRef(null);

    return (
        <>
            <CustomInput ref={inputRef} />
            <button onClick={() => inputRef.current.focus()}>
                Focus
            </button>
        </>
    );
}
```

Explanation: In React 19, function components can receive `ref` as a prop, so `forwardRef()` is no longer necessary for new components targeting React 19. It remains relevant in existing codebases and libraries that support earlier React versions.

### 119. What are common security issues in React applications?

Answer:

Common security issues include:

1. Cross-Site Scripting (XSS).
2. Exposing sensitive API keys in frontend code.
3. Insecure authentication and token storage.
4. Trusting user input without server-side validation.
5. Insecure dependencies.
6. Missing authorization checks on backend APIs.

Example of risky code:

```
function Content({ html }) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

Explanation: React escapes normal text interpolation by default, which helps prevent many XSS attacks.

However, `dangerouslySetInnerHTML` bypasses that protection. Only use it with carefully sanitized HTML.

Also remember that frontend route protection does not replace backend authorization.

### 120. How do you test React components, and what does accessibility mean?

Answer:

React components can be tested using tools such as Jest or Vitest with React Testing Library.

Example:

```
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("increments counter", () => {
    render(<Counter />);

    fireEvent.click(
        screen.getByRole("button", { name: /increment/i })
    );

    expect(screen.getByText("1")).toBeInTheDocument();
});
```

Explanation: React Testing Library encourages tests based on how users interact with the application rather than internal component implementation details.

Accessibility means making applications usable by people with different abilities and assistive technologies.

Important practices include:

- Use semantic HTML.
- Associate labels with form inputs.
- Support keyboard navigation.
- Provide meaningful alternative text for images.
- Maintain appropriate color contrast.
- Use ARIA attributes where native HTML semantics are insufficient.

# Part 4: Important coding questions to practise

Knowing definitions is useful, but full-stack interviews frequently include short coding exercises. These are particularly worth practising.

| No. | Coding problem                                 | Main concept           |
| --- | ---------------------------------------------- | ---------------------- |
| 1   | Reverse a string without using `reverse()`     | Strings, loops         |
| 2   | Check whether a string is a palindrome         | String manipulation    |
| 3   | Find duplicate elements in an array            | Sets, objects          |
| 4   | Find the second-largest number                 | Array traversal        |
| 5   | Flatten a nested array                         | Recursion              |
| 6   | Group an array of objects by property          | `reduce()`             |
| 7   | Remove duplicates from an array                | Set                    |
| 8   | Implement custom `map()`                       | Higher-order functions |
| 9   | Implement debounce                             | Closures, timers       |
| 10  | Implement throttle                             | Closures, timers       |
| 11  | Implement a Promise-based delay function       | Promises               |
| 12  | Run multiple API requests in parallel          | `Promise.all()`        |
| 13  | Build a search component with debounce         | React, API calls       |
| 14  | Build a counter with increment/decrement/reset | React state            |
| 15  | Build a reusable modal                         | Components, portals    |
| 16  | Build a paginated table                        | State, API integration |
| 17  | Build an autocomplete component                | Debouncing, filtering  |
| 18  | Build a todo application                       | CRUD, state management |
| 19  | Build a form with validation                   | Forms, TypeScript      |
| 20  | Build a custom `useFetch()` Hook               | Hooks, async logic     |

# Part 5: What you should prioritize for your full-stack interview

You already have stronger backend engineering experience, especially with Python, APIs, databases and production systems. Your preparation should focus on being able to demonstrate that you can own the frontend part of a product as well.

I would prioritize the following:

Priority 1 — JavaScript fundamentals

Must know thoroughly

Closures, promises, event loop, `this`, array methods, debouncing, throttling, event propagation and asynchronous error handling.

Priority 2 — React practical development

Must know thoroughly

Components, props, state, Hooks, `useEffect`, forms, API integration, Context, React Router and reusable components.

Priority 3 — TypeScript

Must know thoroughly

Interfaces, types, generics, unions, utility types, API response typing and type narrowing.

Priority 4 — Advanced React

Important for senior interviews

Memoization, performance, lazy loading, Suspense, server-side rendering, hydration, state management and testing.

Priority 5 — Build an end-to-end project

Practical proof

Build a React + TypeScript frontend connected to a FastAPI backend, with authentication, API integration, validation, pagination and error handling.

## A project I recommend building for interview preparation

Security Vulnerability Management Dashboard

This is a particularly useful project because it lets you connect frontend skills with the backend and security-domain experience you already have.

[AI GRC & Cybersecurity Platform | Purplecop Security](https://images.openai.com/static-rsc-4/m6Xv4ILL7s8sr3EUTcLdmKXScm4NdBXuvUWg_F7h0kR1_6bCX2NhnOoFM5jy84DWHAqAWZJ-gKIDMdH7HnpUa5rCSQGXC1DYCuzDN2_ntJCvZEK3wRm8J2MtBDmcTTmRbXCJu85mNsSgmkTvaJWCu3ZE4CT8vtvHHXEupDvzK88?purpose=inline)

[Client Project Recap – Kyntra AI Cybersecurity Platform Design by Fahema Yesmin on Dribbble](https://images.openai.com/static-rsc-4/8M5eJCGUDt77l_ObrC4E3TVmU3bXFJ-TbBZCasyMi162Y9CfSjWWlZ-RPgTvl7tjiCPTGZdr6ruZn3PInwoxYXqV6-_5tq6eZqu5wPTk5VK2cGDkQ48baslvvPYODKNuqoI5Fxtfk7VJxEa1OoSgrO-Hj19vm1jFejrrTBvvC6g?purpose=inline)

[Asset Discovery | Hexiosec ASM](https://images.openai.com/static-rsc-4/n68QHiFsR22rBLyFCtjMxGfb58wTPxkfH4GWl6dWCEHqjw-5dfUPOITQHF9pdyza5rmU-Ou8E2-AMeYZib2zOaGQwvIOuEBRLxDnfqgvP2u-yU4bra82HmuIpeB0JYc_t8nE0slDgI0ccm2IWbQO0VnHfm_XiR-ZgRgh1jZrMEo?purpose=inline)

15

Suggested features:

| Feature                     | Concepts demonstrated          |
| --------------------------- | ------------------------------ |
| Login and authentication    | JWT, HTTP-only cookies         |
| Dashboard analytics         | Charts, API integration        |
| Vulnerability table         | Filtering, sorting, pagination |
| Search and autocomplete     | Debouncing                     |
| Create/update vulnerability | Forms, validation              |
| Severity filters            | React state                    |
| Reusable components         | Component architecture         |
| Typed API responses         | TypeScript                     |
| Loading/error states        | React Hooks                    |
| FastAPI integration         | Full-stack development         |

This will give you concrete examples to discuss when interviewers ask how you have used React and TypeScript in a real application.

## Final preparation advice

Do not try to memorize all 120 answers word for word. Understand the concepts and practise explaining each in your own words.

For your profile, I would spend approximately 40% of preparation time on JavaScript, 40% on React and 20% on TypeScript. Spend additional time building and debugging small components rather than only reading theory.

For mock interview practice, would a 15-minute JavaScript, React and TypeScript interview drill every morning at 9 AM IST be useful?

🧠Daily frontend interview drillTap to set up
