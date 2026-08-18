# JavaScript Functions Tutorial

## Table of Contents
- [1. Functions: Basics & Types](#1-functions-basics--types)
- [2. Synchronous Functions](#2-synchronous-functions)
- [3. Asynchronous Functions & The Event Loop](#3-asynchronous-functions--the-event-loop)
- [4. Callbacks & Callback Hell](#4-callbacks--callback-hell)
- [5. Promises](#5-promises)
- [6. Async & Await](#6-async--await)
- [7. Recursion](#7-recursion)

## 1. Functions: Basics & Types

### Introduction to Functions
A JavaScript function is a block of code designed to perform a particular task. A function is executed when "something" invokes it (calls it). Functions are a fundamental aspect of any programming language because they allow for code reusability. Instead of writing the same logic multiple times, you write it once inside a function and invoke that function wherever needed.

In JavaScript, functions are "first-class objects". This means they can be treated like any other variable: they can be assigned to variables, passed as arguments to other functions, and returned from other functions. This powerful feature enables functional programming paradigms within JavaScript.

### 1. Function Declarations
The standard way to declare a function is by using the `function` keyword, followed by a name, followed by parentheses `()`. The code to be executed is placed inside curly brackets `{}`. A unique feature of function declarations in JavaScript is "hoisting". The JavaScript engine moves function declarations to the top of their scope before the code executes, meaning you can call a function before it is physically defined in your code.

```javascript
// Calling the function before declaration (Hoisting works!)
greetUser("Alice");

function greetUser(name) {
    console.log("Welcome back, " + name);
}
```

### 2. Function Expressions
A function expression defines a function within an expression. These functions can be anonymous (without a name) and are stored in variables. Unlike function declarations, function expressions are **not hoisted**. You must define them before calling them.

```javascript
const multiply = function(a, b) {
    return a * b;
};
console.log(multiply(5, 4)); // Outputs: 20
```

### 3. Arrow Functions
Introduced in ES6, arrow functions provide a much more concise syntax for writing function expressions. They are particularly useful for short, single-line operations and callbacks. Beyond syntax, arrow functions differ critically in how they handle the `this` keyword. Traditional functions bind their own `this` based on how they are called, whereas arrow functions inherit `this` from the surrounding lexical scope.

```javascript
// Standard Arrow Function
const add = (x, y) => {
    return x + y;
};

// Implicit Return (One-liner)
const square = num => num * num;
```

### 4. Immediately Invoked Function Expressions (IIFE)
An IIFE is a function that runs as soon as it is defined. It's a common design pattern used to create a private scope, ensuring that variables declared inside the IIFE do not pollute the global namespace. It is wrapped in parentheses and immediately followed by another set of parentheses to invoke it.

```javascript
(function() {
    let privateData = "Secret";
    console.log("IIFE executed! " + privateData);
})();
```

## 2. Synchronous Functions

### Understanding Synchronous Execution
JavaScript is a single-threaded language, meaning it has exactly one Call Stack and one Memory Heap. By default, JavaScript executes code synchronously. Synchronous execution implies that the code is read and executed line-by-line, in the exact order it is written. The engine will not move on to the next line of code until the current line has completely finished executing.

In a synchronous environment, each task blocks the execution of the next task. This is straightforward and easy to reason about, but it introduces massive performance bottlenecks if a task takes too long.

### The Call Stack in Action
The Call Stack is a data structure that records where in the program we are. If we step into a function, we push it onto the stack. If we return from a function, we pop it off the top of the stack. Let's look at an example:

```javascript
function first() {
    console.log("Executing first");
    second();
    console.log("Finished first");
}

function second() {
    console.log("Executing second");
}

first();
// Output Order:
// Executing first
// Executing second
// Finished first
```
  
### The Problem with Blocking Code
While synchronous code is predictable, it struggles with computationally heavy operations or tasks that involve waiting (like reading a large file or requesting data over a network). If you execute a heavy `while` loop synchronously on the main thread of a browser, the entire webpage will freeze. Users won't be able to click buttons, scroll, or type until the loop finishes.

```javascript
function blockThread() {
    console.log("Starting a heavy task...");
    let start = Date.now();
    // Simulate a 3-second block
    while (Date.now() - start < 3000) { }
    console.log("Heavy task finished!");
}
```

Because blocking the main thread destroys the user experience, JavaScript relies on asynchronous programming to handle long-running operations without stopping the entire program.

## 3. Asynchronous Functions & The Event Loop

### What is Asynchronous JavaScript?
Asynchronous programming is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished. Once that task has finished, your program is presented with the result.

Since JavaScript is strictly single-threaded, it achieves asynchronous behavior not by creating new threads, but by utilizing the browser's Web APIs (or Node.js C++ APIs), the Callback Queue, and the legendary Event Loop.

### How Asynchronous Code Works Under the Hood
When you call an asynchronous function like `setTimeout` or `fetch`, the JavaScript engine hands the task over to the Web API environment and instantly moves on to execute the next line of synchronous code. It does not wait.

1. **Web APIs:** The browser handles the timer or the network request in the background.
2. **Callback Queue:** Once the background task finishes, its associated callback function is pushed into the Callback Queue (also called the Task Queue).
3. **The Event Loop:** The Event Loop constantly checks if the main Call Stack is empty. If the stack is completely empty, it takes the first callback from the Callback Queue and pushes it onto the Call Stack to be executed.

### A Classic Example
```javascript
console.log("1. Program Starts");

setTimeout(() => {
    console.log("3. Timeout Callback Executes");
}, 0);

console.log("2. Program Ends");

// Output Order:
// 1. Program Starts
// 2. Program Ends
// 3. Timeout Callback Executes
```
Even though the timeout delay is 0 milliseconds, the callback is sent to the Web API and then the Callback Queue. It must wait for the synchronous code to completely finish before the Event Loop allows it onto the Call Stack.

## 4. Callbacks & Callback Hell

### The Role of Callbacks
A callback is simply a function passed as an argument to another function, intended to be executed after a specific event occurs or a task completes. Before Promises were introduced, callbacks were the primary way to manage asynchronous workflows in JavaScript.

### Synchronous vs Asynchronous Callbacks
Callbacks aren't inherently asynchronous. For instance, the `map` and `filter` array methods use synchronous callbacks. The engine executes them immediately, pausing everything else.

```javascript
// Synchronous Callback
[1, 2, 3].forEach(num => console.log(num));
```

Asynchronous callbacks are used in environments like event listeners or file reading, where the callback is pushed to the Callback Queue and invoked later by the Event Loop.

### The Pyramid of Doom (Callback Hell)
The major flaw of callbacks becomes apparent when you have multiple dependent asynchronous operations. If Operation B needs the result of Operation A, and Operation C needs the result of Operation B, you must nest the callbacks inside one another. This deep nesting creates a triangular shape in your code known as "Callback Hell".

```javascript
function fetchUserData(userId, callback) {
    // Simulated DB Call
    setTimeout(() => callback({ id: userId, name: "Alice" }), 1000);
}

function fetchUserPosts(user, callback) {
    setTimeout(() => callback(["Post 1", "Post 2"]), 1000);
}

// Callback Hell Example
fetchUserData(1, function(user) {
    console.log("User fetched:", user.name);
    fetchUserPosts(user, function(posts) {
        console.log("Posts fetched:", posts.length);
        // Imagine 5 more levels of nesting...
    });
});
```
Callback hell leads to code that is notoriously difficult to read, maintain, and debug. Error handling is also fragmented, requiring separate `if (err)` checks at every single nested level. This architectural flaw is exactly why Promises were invented.

## 5. Promises

### What is a Promise?
Introduced in ES6 (2015), a Promise is an object representing the eventual completion or failure of an asynchronous operation. Instead of passing a callback function into an asynchronous routine, the routine returns a Promise object that you can attach handlers to. This fundamentally flattens the nested structure of callbacks.

### The Three States of a Promise
- **Pending:** The initial state. The operation has not completed yet.
- **Fulfilled:** The operation completed successfully, resulting in a value.
- **Rejected:** The operation failed, resulting in an error reason.

Once a Promise is fulfilled or rejected, it is considered "settled" and its state cannot be changed.

### Creating and Consuming Promises
You can create a Promise using the `new Promise()` constructor, which takes an executor function with `resolve` and `reject` arguments.

```javascript
const checkServer = new Promise((resolve, reject) => {
    let isOnline = true;
    setTimeout(() => {
        if (isOnline) resolve("Server is online!");
        else reject("Server is down.");
    }, 1000);
});

// Consuming the Promise
checkServer
    .then(message => console.log("Success:", message))
    .catch(error => console.error("Error:", error))
    .finally(() => console.log("Check complete."));
```

### Chaining Promises
Because the `.then()` method returns a brand new Promise, you can chain multiple asynchronous operations together sequentially. This flattens the dreaded "Pyramid of Doom" into a clean, vertical line of commands.

```javascript
fetchData()
    .then(data => parseData(data))
    .then(parsed => saveToDatabase(parsed))
    .then(result => console.log("Saved successfully!"))
    .catch(error => console.error("Pipeline failed at some step:", error));
```
Notice how a single `.catch()` block at the end can handle errors originating from any of the chained promises, making error management vastly superior to callbacks.

## 6. Async & Await

### Syntactic Sugar for Promises
Introduced in ES2017 (ES8), the `async` and `await` keywords provide a revolutionary way to write asynchronous code. They sit strictly on top of Promises, acting as "syntactic sugar". Their goal is to make asynchronous code read exactly like standard, synchronous code, completely eliminating the need for `.then()` and `.catch()` chains.

### The `async` Keyword
Adding `async` before a function declaration explicitly ensures that the function will always return a Promise. Even if you just return a plain string, JavaScript automatically wraps it in a resolved Promise.

```javascript
async function getGreeting() {
    return "Hello World"; // Equivalent to Promise.resolve("Hello World")
}
getGreeting().then(console.log);
```

### The `await` Keyword
The `await` keyword can only be used inside an `async` function. It literally pauses the execution of that specific function until the Promise it is waiting for settles. However, it does **not** block the main JavaScript thread; the rest of the application remains responsive.

```javascript
async function fetchAndLogUser() {
    console.log("Request sent...");
    // Execution pauses here until the fetch resolves
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await response.json();
    console.log("User received:", user.name);
}
```

### Error Handling
One of the best features of Async/Await is that it allows you to use standard synchronous `try...catch` blocks for error handling. This unifies how you handle both synchronous and asynchronous errors in your codebase.

```javascript
async function safeFetch() {
    try {
        const response = await fetch("https://invalid-url.com");
        if (!response.ok) throw new Error("HTTP Status " + response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch failed gracefully:", error.message);
    }
}
```

## 7. Fetch API & HTTP Methods

### Introduction to the Fetch API
The Fetch API provides a JavaScript interface for accessing and manipulating parts of the protocol, such as requests and responses. It also provides a global `fetch()` method that provides an easy, logical way to fetch resources asynchronously across the network. Before the Fetch API, the standard way to do this was with the `XMLHttpRequest` (XHR) object, which had a clunky, callback-heavy API. The Fetch API uses Promises, which enables a simpler and cleaner API, avoiding callback hell and making it easy to remember.

### Making Basic GET Requests
The most common use of `fetch()` is to retrieve data from a remote API. By default, `fetch()` makes a GET request. It takes one mandatory argument, the path to the resource you want to fetch, and returns a Promise that resolves to the Response to that request.

```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
        // fetch() only rejects on network failure. 
        // We must manually check if the HTTP status is OK (200-299).
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parses the JSON payload
    })
    .then(data => console.log('Data received:', data))
    .catch(error => console.error('Fetch error:', error));
```

### HTTP Methods Overview
While GET requests are for retrieving data, modern web applications need to send data to the server, update existing data, and delete data. This is accomplished using different HTTP methods:
1. **GET:** Retrieve data from the server.
2. **POST:** Send new data to the server (e.g., submitting a form, creating a new user).
3. **PUT / PATCH:** Update existing data on the server.
4. **DELETE:** Remove data from the server.

### Sending Data with POST Requests
To make a POST request, you need to pass an optional `init` object as the second argument to `fetch()`. This object allows you to control a number of different settings, such as the HTTP method, headers, and the body of the request.

```javascript
const newPost = {
    title: 'Learning Fetch',
    body: 'The Fetch API is modern and promise-based.',
    userId: 1
};

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST', // Specify the HTTP method
    headers: {
        // Tell the server we are sending JSON data
        'Content-Type': 'application/json',
    },
    // The body must be a string, so we serialize the JavaScript object
    body: JSON.stringify(newPost)
})
.then(response => response.json())
.then(data => console.log('Successfully created:', data))
.catch(error => console.error('Error creating post:', error));
```

### Handling Cross-Origin Requests (CORS)
When you use `fetch()` to request data from a different domain than the one that served your webpage, you are making a Cross-Origin Resource Sharing (CORS) request. For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. The server must explicitly allow your domain by setting appropriate CORS headers (like `Access-Control-Allow-Origin`). If the server does not allow it, your `fetch()` call will fail with a CORS error, regardless of whether the URL is valid.

### Fetch with Async / Await
Because `fetch()` returns a Promise, it is perfectly suited for the `async` / `await` syntax, which makes asynchronous code look highly readable and synchronous.

```javascript
async function getPostData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}
```

## 8. API Task (Fetching Products)

### Overview
In this task, we bring together HTML, CSS, and JavaScript's Fetch API to create a dynamic product grid. We will fetch mock product data from an external API (`https://dummyjson.com/products`) and render it directly to the DOM.

### The HTML Structure
The foundation is incredibly simple. We only need an empty container element with an ID that JavaScript can target.
```html
<div id="layout"></div>
```

### The CSS Layout (Fixing Alignment and Padding)
To ensure our products look great across all devices, we use CSS Grid for the layout and Flexbox for the individual product cards. We've optimized the alignment and padding for a polished look.

```css
#layout {
    display: grid;
    /* Responsive columns that adjust automatically */
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto; /* Center alignment */
}

.box {
    display: flex;
    flex-direction: column;
    align-items: center;      /* Center items horizontally */
    justify-content: space-between; /* Evenly space items */
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    padding: 24px;            /* Generous padding for breathing room */
    text-align: center;
    transition: transform 0.2s ease;
}

.box img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 16px;
}
```

### The JavaScript (Fetch & Render)
We use the `fetch()` method to grab the JSON data. Once the Promise resolves, we use the `.map()` array method to iterate over the products. For each product, we construct an HTML string using template literals and inject it into our layout container using `innerHTML +=`.

```javascript
let element = document.getElementById("layout");

fetch("https://dummyjson.com/products")
    .then((response) => {
        // Step 1: Parse the response to JSON
        return response.json();
    })
    .then((data) => {
        // Step 2: Extract the products array and iterate
        data.products.map((product) => {
            // Step 3: Append constructed HTML into the DOM
            element.innerHTML += `
                <div class="box">
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <h1>${product.title}</h1>
                    <h3>${product.description}</h3>
                    <span class="price">$${product.price}</span>
                </div>
            `;
        });
    })
    .catch((err) => {
        console.error("Failed to fetch products:", err);
    });
```
