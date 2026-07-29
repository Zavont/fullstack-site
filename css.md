1.Basics
 - intro    
    -Understanding Cascading
    -Key Features of CSS
    -Advantages of CSS
    -CSS Syntax
    

 - styling html
    - inline
    - internal
    - external

 - Box Model
    - margin
    - padding
    - border
    - content

 - selector
    - id
    - class
    - tag
    - universal
    - attribute
    - pseudo-class
    - pseudo-element
    - Specificity

 - Combinators

    -Descendant Combinator (space)
    -Child Combinator (>) 
    -Adjacent Sibling Selector (+)
    -General Sibling Selector (~)

2. Elements & Properties
    -image
    -audio
    -video
    -tables 
    -forms 

2.Positioning
    - static
    - relative
    - absolute
    - fixed
    - sticky

3.Display
    - block
    - inline
    - inline-block
    - flexbox
        - **Introduction to Flexbox**: The Flexible Box Layout Module, commonly referred to as Flexbox, was designed as a one-dimensional layout model. It offers space distribution between items in an interface and powerful alignment capabilities. Flexbox provides a more efficient way to lay out, align, and distribute space among items in a container, even when their size is unknown and/or dynamic (thus the word "flex"). A flex layout allows the container to alter its items' width/height (and order) to best fill the available space (mostly to accommodate to all kind of display devices and screen sizes). A flex container expands items to fill available free space or shrinks them to prevent overflow. Most importantly, the flexbox layout is direction-agnostic as opposed to the regular layouts (block which is vertically-based and inline which is horizontally-based). While those work well for pages, they lack flexibility (no pun intended) to support large or complex applications, especially when it comes to orientation changing, resizing, stretching, shrinking, etc.
        
        - **Flex Container Properties (Parent)**:
            - `display: flex | inline-flex;`: This defines a flex container; inline or block depending on the given value. It enables a flex context for all its direct children. Note that CSS columns have no effect on a flex container.
            
            - `flex-direction: row | row-reverse | column | column-reverse;`: This establishes the main-axis, thus defining the direction flex items are placed in the flex container. Flexbox is (usually) a single-direction layout concept. Think of flex items as primarily laying out either in horizontal rows or vertical columns.
                - `row` (default): left to right in ltr; right to left in rtl.
                - `row-reverse`: right to left in ltr; left to right in rtl.
                - `column`: same as row but top to bottom.
                - `column-reverse`: same as row-reverse but bottom to top.
            
            - `flex-wrap: nowrap | wrap | wrap-reverse;`: By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap as needed with this property.
                - `nowrap` (default): all flex items will be on one line.
                - `wrap`: flex items will wrap onto multiple lines, from top to bottom.
                - `wrap-reverse`: flex items will wrap onto multiple lines from bottom to top.
            
            - `flex-flow`: This is a shorthand for the `flex-direction` and `flex-wrap` properties, which together define the flex container's main and cross axes. The default value is `row nowrap`.
            
            - `justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;`: This defines the alignment along the main axis. It helps distribute extra free space leftover when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.
                - `flex-start` (default): items are packed toward the start of the flex-direction.
                - `flex-end`: items are packed toward the end of the flex-direction.
                - `center`: items are centered along the line.
                - `space-between`: items are evenly distributed in the line; first item is on the start line, last item on the end line.
                - `space-around`: items are evenly distributed in the line with equal space around them. Note that visually the spaces aren't equal, since all the items have equal space on both sides. The first item will have one unit of space against the container edge, but two units of space between the next item because that next item has its own spacing that applies.
                - `space-evenly`: items are distributed so that the spacing between any two items (and the space to the edges) is equal.
            
            - `align-items: stretch | flex-start | flex-end | center | baseline;`: This defines the default behavior for how flex items are laid out along the cross axis on the current line. Think of it as the `justify-content` version for the cross-axis (perpendicular to the main-axis).
                - `stretch` (default): stretch to fill the container (still respect min-width/max-width).
                - `flex-start` / `start` / `self-start`: items are placed at the start of the cross axis. The difference between these is subtle, and is about respecting the `flex-direction` rules or the `writing-mode` rules.
                - `flex-end` / `end` / `self-end`: items are placed at the end of the cross axis.
                - `center`: items are centered in the cross-axis.
                - `baseline`: items are aligned such as their baselines align.
            
            - `align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch;`: This aligns a flex container's lines within when there is extra space in the cross-axis, similar to how `justify-content` aligns individual items within the main-axis. Note: this property has no effect when there is only one line of flex items.
                - `flex-start` / `start`: lines packed to the start of the container.
                - `flex-end` / `end`: lines packed to the end of the container.
                - `center`: lines packed to the center of the container.
                - `space-between`: lines evenly distributed; the first line is at the start of the container while the last one is at the end.
                - `space-around`: lines evenly distributed with equal space around each line.
                - `space-evenly`: lines are evenly distributed, with equal space around them.
                - `stretch` (default): lines stretch to take up the remaining space.

        - **Flex Item Properties (Children)**:
            - `order: <integer>;`: By default, flex items are laid out in the source order. However, the `order` property controls the order in which they appear in the flex container. Negative values are allowed.
            
            - `flex-grow: <number>;`: This defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion. It dictates what amount of the available space inside the flex container the item should take up. If all items have `flex-grow` set to 1, the remaining space in the container will be distributed equally to all children. If one of the children has a value of 2, the remaining space would take up twice as much space as the others (or it will try to, at least). Default is 0.
            
            - `flex-shrink: <number>;`: This defines the ability for a flex item to shrink if necessary. Default is 1. Negative numbers are invalid.
            
            - `flex-basis: <length> | auto;`: This defines the default size of an element before the remaining space is distributed. It can be a length (e.g. 20%, 5rem, etc.) or a keyword. The `auto` keyword means "look at my width or height property".
            
            - `flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ];`: This is the shorthand for `flex-grow`, `flex-shrink` and `flex-basis` combined. The second and third parameters (`flex-shrink` and `flex-basis`) are optional. The default is `0 1 auto`, but if you set it with a single number value, like `flex: 5;`, that changes the `flex-basis` to 0%, so it's like setting `flex-grow: 5; flex-shrink: 1; flex-basis: 0%;`. It is recommended that you use this shorthand property rather than set the individual properties. The shorthand sets the other values intelligently.
            
            - `align-self: auto | flex-start | flex-end | center | baseline | stretch;`: This allows the default alignment (or the one specified by `align-items`) to be overridden for individual flex items. Note that `float`, `clear` and `vertical-align` have no effect on a flex item.

        - **Common Flexbox Patterns & Best Practices**:
            - **Perfect Centering**: Before Flexbox, centering an element both horizontally and vertically was notoriously difficult. With Flexbox, it is incredibly simple. Just apply `display: flex; justify-content: center; align-items: center;` to the parent container. The child element will be perfectly centered regardless of its dimensions or the dimensions of the container.
            - **Holy Grail Layout**: The Holy Grail layout consists of a header, a footer, and a main content area with two sidebars (left and right). Flexbox makes achieving this layout much easier than older float-based methods. Using `flex-direction: column` for the overall page structure and `flex-direction: row` for the main content area allows for flexible sidebars and a main content area that expands to fill the remaining space.
            - **Sticky Footer**: A common requirement is to have a footer that sticks to the bottom of the page when there is little content, but is pushed down by the content when there is a lot of it. Setting the body to `display: flex; flex-direction: column; min-height: 100vh;` and the main content area to `flex: 1` ensures the main content grows to push the footer to the bottom.
            - **Equal Height Columns**: Flexbox naturally solves the equal height column problem. By default, flex items in a row will stretch to match the height of the tallest item in that row, provided `align-items` is set to `stretch` (which is the default).
            - **Responsive Navigation Menus**: Flexbox is perfect for creating responsive navigation menus. You can easily distribute space between menu items using `justify-content: space-between` or `space-around`, and allow items to wrap on smaller screens using `flex-wrap: wrap`.
            - **Media Objects**: The media object pattern (an image or icon on one side, with descriptive text alongside it) is a classic use case for Flexbox. The image can have a fixed size, while the text container uses `flex-grow: 1` to fill the remaining space.
            - **Form Layouts**: Flexbox simplifies form layouts, such as aligning labels and inputs, or creating inline forms where elements sit side-by-side on large screens and stack on small screens.

        - **Limitations of Flexbox**:
            - Flexbox is fundamentally a one-dimensional layout system. While you can create multi-line flex layouts using `flex-wrap: wrap`, the items on each line act independently of the items on other lines. You cannot easily align an item on the second row with an item on the first row to create a strict grid structure. This is where CSS Grid comes in.
            - Performance can sometimes be an issue with very large, deeply nested flexbox structures, although modern browsers are highly optimized.

    - grid
        - **Introduction to CSS Grid Layout**: CSS Grid Layout (aka "Grid" or "CSS Grid"), is a two-dimensional grid-based layout system that, compared to any web layout system of the past, completely changes the way we design user interfaces. CSS has always been used to lay out our web pages, but it's never done a very good job of it. First, we used tables, then floats, positioning and inline-block, but all of these methods were essentially hacks and left out a lot of important functionality (vertical centering, for instance). Flexbox helped out, but it's intended for simpler one-dimensional layouts, not complex two-dimensional ones (Flexbox and Grid actually work very well together). Grid is the first CSS module created specifically to solve the layout problems we've all been hacking our way around for as long as we've been making websites.

        - **Grid Terminology**: Before diving into the properties, it's essential to understand the terminology associated with CSS Grid.
            - **Grid Container**: The element on which `display: grid` is applied. It's the direct parent of all the grid items.
            - **Grid Item**: The children (i.e. direct descendants) of the grid container.
            - **Grid Line**: The dividing lines that make up the structure of the grid. They can be either vertical ("column grid lines") or horizontal ("row grid lines") and reside on either side of a row or column.
            - **Grid Track**: The space between two adjacent grid lines. You can think of them like the columns or rows of the grid.
            - **Grid Cell**: The space between two adjacent row and two adjacent column grid lines. It's a single "unit" of the grid.
            - **Grid Area**: The total space surrounded by four grid lines. A grid area may be comprised of any number of grid cells.

        - **Grid Container Properties (Parent)**:
            - `display: grid | inline-grid;`: Defines the element as a grid container and establishes a new grid formatting context for its contents.
            
            - `grid-template-columns: <track-size> ... | <line-name> <track-size> ...;` and `grid-template-rows: <track-size> ... | <line-name> <track-size> ...;`: These properties define the columns and rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line.
                - You can use standard length values (px, em, rem, %, vh, vw, etc.).
                - **The `fr` unit**: Grid introduces the `fr` unit, which represents a fraction of the available space in the grid container. For example, `grid-template-columns: 1fr 2fr 1fr;` will create three columns where the middle one is twice as wide as the other two.
                - **`repeat()` function**: Allows you to repeat a pattern of tracks. For example, `grid-template-columns: repeat(3, 1fr);` is equivalent to `grid-template-columns: 1fr 1fr 1fr;`.
                - **`minmax()` function**: Defines a size range. For example, `minmax(100px, 1fr)` means the track will be at least 100px wide, but can grow to fill 1fr of the available space.
                - **`auto-fill` and `auto-fit`**: Used with `repeat()` to create dynamic, responsive grids without media queries. `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));` will create as many 200px columns as will fit in the container, and then distribute the remaining space equally among them. `auto-fit` works similarly but collapses empty tracks.
            
            - `grid-template-areas: "<grid-area-name> | . | none | ..." "...";`: This property allows you to define a grid layout by referencing the names of the grid areas which are specified with the `grid-area` property on grid items. Repeating the name of a grid area causes the content to span those cells. A period signifies an empty cell. The syntax itself provides a visualization of the structure of the grid.
                ```css
                .item-a { grid-area: header; }
                .item-b { grid-area: main; }
                .item-c { grid-area: sidebar; }
                .item-d { grid-area: footer; }
                
                .container {
                  display: grid;
                  grid-template-columns: 50px 50px 50px 50px;
                  grid-template-rows: auto;
                  grid-template-areas: 
                    "header header header header"
                    "main main . sidebar"
                    "footer footer footer footer";
                }
                ```
            
            - `grid-template`: A shorthand for setting `grid-template-rows`, `grid-template-columns`, and `grid-template-areas` in a single declaration.
            
            - `column-gap: <line-size>;` and `row-gap: <line-size>;`: Specifies the size of the grid lines. You can think of it like setting the width of the gutters between the columns/rows. `gap` is the shorthand for both.
            
            - `justify-items: start | end | center | stretch;`: Aligns grid items along the inline (row) axis (as opposed to `align-items` which aligns along the block (column) axis). This value applies to all grid items inside the container.
            
            - `align-items: start | end | center | stretch;`: Aligns grid items along the block (column) axis (as opposed to `justify-items` which aligns along the inline (row) axis). This value applies to all grid items inside the container.
            
            - `place-items: <align-items> / <justify-items>;`: `place-items` sets both the `align-items` and `justify-items` properties in a single declaration.
            
            - `justify-content: start | end | center | stretch | space-around | space-between | space-evenly;`: Sometimes the total size of your grid might be less than the size of its grid container. This property sets the alignment of the grid within the grid container along the inline (row) axis.
            
            - `align-content: start | end | center | stretch | space-around | space-between | space-evenly;`: This property sets the alignment of the grid within the grid container along the block (column) axis.
            
            - `place-content: <align-content> / <justify-content>;`: `place-content` sets both the `align-content` and `justify-content` properties in a single declaration.
            
            - `grid-auto-columns: <track-size> ...;` and `grid-auto-rows: <track-size> ...;`: Specifies the size of any auto-generated grid tracks (aka implicit grid tracks). Implicit tracks get created when there are more grid items than cells in the grid or when a grid item is placed outside of the explicit grid.
            
            - `grid-auto-flow: row | column | row dense | column dense;`: If you have grid items that you don't explicitly place on the grid, the auto-placement algorithm kicks in to automatically place the items. This property controls how the auto-placement algorithm works. `dense` attempts to fill in holes earlier in the grid if smaller items come up later, which may cause items to appear out of order.

        - **Grid Item Properties (Children)**:
            - `grid-column-start: <number> | <name> | span <number> | span <name> | auto;`
            - `grid-column-end: <number> | <name> | span <number> | span <name> | auto;`
            - `grid-row-start: <number> | <name> | span <number> | span <name> | auto;`
            - `grid-row-end: <number> | <name> | span <number> | span <name> | auto;`
                - Determines a grid item's location within the grid by referring to specific grid lines. `grid-column-start`/`grid-row-start` is the line where the item begins, and `grid-column-end`/`grid-row-end` is the line where the item ends.
                - `span <number>` means the item will span across the provided number of grid tracks.
            
            - `grid-column: <start-line> / <end-line> | <start-line> / span <value>;` and `grid-row: <start-line> / <end-line> | <start-line> / span <value>;`: Shorthand for `grid-column-start` + `grid-column-end`, and `grid-row-start` + `grid-row-end`, respectively.
            
            - `grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;`: Gives an item a name so that it can be referenced by a template created with the `grid-template-areas` property. Alternatively, this property can be used as an even shorter shorthand for `grid-row-start` + `grid-column-start` + `grid-row-end` + `grid-column-end`.
            
            - `justify-self: start | end | center | stretch;`: Aligns a grid item inside a cell along the inline (row) axis (as opposed to `align-self` which aligns along the block (column) axis). This value applies to the content inside a single grid item.
            
            - `align-self: start | end | center | stretch;`: Aligns a grid item inside a cell along the block (column) axis (as opposed to `justify-self` which aligns along the inline (row) axis). This value applies to the content inside a single grid item.
            
            - `place-self: <align-self> / <justify-self>;`: `place-self` sets both the `align-self` and `justify-self` properties in a single declaration.

        - **Advanced Grid Techniques & Patterns**:
            - **RAM (Repeat, Auto, Minmax)**: This is one of the most powerful techniques in CSS Grid. `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));` creates a fully responsive grid of cards that automatically wraps to the next line without requiring any media queries. The cards will be at least 250px wide, but will grow to fill available space evenly.
            - **Overlapping Content**: Unlike Flexbox or older layout methods, CSS Grid allows you to explicitly overlap elements by placing them in the same grid cells or assigning them overlapping `grid-area` values. You can then use `z-index` to control the stacking order. This opens up entirely new design possibilities for complex editorial layouts or overlapping images and text.
            - **Full-Bleed Layouts**: Creating a layout where the main content is constrained to a central column, but certain elements (like hero images or callout blocks) break out to span the full width of the viewport, is incredibly easy with Grid. You define a grid with three columns (e.g., `1fr minmax(auto, 800px) 1fr`), place standard content in the center column, and allow full-bleed elements to span all three columns.
            - **Named Grid Lines**: While you can refer to grid lines by number, you can also name them for easier reference. E.g., `grid-template-columns: [main-start] 1fr [content-start] 500px [content-end] 1fr [main-end];`. This makes positioning items much more semantic and readable.
            - **Subgrid (Level 2 Specification)**: CSS Grid Level 2 introduces the `subgrid` feature. Subgrid allows grid items that are themselves grid containers to inherit the sizing of the grid tracks from their parent grid. This solves the long-standing problem of aligning content nested within separate grid items, such as aligning card headers, bodies, and footers across a row of independently sized cards.

        - **Choosing Between Flexbox and Grid**:
            - Flexbox is for **one-dimensional** layouts – laying things out in a single row OR a single column.
            - Grid is for **two-dimensional** layouts – laying things out in rows AND columns simultaneously.
            - **Flexbox is content-out**: You use Flexbox when you have a collection of items, and you want them to distribute themselves within a container based on their sizes and the available space. The items drive the layout.
            - **Grid is layout-in**: You use Grid when you have a specific layout structure in mind, and you want to place items into that predefined structure. The container drives the layout.
            - **They work perfectly together**: The most robust layouts use both. You might use Grid for the overall page structure (header, sidebar, main content, footer) and use Flexbox for the UI elements within those areas (e.g., aligning navigation links, centering an icon within a button, or laying out a row of actions).

4.Animation   
    - keyframes
    - transition

5. Advanced
    -Pseudo Elements & 
    -Classes
    -media queries
       Z-index 


6.Bootstrap




    