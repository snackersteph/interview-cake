// Write a function to see if a binary tree ↴ is "superbalanced" (a new tree property we just made
// up). A tree is "superbalanced" if the difference between the depths of any two leaf nodes
// is no greater than one.

// Here's a sample binary tree node class:

// class BinaryTreeNode {
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

// Solution
// We do a depth-first walk ↴ through our tree, keeping track of the depth as we go. When we find a
// leaf, we add its depth to an array of depths if we haven't seen that depth already.

// Each time we hit a leaf with a new depth, there are two ways that our tree might now be unbalanced:

// There are more than 2 different leaf depths
// There are exactly 2 leaf depths and they are more than 1 apart.
// Why are we doing a depth-first walk and not a breadth-first ↴ one? You could make a case for
// either. We chose depth-first because it reaches leaves faster, which allows us to short-circuit
// earlier in some cases.

function isBalanced(treeRoot) {

  // A tree with no nodes is superbalanced, since there are no leaves!
  if (!treeRoot) {
    return true;
  }

  const depths = []; // We short-circuit as soon as we find more than 2

  // Nodes will store pairs of a node and the node's depth
  const nodes = [];
  nodes.push([treeRoot, 0]);

  while (nodes.length) {

    // Pop a node and its depth from the top of our stack
    const nodePair = nodes.pop();
    const node = nodePair[0];
    const depth = nodePair[1];

    if (!node.left && !node.right) {

      // Сase: we found a leaf
      // We only care if it's a new depth
      if (depths.indexOf(depth) < 0) {
        depths.push(depth);

        // Two ways we might now have an unbalanced tree:
        //   1) More than 2 different leaf depths
        //   2) 2 leaf depths that are more than 1 apart
        if (
          (depths.length > 2)
          || (depths.length === 2 && Math.abs(depths[0] - depths[1]) > 1)
        ) {
          return false;
        }
      }
    } else {

      // Case: this isn't a leaf - keep stepping down
      if (node.left) {
        nodes.push([node.left, depth + 1]);
      }
      if (node.right) {
        nodes.push([node.right, depth + 1]);
      }
    }
  }

  return true;
}

// Complexity
// O(n) time and O(n) space.

// For time, the worst case is the tree is balanced and we have to iterate over all n nodes
// to make sure. For the space cost, we have two data structures to watch: depths and nodes.

// depths will never hold more than three elements, so we can write that off as O(1)O(1).

// Because we’re doing a depth first search, nodes will hold at most dd nodes where dd is the depth
// of the tree (the number of levels in the tree from the root node down to the lowest node). So
// we could say our space cost is O(d).

// But we can also relate d to n. In a balanced tree, d is O(\log_{2}(n)). And the more unbalanced
// the tree gets, the closer dd gets to n. In the worst case, the tree is a straight line of right
// children from the root where every node in that line also has a left child. The traversal will
// walk down the line of right children, adding a new left child to nodes at each step. When the
// traversal hits the rightmost node, nodes will hold half of the nn total nodes in the tree. Half
// n is O(n), so our worst case space cost is O(n).