import json

html_functions_basics = """<div class="course-topic">
  <div class="gfg-breadcrumb">Tutorials &gt; Web Development &gt; JavaScript &gt; Functions</div>
  <h2>3.1 JavaScript Functions: Basics & Types</h2>
  <div class="gfg-meta">
    <span class="gfg-tag" style="background: #eab308; color: #422006;">Core Foundation</span>
    <span class="gfg-time">⏱️ 15 min read</span>
  </div>

  <h3>Introduction to Functions</h3>
  <p>A JavaScript function is a block of code designed to perform a particular task. A function is executed when "something" invokes it (calls it). Functions are a fundamental aspect of any programming language because they allow for code reusability. Instead of writing the same logic multiple times, you write it once inside a function and invoke that function wherever needed.</p>

  <p>In JavaScript, functions are "first-class objects". This means they can be treated like any other variable: they can be assigned to variables, passed as arguments to other functions, and returned from other functions. This powerful feature enables functional programming paradigms within JavaScript.</p>

  <h3>1. Function Declarations</h3>
  <p>The standard way to declare a function is by using the <code>function</code> keyword, followed by a name, followed by parentheses <code>()</code>. The code to be executed is placed inside curly brackets <code>{}</code>. A unique feature of function declarations in JavaScript is "hoisting". The JavaScript engine moves function declarations to the top of their scope before the code executes, meaning you can call a function before it is physically defined in your code.</p>
  <pre><code>// Calling the function before declaration (Hoisting works!)
greetUser("Alice");

function greetUser(name) {
    console.log("Welcome back, " + name);
}</code></pre>

  <h3>2. Function Expressions</h3>
  <p>A function expression defines a function within an expression. These functions can be anonymous (without a name) and are stored in variables. Unlike function declarations, function expressions are <strong>not hoisted</strong>. You must define them before calling them.</p>
  <pre><code>const multiply = function(a, b) {
    return a * b;
};
console.log(multiply(5, 4)); // Outputs: 20</code></pre>

  <h3>3. Arrow Functions</h3>
  <p>Introduced in ES6, arrow functions provide a much more concise syntax for writing function expressions. They are particularly useful for short, single-line operations and callbacks. Beyond syntax, arrow functions differ critically in how they handle the <code>this</code> keyword. Traditional functions bind their own <code>this</code> based on how they are called, whereas arrow functions inherit <code>this</code> from the surrounding lexical scope.</p>
  <pre><code>// Standard Arrow Function
const add = (x, y) =&gt; {
    return x + y;
};

// Implicit Return (One-liner)
const square = num =&gt; num * num;</code></pre>

  <h3>4. Immediately Invoked Function Expressions (IIFE)</h3>
  <p>An IIFE is a function that runs as soon as it is defined. It's a common design pattern used to create a private scope, ensuring that variables declared inside the IIFE do not pollute the global namespace. It is wrapped in parentheses and immediately followed by another set of parentheses to invoke it.</p>
  <pre><code>(function() {
    let privateData = "Secret";
    console.log("IIFE executed! " + privateData);
})();</code></pre>
</div>"""

html_functions_sync = """<div class="course-topic">
  <div class="gfg-breadcrumb">Tutorials &gt; Web Development &gt; JavaScript &gt; Functions</div>
  <h2>3.2 Synchronous Functions</h2>
  <div class="gfg-meta">
    <span class="gfg-tag" style="background: #eab308; color: #422006;">Core Foundation</span>
    <span class="gfg-time">⏱️ 10 min read</span>
  </div>

  <h3>Understanding Synchronous Execution</h3>
  <p>JavaScript is a single-threaded language, meaning it has exactly one Call Stack and one Memory Heap. By default, JavaScript executes code synchronously. Synchronous execution implies that the code is read and executed line-by-line, in the exact order it is written. The engine will not move on to the next line of code until the current line has completely finished executing.</p>

  <p>In a synchronous environment, each task blocks the execution of the next task. This is straightforward and easy to reason about, but it introduces massive performance bottlenecks if a task takes too long.</p>

  <h3>The Call Stack in Action</h3>
  <p>The Call Stack is a data structure that records where in the program we are. If we step into a function, we push it onto the stack. If we return from a function, we pop it off the top of the stack. Let's look at an example:</p>
  <pre><code>function first() {
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
// Finished first</code></pre>
  
  <h3>The Problem with Blocking Code</h3>
  <p>While synchronous code is predictable, it struggles with computationally heavy operations or tasks that involve waiting (like reading a large file or requesting data over a network). If you execute a heavy <code>while</code> loop synchronously on the main thread of a browser, the entire webpage will freeze. Users won't be able to click buttons, scroll, or type until the loop finishes.</p>
  <pre><code>function blockThread() {
    console.log("Starting a heavy task...");
    let start = Date.now();
    // Simulate a 3-second block
    while (Date.now() - start &lt; 3000) { }
    console.log("Heavy task finished!");
}</code></pre>
  <p>Because blocking the main thread destroys the user experience, JavaScript relies on asynchronous programming to handle long-running operations without stopping the entire program.</p>
</div>"""

