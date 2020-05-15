// Write a recursive function for generating all permutations of an input string. Return them as a set.

// Don't worry about time or space complexity—if we wanted efficiency we'd write an iterative version.

// To start, assume every character in the input string is unique.

// Your function can have loops—it just needs to also be recursive.

// Gotchas
// Make sure you have a base case! ↴ Otherwise your function may never terminate!

// Solution
// If we're making all permutations for "cat," we take all permutations for "ca" and then put "t"
// in each possible position in each of those permutations. We use this approach recursively:

function getPermutations(string) {

  // Base case
  if (string.length <= 1) {
    return new Set([string]);
  }

  const allCharsExceptLast = string.slice(0, -1);
  const lastChar = string[string.length - 1];

  // Recursive call: get all possible permutations for all chars except last
  const permutationsOfAllCharsExceptLast = getPermutations(allCharsExceptLast);

  // Put the last char in all possible positions for each of the above permutations
  const permutations = new Set();
  permutationsOfAllCharsExceptLast.forEach(permutationOfAllCharsExceptLast => {
    for (let position = 0; position <= allCharsExceptLast.length; position++) {
      const permutation = permutationOfAllCharsExceptLast.slice(0, position) + lastChar + permutationOfAllCharsExceptLast.slice(position);
      permutations.add(permutation);
    }
  });

  return permutations;
}

// What We Learned
// This is one where playing with a sample input is huge. Sometimes it helps to think of algorithm
// design as a two-part process: first figure out how you would solve the problem "by hand," as
// though the input was a stack of paper on a desk in front of you. Then translate that process into code.