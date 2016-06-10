var node = {
    value: 10,
    left: 5,
    right: 7
};

function BinarySearchTree() {
    this.root = null;
}

BinarySearchTree.prototype = {

    find: function(value){
        var found = false,
            current = this.root


        while(!found && current){

            if (value < current.value){
                current = current.left;

            } else if (value > current.value){
                current = current.right;

            } else {
                found = true;
            }
        }

        return found;
    },

    add: function(value){

        var node = {
                value: value,
                left: null,
                right: null
            },

            current;

        if (this.root === null){
            this.root = node;
        } else {
            current = this.root;

            while(true){

                if (value < current.value){

                    if (current.left === null){
                        current.left = node;
                        break;
                    } else {
                        current = current.left;
                    }

                } else if (value > current.value){

                    if (current.right === null){
                        current.right = node;
                        break;
                    } else {
                        current = current.right;
                    }

                } else {
                    break;
                }
            }
        }
    }

};

var tree = new BinarySearchTree (16);
console.log(tree.add(4));
console.log(tree.add(21));
console.log(tree.add(100));
console.log(tree.find(4));
console.log(tree.find(100));
console.log(tree.find(21));
console.log(tree.find(9));