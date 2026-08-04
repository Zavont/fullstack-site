import json

html_operators = """<div class="course-topic">
  <div class="gfg-breadcrumb">Tutorials &gt; Web Development &gt; JavaScript &gt; Basics</div>
  <h2>JavaScript Operators</h2>
  <div class="gfg-meta">
    <span class="gfg-tag" style="background: #eab308; color: #422006;">Core Foundation</span>
    <span class="gfg-time">⏱️ 25 min read</span>
    <span class="gfg-updated">Updated: July 2026</span>
  </div>

  <p>In JavaScript, an <strong>operator</strong> is a special symbol used to perform operations on operands (values and variables). For example, in the expression <code>2 + 3</code>, the numbers <code>2</code> and <code>3</code> are the operands, and the <code>+</code> symbol is the operator. Operators are the foundation of any programming language, allowing you to manipulate data, perform mathematical calculations, compare values, and assign data to variables.</p>

  <p>JavaScript provides a rich set of operators that can be categorized based on their functionality. In this comprehensive guide, we will explore the different types of JavaScript operators, their syntax, and how they behave in various contexts.</p>

  <hr>

  <h3>1. Arithmetic Operators</h3>
  <p>Arithmetic operators are used to perform mathematical calculations on numbers. JavaScript supports all standard arithmetic operations.</p>
  <table class="gfg-table">
    <thead>
      <tr>
        <th>Operator</th>
        <th>Description</th>
        <th>Example (Let a=10, b=3)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>+</code></td>
        <td>Addition: Adds two numbers. If one operand is a string, it concatenates them.</td>
        <td><code>a + b</code> returns 13</td>
      </tr>
      <tr>
        <td><code>-</code></td>
        <td>Subtraction: Subtracts the right operand from the left operand.</td>
        <td><code>a - b</code> returns 7</td>
      </tr>
      <tr>
        <td><code>*</code></td>
        <td>Multiplication: Multiplies two numbers.</td>
        <td><code>a * b</code> returns 30</td>
      </tr>
      <tr>
        <td><code>/</code></td>
        <td>Division: Divides the left operand by the right operand.</td>
        <td><code>a / b</code> returns 3.3333</td>
      </tr>
      <tr>
        <td><code>%</code></td>
        <td>Modulus (Remainder): Returns the division remainder.</td>
        <td><code>a % b</code> returns 1</td>
      </tr>
      <tr>
        <td><code>**</code></td>
        <td>Exponentiation: Raises the first operand to the power of the second.</td>
        <td><code>a ** b</code> returns 1000</td>
      </tr>
      <tr>
        <td><code>++</code></td>
        <td>Increment: Increases an integer value by one.</td>
        <td><code>a++</code> returns 11</td>
      </tr>
      <tr>
        <td><code>--</code></td>
        <td>Decrement: Decreases an integer value by one.</td>
        <td><code>a--</code> returns 9</td>
      </tr>
    </tbody>
  </table>
  <div class="gfg-syntax-box">
    <div class="syntax-title">String Concatenation with +</div>
    <pre><code>let x = 5 + 5; // 10
let y = "5" + 5; // "55" (The + operator prefers string concatenation)
let z = "Hello" + " " + "World"; // "Hello World"</code></pre>
  </div>

  <hr>

  <h3>2. Assignment Operators</h3>
  <p>Assignment operators are used to assign values to JavaScript variables. The most common assignment operator is the equals sign (<code>=</code>), which assigns the value on the right to the variable on the left.</p>
  <ul>
    <li><code>=</code> : Assign (x = y)</li>
    <li><code>+=</code> : Add and Assign (x += y is equivalent to x = x + y)</li>
    <li><code>-=</code> : Subtract and Assign (x -= y is equivalent to x = x - y)</li>
    <li><code>*=</code> : Multiply and Assign (x *= y is equivalent to x = x * y)</li>
    <li><code>/=</code> : Divide and Assign (x /= y is equivalent to x = x / y)</li>
    <li><code>%=</code> : Modulus and Assign (x %= y is equivalent to x = x % y)</li>
    <li><code>**=</code> : Exponentiation and Assign (x **= y is equivalent to x = x ** y)</li>
  </ul>
  <pre><code>let score = 10;
score += 5; // score is now 15
score *= 2; // score is now 30</code></pre>

  <hr>

  <h3>3. Comparison (Relational) Operators</h3>
  <p>Comparison operators are used in logical statements to determine equality or difference between variables or values. They evaluate to a boolean value (<code>true</code> or <code>false</code>).</p>
  
  <h4>Loose Equality vs Strict Equality</h4>
  <p>Understanding the difference between loose (<code>==</code>) and strict (<code>===</code>) equality is crucial in JavaScript to prevent unexpected bugs caused by automatic type coercion.</p>
  <ul>
    <li><strong><code>==</code> (Loose Equality):</strong> Compares two values for equality <em>after</em> converting both values to a common type. For example, <code>5 == "5"</code> evaluates to <code>true</code>.</li>
    <li><strong><code>===</code> (Strict Equality):</strong> Compares both the value <strong>and the type</strong>. No type conversion is performed. <code>5 === "5"</code> evaluates to <code>false</code> because one is a Number and the other is a String.</li>
    <li><strong><code>!=</code> (Loose Inequality):</strong> Returns true if the operands are not equal (with type coercion).</li>
    <li><strong><code>!==</code> (Strict Inequality):</strong> Returns true if the operands are not equal and/or not of the same type.</li>
  </ul>
  <div class="gfg-callout gfg-tip">
    <h4>💡 Industry Best Practice</h4>
    <p>Always use strict equality (<code>===</code>) and strict inequality (<code>!==</code>) unless you have a highly specific reason to allow type coercion. This guarantees that your comparisons are predictable and bug-free.</p>
  </div>
  
  <h4>Relational Operators</h4>
  <ul>
    <li><code>&gt;</code> (Greater than)</li>
    <li><code>&lt;</code> (Less than)</li>
    <li><code>&gt;=</code> (Greater than or equal to)</li>
    <li><code>&lt;=</code> (Less than or equal to)</li>
  </ul>

  <hr>

  <h3>4. Logical Operators</h3>
  <p>Logical operators are used to determine the logic between variables or values. They are typically used with boolean (logical) values to form complex conditional statements.</p>
  <table class="gfg-table">
    <thead>
      <tr>
        <th>Operator</th>
        <th>Description</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>&&</code> (Logical AND)</td>
        <td>Returns true if <strong>both</strong> operands are true.</td>
        <td><code>(6 &gt; 5 && 3 &gt; 2)</code> returns true</td>
      </tr>
      <tr>
        <td><code>||</code> (Logical OR)</td>
        <td>Returns true if <strong>at least one</strong> operand is true.</td>
        <td><code>(6 &gt; 5 || 3 &lt; 2)</code> returns true</td>
      </tr>
      <tr>
        <td><code>!</code> (Logical NOT)</td>
        <td>Reverses the boolean state of its operand.</td>
        <td><code>!(6 &gt; 5)</code> returns false</td>
      </tr>
    </tbody>
  </table>

  <h4>Short-Circuit Evaluation</h4>
  <p>JavaScript logical operators evaluate from left to right and utilize "short-circuiting":</p>
  <ul>
    <li>With <code>&&</code>, if the first operand is falsy, it immediately returns the first operand and doesn't even evaluate the second one.</li>
    <li>With <code>||</code>, if the first operand is truthy, it immediately returns the first operand and skips the second.</li>
  </ul>

  <hr>

  <h3>5. Bitwise Operators</h3>
  <p>Bitwise operators treat their operands as a set of 32 bits (zeros and ones), rather than as decimal, hexadecimal, or octal numbers. They perform operations on their binary representations but return standard JavaScript numerical values.</p>
  <ul>
    <li><code>&amp;</code> (Bitwise AND)</li>
    <li><code>|</code> (Bitwise OR)</li>
    <li><code>^</code> (Bitwise XOR)</li>
    <li><code>~</code> (Bitwise NOT)</li>
    <li><code>&lt;&lt;</code> (Left Shift)</li>
    <li><code>&gt;&gt;</code> (Sign-Propagating Right Shift)</li>
    <li><code>&gt;&gt;&gt;</code> (Zero-Fill Right Shift)</li>
  </ul>
  <pre><code>let bitwiseAnd = 5 & 1; // 0101 & 0001 = 0001 (returns 1)
let bitwiseOr = 5 | 1;  // 0101 | 0001 = 0101 (returns 5)</code></pre>

  <hr>

  <h3>6. The Ternary (Conditional) Operator</h3>
  <p>The ternary operator is the only JavaScript operator that takes three operands. It is frequently used as a one-line shorthand for an <code>if...else</code> statement.</p>
  <div class="gfg-syntax-box">
    <div class="syntax-title">Syntax</div>
    <pre><code>condition ? expressionIfTrue : expressionIfFalse;</code></pre>
  </div>
  <pre><code>let age = 20;
let canDrive = (age &gt;= 16) ? "Yes" : "No";
console.log(canDrive); // "Yes"</code></pre>

  <hr>

  <h3>7. Modern ES6+ Operators</h3>
  
  <h4>Nullish Coalescing Operator (<code>??</code>)</h4>
  <p>Introduced in ES2020, the nullish coalescing operator (<code>??</code>) is a logical operator that returns its right-hand side operand when its left-hand side operand is <code>null</code> or <code>undefined</code>, and otherwise returns its left-hand side operand. This is a safer alternative to the logical OR (<code>||</code>) operator when you want to provide default values, because <code>||</code> returns the right side for <em>any</em> falsy value (like <code>0</code> or <code>""</code>).</p>
  <pre><code>let count = 0;
let text = "";

let defaultWithOr = count || 42; // Returns 42 (0 is falsy)
let defaultWithNullish = count ?? 42; // Returns 0 (0 is not null or undefined)</code></pre>

  <h4>Optional Chaining Operator (<code>?.</code>)</h4>
  <p>The optional chaining operator (<code>?.</code>) allows you to read the value of a property located deep within a chain of connected objects without having to explicitly validate that each reference in the chain is valid. If a reference is <code>null</code> or <code>undefined</code>, the expression short-circuits and evaluates to <code>undefined</code> instead of throwing a massive error.</p>
  <pre><code>let user = {
    profile: {
        email: "alice@example.com"
    }
};

// Instead of: let zip = user && user.address && user.address.zipcode;
let zip = user?.address?.zipcode; 
console.log(zip); // undefined (No error thrown!)</code></pre>

  <hr>

  <h3>Conclusion</h3>
  <p>Operators are the foundational glue that allows JavaScript developers to write dynamic, logical, and robust code. From executing basic arithmetic to safely traversing complex objects using modern optional chaining, mastering these operators ensures you can handle data transformation and application state management efficiently and safely.</p>

</div>"""

with open('res/js.json', 'r') as f:
    data = json.load(f)

for topic in data['topics']:
    if topic['id'] == 'js-operators':
        topic['content'] = html_operators

with open('res/js.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Updated js operators successfully.")
