#Red-Black tree implementation
 
###How it should work.

 You must to have a Node class, which through a prototype provides methods .add and .find. 
 
 Node has three fields:
  + data (the value at the node);
  + left (left subtree, null if not exists);
  + right (the right subtree, null if not exists);
 
The .add method takes a number and adds a node in the tree. If you already have a number in the tree - the tree does not change
 
The .find method takes a number and returns true - if it exists in the tree and false - if there is no.