html_functions_async = """<div class="course-topic">
  <div class="gfg-breadcrumb">Tutorials &gt; Web Development &gt; JavaScript &gt; Functions</div>
  <h2>3.3 Asynchronous Functions & The Event Loop</h2>
  <div class="gfg-meta">
    <span class="gfg-tag" style="background: #eab308; color: #422006;">Advanced</span>
    <span class="gfg-time">⏱️ 15 min read</span>
  </div>

  <h3>What is Asynchronous JavaScript?</h3>
  <p>Asynchronous programming is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished. Once that task has finished, your program is presented with the result.</p>
  <p>Since JavaScript is strictly single-threaded, it achieves asynchronous behavior not by creating new threads, but by utilizing the browser's Web APIs (or Node.js C++ APIs), the Callback Queue, and the legendary Event Loop.</p>

  <h3>How Asynchronous Code Works Under the Hood</h3>
  <p>When you call an asynchronous function like <code>setTimeout</code> or <code>fetch</code>, the JavaScript engine hands the task over to the Web API environment and instantly moves on to execute the next line of synchronous code. It does not wait.</p>
  <ol>
    <li><strong>Web APIs:</strong> The browser handles the timer or the network request in the background.</li>
    <li><strong>Callback Queue:</strong> Once the background task finishes, its associated callback function is pushed into the Callback Queue (also called the Task Queue).</li>
    <li><strong>The Event Loop:</strong> The Event Loop constantly checks if the main Call Stack is empty. If the stack is completely empty, it takes the first callback from the Callback Queue and pushes it onto the Call Stack to be executed.</li>
  </ol>

  <h3>A Classic Example</h3>
  <pre><code>console.log("1. Program Starts");

setTimeout(() =&gt; {
    console.log("3. Timeout Callback Executes");
}, 0);

console.log("2. Program Ends");

// Output Order:
// 1. Program Starts
// 2. Program Ends
// 3. Timeout Callback Executes</code></pre>
  <p>Even though the timeout delay is 0 milliseconds, the callback is sent to the Web API and then the Callback Queue. It must wait for the synchronous code to completely finish before the Event Loop allows it onto the Call Stack.</p>
</div>"""

html_functions_callbacks = """<div class="course-topic">
  <div class="gfg-breadcrumb">Tutorials &gt; Web Development &gt; JavaScript &gt; Functions</div>
  <h2>3.4 Callbacks & Callback Hell</h2>
  <div class="gfg-meta">
    <span class="gfg-tag" style="background: #eab308; color: #422006;">Advanced</span>
    <span class="gfg-time">⏱️ 15 min read</span>
  </div>

  <h3>The Role of Callbacks</h3>
  <p>A callback is simply a function passed as an argument to another function, intended to be executed after a specific event occurs or a task completes. Before Promises were introduced, callbacks were the primary way to manage asynchronous workflows in JavaScript.</p>

  <h3>Synchronous vs Asynchronous Callbacks</h3>
  <p>Callbacks aren't inherently asynchronous. For instance, the <code>map</code> and <code>filter</code> array methods use synchronous callbacks. The engine executes them immediately, pausing everything else.</p>
  <pre><code>// Synchronous Callback
[1, 2, 3].forEach(num =&gt; console.log(num));</code></pre>
  <p>Asynchronous callbacks are used in environments like event listeners or file reading, where the callback is pushed to the Callback Queue and invoked later by the Event Loop.</p>

  <h3>The Pyramid of Doom (Callback Hell)</h3>
  <p>The major flaw of callbacks becomes apparent when you have multiple dependent asynchronous operations. If Operation B needs the result of Operation A, and Operation C needs the result of Operation B, you must nest the callbacks inside one another. This deep nesting creates a triangular shape in your code known as "Callback Hell".</p>
  <pre><code>function fetchUserData(userId, callback) {
    // Simulated DB Call
    setTimeout(() =&gt; callback({ id: userId, name: "Alice" }), 1000);
}

function fetchUserPosts(user, callback) {
    setTimeout(() =&gt; callback(["Post 1", "Post 2"]), 1000);
}

// Callback Hell Example
fetchUserData(1, function(user) {
    console.log("User fetched:", user.name);
    fetchUserPosts(user, function(posts) {
        console.log("Posts fetched:", posts.length);
        // Imagine 5 more levels of nesting...
    });
});</code></pre>
  <p>Callback hell leads to code that is notoriously difficult to read, maintain, and debug. Error handling is also fragmented, requiring separate <code>if (err)</code> checks at every single nested level. This architectural flaw is exactly why Promises were invented.</p>
</div>"""

