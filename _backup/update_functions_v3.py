import json

html_functions_fetch = """<div class="course-topic">
  <div class="gfg-breadcrumb">Tutorials &gt; Web Development &gt; JavaScript &gt; Functions</div>
  <h2>3.7 Fetch API & HTTP Methods</h2>
  <div class="gfg-meta">
    <span class="gfg-tag" style="background: #eab308; color: #422006;">Modern JS</span>
    <span class="gfg-time">⏱️ 15 min read</span>
  </div>

  <h3>Introduction to the Fetch API</h3>
  <p>The Fetch API provides a JavaScript interface for accessing and manipulating parts of the protocol, such as requests and responses. It also provides a global <code>fetch()</code> method that provides an easy, logical way to fetch resources asynchronously across the network. Before the Fetch API, the standard way to do this was with the <code>XMLHttpRequest</code> (XHR) object, which had a clunky, callback-heavy API. The Fetch API uses Promises, which enables a simpler and cleaner API, avoiding callback hell and making it easy to remember.</p>

  <h3>Making Basic GET Requests</h3>
  <p>The most common use of <code>fetch()</code> is to retrieve data from a remote API. By default, <code>fetch()</code> makes a GET request. It takes one mandatory argument, the path to the resource you want to fetch, and returns a Promise that resolves to the Response to that request.</p>

  <pre><code>fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response =&gt; {
        // fetch() only rejects on network failure. 
        // We must manually check if the HTTP status is OK (200-299).
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parses the JSON payload
    })
    .then(data =&gt; console.log('Data received:', data))
    .catch(error =&gt; console.error('Fetch error:', error));</code></pre>

  <h3>HTTP Methods Overview</h3>
  <p>While GET requests are for retrieving data, modern web applications need to send data to the server, update existing data, and delete data. This is accomplished using different HTTP methods:</p>
  <ul>
    <li><strong>GET:</strong> Retrieve data from the server.</li>
    <li><strong>POST:</strong> Send new data to the server (e.g., submitting a form, creating a new user).</li>
    <li><strong>PUT / PATCH:</strong> Update existing data on the server.</li>
    <li><strong>DELETE:</strong> Remove data from the server.</li>
  </ul>

  <h3>Sending Data with POST Requests</h3>
  <p>To make a POST request, you need to pass an optional <code>init</code> object as the second argument to <code>fetch()</code>. This object allows you to control a number of different settings, such as the HTTP method, headers, and the body of the request.</p>

  <pre><code>const newPost = {
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
.then(response =&gt; response.json())
.then(data =&gt; console.log('Successfully created:', data))
.catch(error =&gt; console.error('Error creating post:', error));</code></pre>

  <h3>Handling Cross-Origin Requests (CORS)</h3>
  <p>When you use <code>fetch()</code> to request data from a different domain than the one that served your webpage, you are making a Cross-Origin Resource Sharing (CORS) request. For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. The server must explicitly allow your domain by setting appropriate CORS headers (like <code>Access-Control-Allow-Origin</code>). If the server does not allow it, your <code>fetch()</code> call will fail with a CORS error, regardless of whether the URL is valid.</p>

  <h3>Fetch with Async / Await</h3>
  <p>Because <code>fetch()</code> returns a Promise, it is perfectly suited for the <code>async</code> / <code>await</code> syntax, which makes asynchronous code look highly readable and synchronous.</p>

  <pre><code>async function getPostData() {
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
}</code></pre>
</div>"""

fetch_topic = { "id": "js-functions-fetch", "section": "3. Functions", "title": "Fetch API", "content": html_functions_fetch }

with open('res/js.json', 'r') as f:
    data = json.load(f)

# Filter out recursion
new_topics_list = [t for t in data['topics'] if t['id'] != 'js-functions-recursion' and t['id'] != 'js-functions-fetch']

# Find where to insert fetch (after async/await)
insert_idx = len(new_topics_list)
for i, t in enumerate(new_topics_list):
    if t['id'] == 'js-functions-asyncawait':
        insert_idx = i + 1
        break

new_topics_list.insert(insert_idx, fetch_topic)

data['topics'] = new_topics_list

with open('res/js.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Updated js.json: removed recursion, added fetch.")
