// hash-map.test.js
import { HashMap } from "./hash-map.js";

const test = new HashMap(16, 0.75);

// Populate the hash map
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

// Check that map is full and can overwrite
console.log("Overwrite 'apple' to 'green apple'");
test.set("apple", "green apple");
console.log(test.get("apple") === "green apple" ? "Passed" : "Failed");

console.log("Overwrite 'banana' to 'ripe banana'");
test.set("banana", "ripe banana");
console.log(test.get("banana") === "ripe banana" ? "Passed" : "Failed");

// Exceed load factor by adding one more item
console.log("Adding 'moon' should trigger resize");
test.set("moon", "silver");
console.log(test.get("moon") === "silver" ? "Passed" : "Failed");
console.log("Capacity after resize:", test.capacity);

// Test overwriting after resizing
console.log("Overwrite 'carrot' to 'baby carrot'");
test.set("carrot", "baby carrot");
console.log(test.get("carrot") === "baby carrot" ? "Passed" : "Failed");

console.log("Overwrite 'dog' to 'puppy'");
test.set("dog", "puppy");
console.log(test.get("dog") === "puppy" ? "Passed" : "Failed");

// Test other methods
console.log(
  "Check if 'grape' exists:",
  test.has("grape") ? "Passed" : "Failed"
);
console.log("Remove 'hat':", test.remove("hat") ? "Passed" : "Failed");
console.log(
  "Check length (should be 12):",
  test.length() === 12 ? "Passed" : "Failed"
);

console.log("Keys after changes:", test.keys());
console.log("Values after changes:", test.values());
console.log("Entries after changes:", test.entries());

// Clear the hash map and verify
test.clear();
console.log(
  "Map cleared, length (should be 0):",
  test.length() === 0 ? "Passed" : "Failed"
);
console.log(
  "Get 'apple' after clear (should be null):",
  test.get("apple") === null ? "Passed" : "Failed"
);
