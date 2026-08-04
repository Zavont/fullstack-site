import json

html_content = """<div class="course-topic">
  <div class="gfg-breadcrumb">Tutorials &gt; Web Development &gt; JavaScript &gt; Basics</div>
  <h2>Variables and Data Types in JavaScript</h2>
  <div class="gfg-meta">
    <span class="gfg-tag" style="background: #eab308; color: #422006;">Core Foundation</span>
    <span class="gfg-time">⏱️ 20 min read</span>
    <span class="gfg-updated">Updated: July 2026</span>
  </div>

  <p>Variables and Data Types in JavaScript are fundamental concepts used to store and manage data in a program. They define how information is declared, stored, and manipulated during execution. Mastering these concepts is essential for any developer looking to build robust applications. In this comprehensive guide, we will dive deep into how JavaScript handles variables through <code>var</code>, <code>let</code>, and <code>const</code>, and explore both primitive and non-primitive data types.</p>

  <hr>

  <h2>Part 1: Variables in JavaScript</h2>
  <p>A variable is a container (storage area) to hold data. Think of it as a labeled box where you can place a value and retrieve or change it later using its label (name). JavaScript provides three keywords to declare variables: <code>var</code>, <code>let</code>, and <code>const</code>.</p>

  <h3>1. The <code>var</code> Keyword</h3>
  <p>Before ES6 (ECMAScript 2015), <code>var</code> was the only way to declare variables in JavaScript. It has function-level scope, which means if it is declared inside a function, it is only available within that function. If declared outside, it becomes globally scoped.</p>
  <ul>
    <li><strong>Scope:</strong> Global or Function scoped.</li>
    <li><strong>Hoisting:</strong> Variables declared with <code>var</code> are hoisted to the top of their scope and initialized with <code>undefined</code>. This means you can use the variable before it is declared without throwing a <code>ReferenceError</code> (though its value will be <code>undefined</code>).</li>
    <li><strong>Redeclaration:</strong> You can redeclare the same variable using <code>var</code> within the same scope without an error.</li>
  </ul>
  <div class="gfg-syntax-box">
    <div class="syntax-title">Example using var</div>
    <pre><code>var x = 10;
if (true) {
    var x = 20; // Same variable!
    console.log(x); // 20
}
console.log(x); // 20 (leaked out of the block)</code></pre>
  </div>

  <h3>2. The <code>let</code> Keyword</h3>
  <p>Introduced in ES6, <code>let</code> is the modern way to declare variables that might change (mutate) later. It solves the scope leakage problem of <code>var</code>.</p>
  <ul>
    <li><strong>Scope:</strong> Block scoped (only accessible within the nearest `{}` block).</li>
    <li><strong>Hoisting:</strong> <code>let</code> declarations are hoisted, but they are not initialized. They remain in the <strong>Temporal Dead Zone (TDZ)</strong> from the start of the block until the declaration is encountered. Accessing them before declaration throws a <code>ReferenceError</code>.</li>
    <li><strong>Redeclaration:</strong> You cannot redeclare a variable with <code>let</code> in the same block scope.</li>
  </ul>
  <div class="gfg-syntax-box">
    <div class="syntax-title">Example using let</div>
    <pre><code>let y = 10;
if (true) {
    let y = 20; // Different variable!
    console.log(y); // 20
}
console.log(y); // 10</code></pre>
  </div>

  <h3>3. The <code>const</code> Keyword</h3>
  <p>Also introduced in ES6, <code>const</code> is used to declare constants—variables whose references cannot be reassigned once initialized.</p>
  <ul>
    <li><strong>Scope:</strong> Block scoped (like <code>let</code>).</li>
    <li><strong>Hoisting:</strong> Hoisted but kept in the TDZ (like <code>let</code>).</li>
    <li><strong>Immutability:</strong> The identifier cannot be reassigned. However, if the <code>const</code> holds an object or an array, the properties or elements of that object/array can still be modified.</li>
  </ul>
  <div class="gfg-syntax-box">
    <div class="syntax-title">Example using const</div>
    <pre><code>const z = 30;
// z = 40; // TypeError: Assignment to constant variable.

const arr = [1, 2, 3];
arr.push(4); // Valid! The array contents can change.
console.log(arr); // [1, 2, 3, 4]</code></pre>
  </div>

  <div class="gfg-callout gfg-tip">
    <h4>💡 Naming Conventions for Variables</h4>
    <p>Variable names (identifiers) must begin with a letter, an underscore (<code>_</code>), or a dollar sign (<code>$</code>). Subsequent characters can also include digits (0-9). JavaScript is case-sensitive, so <code>myVar</code> and <code>myvar</code> are different variables. The industry standard is to use <strong>camelCase</strong> (e.g., <code>userAge</code>, <code>totalAmount</code>).</p>
  </div>

  <hr>

  <h2>Part 2: Data Types in JavaScript</h2>
  <p>Data types describe the different kinds of data that we can work with and store in variables. JavaScript is a <strong>dynamically typed</strong> (or loosely typed) language. This means you do not need to specify what type of data a variable will hold; the JavaScript engine figures it out automatically at runtime. Furthermore, a single variable can hold a string at one point and a number later.</p>
  
  <p>JavaScript data types are divided into two main categories: <strong>Primitive Data Types</strong> and <strong>Non-Primitive (Reference) Data Types</strong>.</p>

  <h3>A. Primitive Data Types</h3>
  <p>Primitive data types are the most basic data types in JavaScript. They are immutable (their actual values cannot be altered once created) and are compared by value. There are seven primitive data types in modern JavaScript:</p>

  <h4>1. Number</h4>
  <p>JavaScript has only one type of number. It represents both integers and floating-point numbers. It is a double-precision 64-bit floating-point format (IEEE 754).</p>
  <ul>
    <li><strong>Examples:</strong> <code>let integer = 42;</code>, <code>let float = 3.14;</code></li>
    <li><strong>Special Numeric Values:</strong> JavaScript also has special numeric values like <code>Infinity</code>, <code>-Infinity</code>, and <code>NaN</code> (Not-a-Number). <code>NaN</code> represents a computational error, such as dividing a string by a number.</li>
  </ul>

  <h4>2. String</h4>
  <p>Strings are sequences of characters used to represent text. They can be enclosed in single quotes (<code>'...'</code>), double quotes (<code>"..."</code>), or backticks (<code>`...`</code>). Backticks enable <strong>Template Literals</strong>, allowing for multi-line strings and string interpolation.</p>
  <pre><code>let greeting = 'Hello';
let name = "Alice";
let message = `${greeting}, ${name}!`; // "Hello, Alice!"</code></pre>

  <h4>3. Boolean</h4>
  <p>A boolean represents a logical entity and can only have two values: <code>true</code> or <code>false</code>. They are heavily used in conditional statements (like <code>if...else</code>).</p>
  <pre><code>let isCodingFun = true;
let isTired = false;</code></pre>

  <h4>4. Undefined</h4>
  <p>When a variable is declared but not assigned a value, its type and value are both <code>undefined</code>. It represents the unintentional absence of a value.</p>
  <pre><code>let something;
console.log(something); // undefined</code></pre>

  <h4>5. Null</h4>
  <p><code>null</code> represents the intentional, explicit absence of any object value. It is often used to reset or clear a variable.</p>
  <div class="gfg-callout gfg-note">
    <h4>📝 Note on <code>typeof null</code></h4>
    <p>Due to a legacy bug in JavaScript, <code>typeof null</code> returns <code>"object"</code> instead of <code>"null"</code>. However, <code>null</code> is absolutely a primitive type.</p>
  </div>

  <h4>6. BigInt</h4>
  <p>Introduced in ES2020, <code>BigInt</code> is a numeric data type that can represent integers with arbitrary precision. It is used to safely store and operate on large integers even beyond the safe integer limit for standard Numbers (<code>Number.MAX_SAFE_INTEGER</code>, which is 2^53 - 1).</p>
  <pre><code>let hugeNumber = 9007199254740991n; // Appending 'n' makes it a BigInt
let anotherHuge = BigInt("9007199254740992");</code></pre>

  <h4>7. Symbol</h4>
  <p>Introduced in ES6, <code>Symbol</code> represents a unique and immutable primitive value. Symbols are primarily used as unique property keys in objects to avoid naming collisions.</p>
  <pre><code>let sym1 = Symbol("id");
let sym2 = Symbol("id");
console.log(sym1 === sym2); // false (Every symbol is completely unique)</code></pre>

  <h3>B. Non-Primitive (Reference) Data Types</h3>
  <p>Non-primitive data types (also known as Objects) are more complex data structures. Unlike primitives, they are mutable (their contents can be changed) and are compared by reference, meaning variables hold a reference (memory address) to the object, not the object itself.</p>

  <h4>1. Object</h4>
  <p>Objects are collections of key-value pairs. They are used to group related data and functionality together.</p>
  <pre><code>let person = {
    firstName: "John",
    lastName: "Doe",
    age: 30
};
console.log(person.firstName); // "John"</code></pre>

  <h4>2. Array</h4>
  <p>An Array is a special type of object used to store multiple, ordered values in a single variable. Arrays are zero-indexed.</p>
  <pre><code>let colors = ["red", "green", "blue"];
console.log(colors[1]); // "green"</code></pre>

  <h4>3. Function</h4>
  <p>Functions are callable objects that execute a block of code. Because they are objects, functions can be assigned to variables, passed as arguments, and returned from other functions.</p>
  <pre><code>function greet() {
    return "Hello World";
}</code></pre>

  <hr>

  <h2>Part 3: Type Coercion and The <code>typeof</code> Operator</h2>

  <h3>The <code>typeof</code> Operator</h3>
  <p>Because JavaScript is dynamically typed, you may often need to check the data type of a variable during runtime. The <code>typeof</code> operator evaluates to a string representing the type of the unevaluated operand.</p>
  <pre><code>console.log(typeof "Hello"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof { name: "Alice" }); // "object"
console.log(typeof [1, 2, 3]); // "object" (Arrays are objects)
console.log(typeof function(){}); // "function"
console.log(typeof null); // "object" (Legacy JavaScript bug)</code></pre>

  <h3>Implicit vs Explicit Type Coercion</h3>
  <p><strong>Type Coercion</strong> is the automatic or implicit conversion of values from one data type to another (such as strings to numbers). <strong>Type Conversion</strong> is similar, but typically refers to explicit operations.</p>
  
  <h4>Implicit Coercion</h4>
  <p>JavaScript will often silently convert types under the hood when operators are used with mismatched types.</p>
  <pre><code>let result = "5" + 3; 
// The number 3 is coerced into a string.
// result is "53"

let diff = "5" - 3;
// The string "5" is coerced into a number because the minus operator only works on numbers.
// diff is 2</code></pre>
  
  <h4>Explicit Conversion</h4>
  <p>It is generally a best practice to explicitly convert types to avoid bugs caused by implicit coercion. You can use built-in functions like <code>Number()</code>, <code>String()</code>, and <code>Boolean()</code>.</p>
  <pre><code>let strToNum = Number("42"); // 42
let numToStr = String(100); // "100"
let boolVal = Boolean(1); // true
let boolZero = Boolean(0); // false (0 is a falsy value)</code></pre>

  <h3>Truthy and Falsy Values</h3>
  <p>In JavaScript, a truthy value is a value that is considered <code>true</code> when encountered in a Boolean context. All values are truthy unless they are defined as falsy. There are exactly six falsy values in JavaScript:</p>
  <ul>
    <li><code>false</code></li>
    <li><code>0</code> (and <code>-0</code>, <code>0n</code>)</li>
    <li><code>""</code> (empty string)</li>
    <li><code>null</code></li>
    <li><code>undefined</code></li>
    <li><code>NaN</code></li>
  </ul>
  <p>Any other value, including empty arrays (<code>[]</code>) and empty objects (<code>{}</code>), is considered truthy.</p>

  <hr>
  <h2>Conclusion</h2>
  <p>Understanding variables and data types is the cornerstone of mastering JavaScript. By using <code>let</code> and <code>const</code> for block-scoped variable declarations, and recognizing the critical differences between primitives and reference types, developers can write cleaner, more predictable code and avoid common pitfalls associated with type coercion and the legacy <code>var</code> keyword.</p>
</div>"""

with open('res/js.json', 'r') as f:
    data = json.load(f)

new_topics = []
for topic in data['topics']:
    if topic['id'] == 'js-variables':
        topic['title'] = 'Variables and Data Types in JavaScript'
        topic['content'] = html_content
        new_topics.append(topic)
    elif topic['id'] == 'js-datatypes':
        # Remove the previously created js-datatypes as we've merged it back
        pass
    else:
        new_topics.append(topic)

data['topics'] = new_topics

with open('res/js.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Updated js.json successfully.")