html_functions_promises = """<div class="course-topic">
  <div class="gfg-breadcrumb">Tutorials &gt; Web Development &gt; JavaScript &gt; Functions</div>
  <h2>3.5 Promises</h2>
  <div class="gfg-meta">
    <span class="gfg-tag" style="background: #eab308; color: #422006;">Advanced</span>
    <span class="gfg-time">⏱️ 20 min read</span>
  </div>

  <h3>What is a Promise?</h3>
  <p>Introduced in ES6 (2015), a Promise is an object representing the eventual completion or failure of an asynchronous operation. Instead of passing a callback function into an asynchronous routine, the routine returns a Promise object that you can attach handlers to. This fundamentally flattens the nested structure of callbacks.</p>

  <h3>The Three States of a Promise</h3>
  <ul>
    <li><strong>Pending:</strong> The initial state. The operation has not completed yet.</li>
    <li><strong>Fulfilled:</strong> The operation completed successfully, resulting in a value.</li>
    <li><strong>Rejected:</strong> The operation failed, resulting in an error reason.</li>
  </ul>
  <p>Once a Promise is fulfilled or rejected, it is considered "settled" and its state cannot be changed.</p>

  <h3>Creating and Consuming Promises</h3>
  <p>You can create a Promise using the <code>new Promise()</code> constructor, which takes an executor function with <code>resolve</code> and <code>reject</code> arguments.</p>
  <pre><code>const checkServer = new Promise((resolve, reject) =&gt; {
    let isOnline = true;
    setTimeout(() =&gt; {
        if (isOnline) resolve("Server is online!");
        else reject("Server is down.");
    }, 1000);
});

// Consuming the Promise
checkServer
    .then(message =&gt; console.log("Success:", message))
    .catch(error =&gt; console.error("Error:", error))
    .finally(() =&gt; console.log("Check complete."));</code></pre>

  <h3>Chaining Promises</h3>
  <p>Because the <code>.then()</code> method returns a brand new Promise, you can chain multiple asynchronous operations together sequentially. This flattens the dreaded "Pyramid of Doom" into a clean, vertical line of commands.</p>
  <pre><code>fetchData()
    .then(data =&gt; parseData(data))
    .then(parsed =&gt; saveToDatabase(parsed))
    .then(result =&gt; console.log("Saved successfully!"))
    .catch(error =&gt; console.error("Pipeline failed at some step:", error));</code></pre>
    <p>Notice how a single <code>.catch()</code> block at the end can handle errors originating from any of the chained promises, making error management vastly superior to callbacks.</p>
</div>"""

html_functions_asyncawait = """<div class="course-topic">
  <div class="gfg-breadcrumb">Tutorials &gt; Web Development &gt; JavaScript &gt; Functions</div>
  <h2>3.6 Async &amp; Await</h2>
  <div class="gfg-meta">
    <span class="gfg-tag" style="background: #eab308; color: #422006;">Modern JS</span>
    <span class="gfg-time">⏱️ 15 min read</span>
  </div>

  <h3>Syntactic Sugar for Promises</h3>
  <p>Introduced in ES2017 (ES8), the <code>async</code> and <code>await</code> keywords provide a revolutionary way to write asynchronous code. They sit strictly on top of Promises, acting as "syntactic sugar". Their goal is to make asynchronous code read exactly like standard, synchronous code, completely eliminating the need for <code>.then()</code> and <code>.catch()</code> chains.</p>

  <h3>The <code>async</code> Keyword</h3>
  <p>Adding <code>async</code> before a function declaration explicitly ensures that the function will always return a Promise. Even if you just return a plain string, JavaScript automatically wraps it in a resolved Promise.</p>
  <pre><code>async function getGreeting() {
    return "Hello World"; // Equivalent to Promise.resolve("Hello World")
}
getGreeting().then(console.log);</code></pre>

  <h3>The <code>await</code> Keyword</h3>
  <p>The <code>await</code> keyword can only be used inside an <code>async</code> function. It literally pauses the execution of that specific function until the Promise it is waiting for settles. However, it does <strong>not</strong> block the main JavaScript thread; the rest of the application remains responsive.</p>
  <pre><code>async function fetchAndLogUser() {
    console.log("Request sent...");
    // Execution pauses here until the fetch resolves
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await response.json();
    console.log("User received:", user.name);
}</code></pre>

  <h3>Error Handling</h3>
  <p>One of the best features of Async/Await is that it allows you to use standard synchronous <code>try...catch</code> blocks for error handling. This unifies how you handle both synchronous and asynchronous errors in your codebase.</p>
  <pre><code>async function safeFetch() {
    try {
        const response = await fetch("https://invalid-url.com");
        if (!response.ok) throw new Error("HTTP Status " + response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch failed gracefully:", error.message);
    }
}</code></pre>
</div>"""

