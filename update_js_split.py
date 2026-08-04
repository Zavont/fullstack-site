import json

html_variables = """<div class="course-topic">
  <div class="gfg-breadcrumb">Tutorials &gt; Web Development &gt; JavaScript &gt; Basics</div>
  <h2>JavaScript Variables, Scope & Hoisting</h2>
  <div class="gfg-meta">
    <span class="gfg-tag" style="background: #eab308; color: #422006;">Core Foundation</span>
    <span class="gfg-time">⏱️ 25 min read</span>
    <span class="gfg-updated">Updated: July 2026</span>
  </div>

  <p>In JavaScript, variables are the most fundamental building blocks of any program. They act as named containers or storage areas that hold data values during the execution of a script. Think of a variable as a labeled box where you can place a value (like a number or a text string) and retrieve or change it later using its label. Understanding how JavaScript manages variables, allocates memory for them, and defines their accessibility (scope) is critical for mastering the language.</p>

  <p>JavaScript provides three distinct keywords to declare variables: <code>var</code>, <code>let</code>, and <code>const</code>. Each of these keywords behaves differently in terms of scope, hoisting, and reassignment capabilities. In this comprehensive guide, we will explore the history of these keywords, the rules for naming variables, the concepts of scope and the Temporal Dead Zone (TDZ), and the mechanics of hoisting.</p>

  <hr>

  <h3>Rules for Naming Variables</h3>
  <p>Before diving into how to declare variables, it is important to understand the rules and conventions for naming them (also known as identifiers). In JavaScript, variable names must follow these strict rules:</p>
  <ul>
    <li>Names must begin with a letter (a-z, A-Z), an underscore (<code>_</code>), or a dollar sign (<code>$</code>).</li>
    <li>Subsequent characters can include digits (0-9) in addition to letters, underscores, and dollar signs.</li>
    <li>Names cannot begin with a digit (e.g., <code>1stPlace</code> is invalid).</li>
    <li>JavaScript is strictly case-sensitive. Therefore, <code>myVariable</code>, <code>MyVariable</code>, and <code>myvariable</code> are treated as three completely different identifiers.</li>
    <li>Reserved keywords (like <code>if</code>, <code>else</code>, <code>function</code>, <code>return</code>, <code>var</code>, etc.) cannot be used as variable names.</li>
  </ul>
  <div class="gfg-callout gfg-tip">
    <h4>💡 Industry Best Practice: Naming Conventions</h4>
    <p>The industry standard for naming variables in JavaScript is <strong>camelCase</strong>. In camelCase, the first letter is lowercase, and every subsequent word starts with an uppercase letter (e.g., <code>userFirstName</code>, <code>totalAmountDue</code>). Additionally, variables should have descriptive, semantic names that clearly indicate what data they hold. Avoid single-letter variables like <code>x</code> or <code>y</code> unless they are used as short-lived loop counters.</p>
  </div>

  <hr>

  <h3>1. The <code>var</code> Keyword: The Legacy Way</h3>
  <p>From the inception of JavaScript in 1995 until the release of ECMAScript 2015 (ES6), the <code>var</code> keyword was the only way to declare variables. While it is still fully supported for backwards compatibility, it is generally avoided in modern development due to its confusing scoping rules.</p>
  
  <h4>Function Scope vs Global Scope</h4>
  <p>Variables declared with <code>var</code> are either <strong>function-scoped</strong> or <strong>globally scoped</strong>. They are never block-scoped. This means that if a <code>var</code> variable is declared inside a function, it is only accessible within that function. However, if it is declared inside a block (like an <code>if</code> statement or a <code>for</code> loop), it "leaks" out of that block and becomes accessible to the entire surrounding function (or the global scope if not in a function).</p>

  <pre><code>function testVar() {
    if (true) {
        var leakedVar = "I am outside the block!";
    }
    // leakedVar is accessible here!
    console.log(leakedVar); 
}
testVar();</code></pre>

  <h4>Redeclaration and Updating</h4>
  <p>Another quirk of <code>var</code> is that it allows you to redeclare the same variable multiple times within the same scope without throwing an error. This can lead to significant bugs if a developer accidentally overwrites a variable they did not realize was already declared.</p>
  <pre><code>var username = "Alice";
var username = "Bob"; // No error thrown!
console.log(username); // "Bob"</code></pre>

  <hr>

  <h3>2. The <code>let</code> Keyword: Modern Variable Declaration</h3>
  <p>To address the shortcomings of <code>var</code>, ES6 introduced the <code>let</code> keyword. It is the modern standard for declaring variables whose values are expected to change (mutate) over time.</p>

  <h4>Block Scope</h4>
  <p>The most significant difference between <code>let</code> and <code>var</code> is that <code>let</code> is <strong>block-scoped</strong>. A block is any code defined between a set of curly braces <code>{}</code>. If a <code>let</code> variable is declared inside a block, it is strictly confined to that block and cannot be accessed from the outside.</p>
  <pre><code>if (true) {
    let secureVar = "I am trapped in this block!";
    console.log(secureVar); // Works fine
}
// console.log(secureVar); // ReferenceError: secureVar is not defined</code></pre>

  <h4>No Redeclaration</h4>
  <p>Unlike <code>var</code>, <code>let</code> does not allow you to redeclare a variable within the same scope. This strictness prevents accidental variable overwrites.</p>
  <pre><code>let score = 10;
// let score = 20; // SyntaxError: Identifier 'score' has already been declared
score = 20; // Reassigning the value is perfectly fine</code></pre>

  <hr>

  <h3>3. The <code>const</code> Keyword: Constants and Immutability</h3>
  <p>The <code>const</code> keyword, also introduced in ES6, is used to declare variables whose identifiers should never be reassigned. Like <code>let</code>, <code>const</code> is strictly <strong>block-scoped</strong> and cannot be redeclared.</p>

  <h4>Strict Initialization</h4>
  <p>When declaring a variable with <code>const</code>, you must initialize it with a value at the exact moment of declaration. You cannot declare an uninitialized <code>const</code> variable.</p>
  <pre><code>const PI = 3.14159; // Correct
// const GRAVITY; // SyntaxError: Missing initializer in const declaration</code></pre>

  <h4>Immutability Nuances</h4>
  <p>It is crucial to understand that <code>const</code> does not mean the value itself is entirely immutable—it only means the variable identifier cannot be reassigned to a new memory address. If a <code>const</code> variable holds a primitive value (like a number or string), it cannot be changed. However, if it holds a reference type (like an Object or an Array), the contents of that object or array can still be mutated.</p>
  <pre><code>const user = { name: "Alice", age: 25 };
// user = { name: "Bob", age: 30 }; // TypeError: Assignment to constant variable.

user.age = 26; // Perfectly valid! We are mutating the object, not reassigning the identifier.
console.log(user.age); // 26</code></pre>

  <hr>

  <h3>Deep Dive: Understanding Hoisting</h3>
  <p>Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their respective scopes during the compilation phase (before the code is executed). This means that you can technically reference a variable before the line of code where it is declared.</p>

  <h4>Hoisting with <code>var</code></h4>
  <p>When variables are declared with <code>var</code>, their declarations are hoisted to the top, and they are immediately initialized with the default value of <code>undefined</code>.</p>
  <pre><code>console.log(myVar); // Outputs: undefined (no error)
var myVar = "Hello World";
console.log(myVar); // Outputs: "Hello World"</code></pre>

  <h4>Hoisting with <code>let</code> and <code>const</code> (The Temporal Dead Zone)</h4>
  <p>Variables declared with <code>let</code> and <code>const</code> are also hoisted to the top of their block scope. However, unlike <code>var</code>, they are <strong>not initialized</strong> with <code>undefined</code>. Instead, they remain in a state known as the <strong>Temporal Dead Zone (TDZ)</strong> from the start of the block until the engine reaches the exact line where the variable is declared and initialized.</p>
  <p>If you attempt to access a <code>let</code> or <code>const</code> variable while it is in the TDZ, JavaScript will throw a <code>ReferenceError</code>.</p>
  <pre><code>// console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = "Modern JavaScript";</code></pre>
  <p>The TDZ is a protective mechanism designed to catch bugs. It forces developers to write cleaner, more predictable code by ensuring variables are only used after they have been properly declared.</p>

  <hr>

  <h3>Deep Dive: Variable Shadowing</h3>
  <p>Variable shadowing occurs when a variable declared within a certain scope (like an inner block) has the same name as a variable declared in an outer scope. The inner variable "shadows" the outer variable, meaning any references to that variable name within the inner scope will point to the inner variable.</p>
  <pre><code>let message = "Global Message";
if (true) {
    let message = "Local Message"; // Shadows the outer variable
    console.log(message); // "Local Message"
}
console.log(message); // "Global Message"</code></pre>
  <p>It is important to note that you can shadow a <code>var</code> variable with a <code>let</code> variable (known as valid shadowing), but attempting to shadow a <code>let</code> variable with a <code>var</code> variable within the same block scope will result in an "Illegal Shadowing" syntax error because <code>var</code> tries to register itself in the outer function scope where the <code>let</code> variable already exists.</p>

  <hr>
  <h3>Conclusion & Best Practices</h3>
  <p>Modern JavaScript development heavily favors the use of <code>let</code> and <code>const</code>. The community consensus is to <strong>always use <code>const</code> by default</strong>. This communicates to other developers that a variable is not meant to change, making the code easier to reason about. Only switch to <code>let</code> when you explicitly know that the variable will need to be reassigned (such as counters in <code>for</code> loops or toggles for boolean states). The <code>var</code> keyword should be avoided entirely in new projects to prevent scoping bugs and unpredictable behavior caused by global leakage and undefined hoisting.</p>
</div>"""

