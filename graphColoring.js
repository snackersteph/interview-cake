// Given an undirected graph with maximum degree D, find a graph coloring ↴ using
// at most D+1 colors.

// class GraphNode {
//   constructor(label) {
//     this.label = label;
//     this.neighbors = new Set();
//     this.color = null;
//   }
// }

// const a = new GraphNode('a');
// const b = new GraphNode('b');
// const c = new GraphNode('c');

// a.neighbors.add(b);
// b.neighbors.add(a);
// c.neighbors.add(b);
// b.neighbors.add(c);

// const graph = [a, b, c];

// Gotchas
// D+1 colors is always enough. Does your function ever need more colors than that?

// Does your function go through every color for every node? You can do better. You don't want
// N∗D in your final runtime.

// We can color a graph in linear ↴ time and space (on the number of nodes, edges and/or
// the maximum degree).

// What if the input graph has a loop? Does your function handle that reasonably?

// Solution
// We go through the nodes in one pass, assigning each node the first legal color we find.

// How can we be sure we'll always have at least one legal color for every node? In a graph
// with maximum degree DD, each node has at most DD neighbors. That means there are at most D
// colors taken by a node's neighbors. And we have D+1 colors, so there's always at least one
// color left to use.

// When we color each node, we're careful to stop iterating over colors as soon as we find a
// legal color.

function colorGraph(graph, colors) {

  graph.forEach(node => {

    if (node.neighbors.has(node)) {
      throw new Error(`Legal coloring impossible for node with loop: ${node.label}`);
    }

    // Get the node's neighbors' colors, as a set so we
    // can check if a color is illegal in constant time
    const illegalColors = new Set();

    node.neighbors.forEach(neighbor => {
      if (neighbor.color !== null) {
        illegalColors.add(neighbor.color);
      }
    });

    // Assign the first legal color
    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];

      if (!illegalColors.has(color)) {
        node.color = color;
        break;
      }
    }
  });
}

// Complexity
// O(N+M) time where N is the number of nodes and M is the number of edges.

// The runtime might not look linear because we have outer and inner loops. The trick is to look at
// each step and think of things in terms of the total number of edges (M) wherever we can:

// We check if each node appears in its own set of neighbors. Checking if something is in a set is
// O(1), so doing it for all N nodes is O(N).

// When we get the illegal colors for each node, we iterate through that node's neighbors. So in
// total, we cross each of the graphs M edges twice: once for the node on either end of each edge.
// O(M) time. When we assign a color to each node, we're careful to stop checking colors as soon
// as we find one that works. In the worst case, we'll have to check one more color than the total
// number of neighbors. Again, each edge in the graph adds two neighbors—one for the node on either
// end—so there are 2∗M neighbors. So, in total, we'll have to try O(N+M) colors.
// Putting all the steps together, our complexity is O(N+M).

// What about space complexity? The only thing we're storing is the illegalColors set. In the worst
// case, all the neighbors of a node with the maximum degree (D) have different colors, so our set
// takes up O(D) space.