html_functions_recursion = """<div class="course-topic">
  <div class="gfg-breadcrumb">Tutorials &gt; Web Development &gt; JavaScript &gt; Functions</div>
  <h2>3.7 Recursion</h2>
  <div class="gfg-meta">
    <span class="gfg-tag" style="background: #eab308; color: #422006;">Advanced</span>
    <span class="gfg-time">⏱️ 15 min read</span>
  </div>

  <h3>Understanding Recursion</h3>
  <p>Recursion is a programming technique where a function calls itself repeatedly to solve a smaller instance of the same problem until it reaches a base condition that stops the recursion. It is highly favored in algorithms that deal with deeply nested data structures, such as tree traversal (like navigating the HTML DOM) or traversing nested file directories.</p>

  <h3>The Anatomy of a Recursive Function</h3>
  <p>A proper recursive function must always have two critical components. Without both, you risk creating an infinite loop that crashes the browser via a "Maximum call stack size exceeded" error.</p>
  <ol>
    <li><strong>The Base Case:</strong> The condition under which the function stops calling itself and returns a value.</li>
    <li><strong>The Recursive Case:</strong> The part where the function calls itself with a modified, smaller argument, inching closer to the base case.</li>
  </ol>

  <h3>Example: Calculating Factorials</h3>
  <p>The most classic example of recursion is calculating a mathematical factorial (e.g., 5! = 5 * 4 * 3 * 2 * 1).</p>
  <pre><code>function factorial(n) {
    // Base Case
    if (n === 1 || n === 0) {
        return 1;
    }
    // Recursive Case
    return n * factorial(n - 1);
}

console.log(factorial(5)); // Outputs: 120</code></pre>
  
  <h3>Recursion vs Iteration</h3>
  <p>Anything that can be written recursively can also be written using standard loops (iteration). While recursion is often cleaner and requires fewer lines of code, it is generally less memory efficient. Every recursive call adds a new frame to the Call Stack. If the recursion is too deep, it will overflow the stack. Modern JavaScript engines attempt to mitigate this with "Tail Call Optimization," but understanding when to favor a <code>while</code> loop over recursion is a key optimization skill.</p>
</div>"""

topics_data = [
    { "id": "js-functions-basics", "section": "3. Functions", "title": "Basics & Types", "content": html_functions_basics },
    { "id": "js-functions-sync", "section": "3. Functions", "title": "Synchronous Functions", "content": html_functions_sync },
    { "id": "js-functions-async", "section": "3. Functions", "title": "Asynchronous Functions", "content": html_functions_async },
    { "id": "js-functions-callbacks", "section": "3. Functions", "title": "Callbacks", "content": html_functions_callbacks },
    { "id": "js-functions-promises", "section": "3. Functions", "title": "Promises", "content": html_functions_promises },
    { "id": "js-functions-asyncawait", "section": "3. Functions", "title": "Async/Await", "content": html_functions_asyncawait },
    { "id": "js-functions-recursion", "section": "3. Functions", "title": "Recursion", "content": html_functions_recursion }
]

with open('res/js.json', 'r') as f:
    data = json.load(f)

# Filter out the old js-functions placeholder
new_topics_list = [t for t in data['topics'] if t['id'] != 'js-functions']

# Find where section 3 (DOM & Events) starts and insert before it, or just append. 
# The existing js.json might have section "3. DOM & Events". Let's insert before DOM & Events, or append if not found.
insert_idx = len(new_topics_list)
for i, t in enumerate(new_topics_list):
    if "DOM" in t['section'] or "3. DOM" in t['section']:
        insert_idx = i
        break

for topic in reversed(topics_data):
    new_topics_list.insert(insert_idx, topic)
    
# Rename "3. DOM & Events" to "4. DOM & Events" for consistency if it exists
for t in new_topics_list:
    if "3. DOM" in t['section']:
        t['section'] = t['section'].replace("3. DOM", "4. DOM")

data['topics'] = new_topics_list

with open('res/js.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Updated js.json with new high quality Functions topics.")
