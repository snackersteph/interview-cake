// Write a function to find the 2nd largest element in a binary search tree.

// Here's a sample binary tree node class:

//   class BinaryTreeNode {
//   constructor(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }

//   insertLeft(value) {
//     this.left = new BinaryTreeNode(value);
//     return this.left;
//   }

//   insertRight(value) {
//     this.right = new BinaryTreeNode(value);
//     return this.right;
//   }
// }

// Gotchas
// Our first thought might be to do an in-order traversal of the BST ↴ and return the second-to-last
// item. This means looking at every node in the BST. That would take O(n) time and O(h) space,
// where h is the max height of the tree (which is lg(n) if the tree is balanced, but could be as
// much as nn if not).

// We can do better than O(n) time and O(h) space.

// We can do this in one walk from top to bottom of our BST. This means O(h) time (again,
// that's O(lgn) if the tree is balanced, O(n) otherwise).

// A clean recursive implementation will take O(h) space in the call stack, but we can bring our
// algorithm down to O(1) space overall.

// We can also find the second largest in one walk down the tree. At each step, we have a few cases:

// If we have a left subtree but not a right subtree, then the current node is the largest overall
// (the "rightmost") node. The second largest element must be the largest element in the left subtree.
// We use our findLargest() function above to find the largest in that left subtree!

// If we have a right child, but that right child node doesn't have any children, then the right
// child must be the largest element and our current node must be the second largest element!
// Else, we have a right subtree with more than one element, so the largest and second largest are
// somewhere in that subtree. So we step right.

function findLargest(rootNode) {
  let current = rootNode;
  while (current) {
    if (!current.right) return current.value;
    current = current.right;
  }
}

function findSecondLargest(rootNode) {
  if (!rootNode || (!rootNode.left && !rootNode.right)) {
    throw new Error('Tree must have at least 2 nodes');
  }

  let current = rootNode;

  while (current) {

    // Case: current is largest and has a left subtree
    // 2nd largest is the largest in that subtree
    if (current.left && !current.right) {
      return findLargest(current.left);
    }

    // Case: current is parent of largest, and largest has no children,
    // so current is 2nd largest
    if (
      current.right
      && !current.right.left
      && !current.right.right
    ) {
      return current.value;
    }

    current = current.right;
  }
}

// Complexity
// We're doing one walk down our BST, which means O(h) time, where hh is the height of the tree
// (again, that's O(lgn) if the tree is balanced, O(n) otherwise). O(1) space.

// What We Learned
// Here we used a "simplify, solve, and adapt" strategy.

// The question asks for a function to find the second largest element in a BST, so we started off
// by simplifying the problem: we thought about how to find the first largest element.

// Once we had a strategy for that, we adapted that strategy to work for finding the second largest
// element. It may seem counter-intuitive to start off by solving the wrong question. But starting
// off with a simpler version of the problem is often much faster, because it's easier to wrap our
// heads around right away.

// One more note about this one:
// Breaking things down into cases is another strategy that really helped us here. Notice how simple
// finding the second largest node got when we divided it into two cases:

// The largest node has a left subtree.
// The largest node does not have a left subtree.

// Whenever a problem is starting to feel complicated, try breaking it down into cases.

// It can be really helpful to actually draw out sample inputs for those cases. This'll keep your
// thinking organized and also help get your interviewer on the same page.