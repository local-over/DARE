const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'docs/docs.html');
let html = fs.readFileSync(target, 'utf8');

// 1. Update Title
html = html.replace(
    '<title>DARE ENGINE v2 | Documentation — The AI-Native PDF Language</title>',
    '<title>DARE ENGINE v3.1 | Documentation — The AI-Native PDF Language</title>'
);

// 2. Update Version span
html = html.replace(
    'VERSION\n                2.0',
    'VERSION 3.1.0'
);
html = html.replace(
    'VERSION 2.0',
    'VERSION 3.1.0'
);

// 3. Update V2 text
html = html.replace(
    '<p style="color: var(--accent); font-weight: 600;">V2 ships with 16 built-in components, professional chart\n                rendering, and a live web compiler.</p>',
    '<p style="color: var(--accent); font-weight: 600;">V3.1 ships with logic components (<code>each</code>, <code>if</code>), new vector shapes, advanced pagination controls (<code>unbreakable</code>), and robust CLI tools.</p>'
);

// 4. Add Sidebar link
html = html.replace(
    '<a href="#v2-components" class="nav-link" style="color:#a855f7">V2 Components ✨</a>',
    '<a href="#v2-components" class="nav-link" style="color:#a855f7">V2 Components ✨</a>\n            <a href="#v3-components" class="nav-link" style="color:#fbbf24">V3.1 Components ⚡</a>'
);

// 5. Add V3 Components section
const v3Section = `
        <section id="v3-components">
            <h2>⚡ V3.1 Components</h2>
            <p>New logic and advanced layout components introduced in V3.1.</p>
            <table>
                <thead>
                    <tr>
                        <th>Component</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Example</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code class="inline">each</code></td>
                        <td>Container</td>
                        <td>Iterate over an array in @data to render children dynamically.</td>
                        <td><code class="inline">each(item in user.items) { txt { {{item.name}} } }</code></td>
                    </tr>
                    <tr>
                        <td><code class="inline">if</code></td>
                        <td>Container</td>
                        <td>Conditionally render children if a @data path is truthy.</td>
                        <td><code class="inline">if(user.isAdmin) { badge(bg=red) { ADMIN } }</code></td>
                    </tr>
                    <tr>
                        <td><code class="inline">shape</code></td>
                        <td>Void</td>
                        <td>Draw basic vector shapes: <code>circle</code>, <code>ellipse</code>, <code>square</code>, <code>triangle</code>.</td>
                        <td><code class="inline">shape(type=circle, w=20, h=20, bg=red) {}</code></td>
                    </tr>
                    <tr>
                        <td><code class="inline">unbreakable</code></td>
                        <td>Container</td>
                        <td>Prevents the block from being broken across pages.</td>
                        <td><code class="inline">unbreakable { box { ... } }</code></td>
                    </tr>
                </tbody>
            </table>
        </section>
`;

html = html.replace(
    '</section>\n\n        <section id="cli">',
    '</section>\n' + v3Section + '\n        <section id="cli">'
);

// 6. Update CLI
html = html.replace(
    'node cli.js examples/ultimate.dare report.pdf',
    'node cli.js examples/ultimate.dare report.pdf\n\n<span class="tk-cm"># Fail if page count mismatch</span>\nnode cli.js examples/ultimate.dare report.pdf --expect-pages 1'
);

fs.writeFileSync(target, html);
console.log('docs.html updated successfully.');
