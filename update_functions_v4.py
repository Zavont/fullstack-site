import json

html_api_task = """<div class="course-topic">
  <div class="gfg-breadcrumb">Tutorials &gt; Web Development &gt; JavaScript &gt; Functions</div>
  <h2>3.8 API Task (Fetching Products)</h2>
  <div class="gfg-meta">
    <span class="gfg-tag" style="background: #eab308; color: #422006;">Practical Task</span>
    <span class="gfg-time">⏱️ 20 min read</span>
  </div>

  <h3>Overview</h3>
  <p>In this task, we bring together HTML, CSS, and JavaScript's Fetch API to create a dynamic product grid. We will fetch mock product data from an external API (<code>https://dummyjson.com/products</code>) and render it directly to the DOM.</p>

  <h3>The HTML Structure</h3>
  <p>The foundation is incredibly simple. We only need an empty container element with an ID that JavaScript can target.</p>
  <pre><code>&lt;div id="layout"&gt;&lt;/div&gt;</code></pre>

  <h3>The CSS Layout (Fixing Alignment and Padding)</h3>
  <p>To ensure our products look great across all devices, we use CSS Grid for the layout and Flexbox for the individual product cards. We've optimized the alignment and padding for a polished look.</p>
  <pre><code>#layout {
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

.box:hover {
    transform: translateY(-5px); /* Subtle hover effect */
}

.box img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 16px;
}

.box h1 {
    font-size: 1.25rem;
    color: #333;
    margin-bottom: 8px;
}

.box h3 {
    font-size: 1rem;
    color: #666;
    margin-bottom: 12px;
    font-weight: 400;
}

.box .price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #10b981; /* Accent color for price */
}</code></pre>

  <h3>The JavaScript (Fetch &amp; Render)</h3>
  <p>We use the <code>fetch()</code> method to grab the JSON data. Once the Promise resolves, we use the <code>.map()</code> array method to iterate over the products. For each product, we construct an HTML string using template literals and inject it into our layout container using <code>innerHTML +=</code>.</p>
  
  <div class="gfg-callout gfg-note">
    <h4>💡 Performance Note</h4>
    <p>Using <code>element.innerHTML +=</code> inside a loop forces the browser to re-parse the entire HTML string on every iteration. For better performance in large apps, you should build the full HTML string first in a variable, and then assign it to <code>innerHTML</code> once at the end.</p>
  </div>

  <pre><code>let element = document.getElementById("layout");

fetch("https://dummyjson.com/products")
    .then((response) =&gt; {
        // Step 1: Parse the response to JSON
        return response.json();
    })
    .then((data) =&gt; {
        // Step 2: Extract the products array and iterate
        data.products.map((product) =&gt; {
            // Step 3: Append constructed HTML into the DOM
            element.innerHTML += `
                &lt;div class="box"&gt;
                    &lt;img src="${product.thumbnail}" alt="${product.title}"&gt;
                    &lt;h1&gt;${product.title}&lt;/h1&gt;
                    &lt;h3&gt;${product.description}&lt;/h3&gt;
                    &lt;span class="price"&gt;$${product.price}&lt;/span&gt;
                &lt;/div&gt;
            `;
        });
    })
    .catch((err) =&gt; {
        console.error("Failed to fetch products:", err);
    });</code></pre>
</div>"""

api_task_topic = { "id": "js-functions-api-task", "section": "3. Functions", "title": "API Task", "content": html_api_task }

with open('res/js.json', 'r') as f:
    data = json.load(f)

# Find where to insert api task (after fetch)
insert_idx = len(data['topics'])
for i, t in enumerate(data['topics']):
    if t['id'] == 'js-functions-fetch':
        insert_idx = i + 1
        break

data['topics'].insert(insert_idx, api_task_topic)

with open('res/js.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Updated js.json: added api task.")