html_datatypes = """<div class="course-topic">
  <div class="gfg-breadcrumb">Tutorials &gt; Web Development &gt; JavaScript &gt; Basics</div>
  <h2>JavaScript Data Types & Type Coercion</h2>
  <div class="gfg-meta">
    <span class="gfg-tag" style="background: #eab308; color: #422006;">Core Foundation</span>
    <span class="gfg-time">⏱️ 25 min read</span>
    <span class="gfg-updated">Updated: July 2026</span>
  </div>

  <p>In computer science, a "data type" is an attribute of data that tells the compiler or interpreter how the programmer intends to use the data. In JavaScript, data types dictate what operations can be performed on a variable and how the data is stored in the system's memory.</p>

  <p>JavaScript is a <strong>dynamically typed</strong> (also referred to as loosely typed) language. This means that variables in JavaScript are not directly bound to any specific data type. You do not need to explicitly declare whether a variable will hold a number, a string, or an object. The JavaScript engine automatically determines the data type during execution (runtime). Furthermore, a single variable can hold a string at one moment, and later be reassigned to hold a number or an array without throwing any errors.</p>

  <pre><code>let dynamicVar = "Hello there!"; // It is currently a String
dynamicVar = 42; // Now it is a Number
dynamicVar = true; // Now it is a Boolean</code></pre>

  <p>JavaScript data types are broadly categorized into two distinct groups based on how they are stored in memory and how they are accessed: <strong>Primitive Data Types</strong> and <strong>Non-Primitive (Reference) Data Types</strong>.</p>

  <hr>

  <h2>Part 1: Primitive Data Types</h2>
  <p>Primitive data types are the most basic, lowest-level forms of data. They represent a single, simple value. In JavaScript, primitives possess two critical characteristics:</p>
  <ol>
    <li><strong>Immutability:</strong> The actual primitive value cannot be altered or modified once it is created. If you alter a string variable, you are not modifying the original string; you are destroying the old value and creating a brand new string in memory.</li>
    <li><strong>Stored by Value:</strong> Primitives are stored directly in the "Stack" memory space. When you assign a primitive to a new variable, JavaScript creates a strict copy of the actual value. Modifying the copy does not affect the original variable.</li>
  </ol>
  
  <p>Modern JavaScript defines seven primitive data types:</p>

  <h3>1. Number</h3>
  <p>Unlike languages like C or Java that have distinct types for integers (int), floating-point numbers (float), and double-precision floats (double), JavaScript uses a single <code>Number</code> type for all numbers. It follows the IEEE 754 standard as a double-precision 64-bit floating-point format.</p>
  <pre><code>let intAge = 25;       // Integer
let floatPrice = 9.99; // Floating point</code></pre>
  <p>The Number type also includes three special symbolic values:</p>
  <ul>
    <li><code>Infinity</code>: Represents mathematical infinity (e.g., the result of dividing a non-zero number by 0).</li>
    <li><code>-Infinity</code>: Represents negative infinity.</li>
    <li><code>NaN</code> (Not-a-Number): A special value representing a computational error. It is generated when a mathematical operation fails, such as attempting to divide a string of text by a number (<code>"hello" / 5</code>). Interestingly, <code>typeof NaN</code> evaluates to <code>"number"</code>.</li>
  </ul>

  <h3>2. String</h3>
  <p>A string represents textual data—a sequence of characters. Strings must be enclosed in quotes. You can use single quotes (<code>'...'</code>), double quotes (<code>"..."</code>), or backticks (<code>`...`</code>).</p>
  <p>Backticks, introduced in ES6, allow for <strong>Template Literals</strong>. Template literals support multi-line strings and string interpolation (embedding variables or expressions directly into the string using <code>${}</code> syntax), making string concatenation significantly cleaner.</p>
  <pre><code>let single = 'Single quotes work.';
let double = "Double quotes work too.";
let user = "Alice";
let greeting = `Welcome back, ${user}!`; // Template Literal</code></pre>

  <h3>3. Boolean</h3>
  <p>A boolean represents a logical entity that can strictly hold one of two values: <code>true</code> or <code>false</code>. Booleans are the backbone of decision-making and conditional testing in programming (such as <code>if...else</code> blocks and <code>while</code> loops).</p>

  <h3>4. Undefined</h3>
  <p><code>undefined</code> is a special primitive type that has exactly one value: <code>undefined</code>. When a variable is declared using <code>var</code> or <code>let</code> but has not yet been assigned a specific value by the programmer, the JavaScript engine automatically initializes it with the value of <code>undefined</code>. It represents an unintentional absence of a value.</p>
  <pre><code>let userAge;
console.log(userAge); // Outputs: undefined</code></pre>

  <h3>5. Null</h3>
  <p>While <code>undefined</code> implies a variable hasn't been initialized, <code>null</code> is used to represent the <strong>intentional, explicit absence</strong> of any object value. Programmers assign <code>null</code> to variables to deliberately clear them or indicate that they hold "nothing".</p>
  <div class="gfg-callout gfg-note">
    <h4>📝 The <code>typeof null</code> Bug</h4>
    <p>Due to a legacy bug dating back to the very first version of JavaScript, evaluating <code>typeof null</code> incorrectly returns the string <code>"object"</code>. Despite this behavior, <code>null</code> is absolutely a primitive type, not an object. The bug was never fixed because doing so would break millions of existing websites that rely on that specific behavior.</p>
  </div>

  <h3>6. BigInt</h3>
  <p>The standard <code>Number</code> type is only precise up to <code>2^53 - 1</code> (known as <code>Number.MAX_SAFE_INTEGER</code>). For mathematical operations involving astronomically large numbers (such as cryptographic calculations or high-precision timestamps), JavaScript introduced <code>BigInt</code> in ES2020. You create a BigInt by appending the letter <code>n</code> to the end of an integer, or by calling the <code>BigInt()</code> constructor.</p>
  <pre><code>let normalMax = 9007199254740991;
let hugeNumber = 9007199254740992n; // BigInt</code></pre>

  <h3>7. Symbol</h3>
  <p>Introduced in ES6, a <code>Symbol</code> is a completely unique and immutable primitive value. Symbols are primarily used as unique property keys inside objects to guarantee that properties do not conflict or overwrite each other, even if they have the same string description. Every time you invoke <code>Symbol()</code>, it generates a brand new, unique identifier.</p>
  <pre><code>let symA = Symbol("id");
let symB = Symbol("id");
console.log(symA === symB); // false</code></pre>

  <hr>

  <h2>Part 2: Non-Primitive (Reference) Data Types</h2>
  <p>Unlike primitives, Non-Primitive data types (broadly referred to as Objects) are complex data structures that can hold collections of values or complex entities. They possess two contrasting characteristics:</p>
  <ol>
    <li><strong>Mutability:</strong> The contents of reference types can be altered (properties can be added, updated, or deleted) without destroying the original structure.</li>
    <li><strong>Stored by Reference:</strong> Objects are stored in the "Heap" memory space. The variable holding the object does not store the object directly; it stores a "reference" (or memory address) pointing to the location in the heap where the object lives. If you assign an object to a new variable, both variables point to the exact same memory address. Modifying one will modify the other.</li>
  </ol>

  <h3>1. Object Literal</h3>
  <p>The standard object is an unordered collection of key-value pairs. Keys (properties) are usually strings or symbols, and values can be absolutely any data type, including functions (which act as object methods) or other nested objects.</p>
  <pre><code>let developer = {
    name: "John Doe",
    skills: ["JavaScript", "React", "Node"],
    isActive: true,
    greet: function() {
        console.log("Hello!");
    }
};</code></pre>

  <h3>2. Array</h3>
  <p>An Array is a specialized type of object used to store multiple, ordered values in a single variable. Arrays are strictly zero-indexed (the first element is at index 0). Because arrays are technically objects, <code>typeof []</code> returns <code>"object"</code>. To specifically verify if a variable is an array, you must use <code>Array.isArray(myArray)</code>.</p>

  <h3>3. Function</h3>
  <p>In JavaScript, functions are considered "first-class citizens," meaning they are just a specific type of callable object. Because they are objects, you can assign functions to variables, pass them as arguments to other functions (callbacks), and return them from functions. Interestingly, <code>typeof function(){}</code> returns a special string <code>"function"</code>, even though it is fundamentally an object.</p>

  <hr>

  <h2>Part 3: Type Coercion and Truthy/Falsy</h2>

  <h3>Implicit vs Explicit Coercion</h3>
  <p><strong>Implicit Type Coercion</strong> occurs when JavaScript automatically converts a value from one data type to another to successfully execute an operation. This is a common source of bugs for beginners.</p>
  <pre><code>console.log("5" + 3); // "53" (The + operator prefers string concatenation; 3 is coerced to "3")
console.log("5" - 3); // 2 (The - operator only does math; "5" is coerced to the number 5)</code></pre>
  
  <p><strong>Explicit Type Conversion</strong> (or Type Casting) occurs when a developer intentionally converts data using built-in functions like <code>Number()</code>, <code>String()</code>, or <code>Boolean()</code>. This is the recommended practice for predictable code.</p>

  <h3>Truthy and Falsy Values</h3>
  <p>In Boolean contexts (like an <code>if</code> statement), JavaScript forces all values to be evaluated as either <code>true</code> or <code>false</code>. Values that evaluate to false are known as <strong>Falsy</strong>. There are exactly six falsy values in JavaScript:</p>
  <ul>
    <li><code>false</code></li>
    <li><code>0</code> (including <code>-0</code> and <code>0n</code>)</li>
    <li><code>""</code> (an empty string)</li>
    <li><code>null</code></li>
    <li><code>undefined</code></li>
    <li><code>NaN</code></li>
  </ul>
  <p>Absolutely every other value in JavaScript is considered <strong>Truthy</strong>, including empty arrays (<code>[]</code>), empty objects (<code>{}</code>), and strings with empty spaces (<code>" "</code>).</p>

  <hr>
  <h3>Conclusion</h3>
  <p>A profound understanding of Data Types—differentiating between the immutable, value-based nature of Primitives and the mutable, reference-based nature of Objects—is mandatory for mastering JavaScript. Coupled with a solid grasp of how JavaScript automatically coerces types and evaluates truthy/falsy conditions, developers can architect highly stable, bug-free applications.</p>
</div>"""


with open('res/js.json', 'r') as f:
    data = json.load(f)

new_topics = []
for topic in data['topics']:
    if topic['id'] == 'js-variables':
        topic['title'] = 'JavaScript Variables & Scope'
        topic['content'] = html_variables
        new_topics.append(topic)
        
        # Insert the datatypes topic immediately after variables
        datatypes_topic = {
            "id": "js-datatypes",
            "section": "1. JavaScript Basics",
            "title": "JavaScript Data Types & Type Coercion",
            "content": html_datatypes
        }
        new_topics.append(datatypes_topic)
    elif topic['id'] == 'js-datatypes':
        # Skip if it somehow exists (so we don't duplicate it since we injected it above)
        pass
    else:
        new_topics.append(topic)

data['topics'] = new_topics

with open('res/js.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Updated js.json with split topics successfully.")
