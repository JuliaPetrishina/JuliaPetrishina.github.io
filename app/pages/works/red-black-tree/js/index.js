var black = 'black';
var red = 'red';

function RedBlackNode(key, value) {
    this.key = key;
    this.value = value;
    this.color = red;
    this.left = null;
    this.right = null;
    this.parent = null;
};

RedBlackNode.prototype.grandPa = function () {
    if ((this != null) && (this.parent != null)) {
        return this.parent.parent;
    }else {
        return null;
    };
};

RedBlackNode.prototype.uncle = function () {
    if (this.grandPa() == null) {
        return null; // нет дедушки - нет дяди
    }
    if (this.parent == this.grandPa().left) {
        return this.right;
    }
    else {
        return this.left;
    }
};

function RedBlackTree() {
    this.root = null;
    this.balancer = new Balancer(this);
};

function RedBlackNodeColor(node) {
    return node === null ? black : node.color;
};

RedBlackTree.prototype.found = function (key){
    var node = find(this.root, key);
    return node === null ? null : node.value;
};

function find(node, key) {
    while (node !== null) {
        if (key === node.key) {
            return node;
        } else if (key < node.key) {
            node = node.left;
        } else if (key > node.key) {
            node = node.right;
        }
    }

    return node;
};

RedBlackTree.prototype.add = function(key, value){

    var newNode = new RedBlackNode(key, value);

    if (this.root === null) {
        this.root = newNode;
    } else {
        var node = this.root;

        while (true) {
            if (key < node.key) {
                if (node.left === null) {
                    node.left = newNode;
                    break;
                } else {
                    node = node.left;
                }
            } else if (key > node.key) {
                if (node.right === null) {
                    node.right = newNode;
                    break;
                } else {
                    node = node.right;
                }
            } else {
                node.value = value;
                return;
            }
        }

        newNode.parent = node;
    }

    this.balancer.added(newNode);

};

function Balancer(RedBlackTree) {
    this.RedBlackTree = RedBlackTree;
};

Balancer.prototype.added = function (node) {
    this.addCase1(node);
};

Balancer.prototype.replaceNode = function (original, replacement) {
    if (original.parent === null) {
        this.RedBlackTree.root = replacement;
    } else {
        if (original === original.parent.left) {
            original.parent.left = replacement;
        } else {
            original.parent.right = replacement;
        }
    }

    if (replacement !== null) {
        replacement.parent = original.parent;
    }
};

Balancer.prototype.rotateLeft = function(node) {
    var right = node.right;
    this.replaceNode(node, right);

    node.right = right.left;
    if (right.left !== null) right.left.parent = node;
    right.left = node;
    node.parent = right;
};

Balancer.prototype.rotateRight = function (node) {
    var left = node.left;
    this.replaceNode(node, left);

    node.left = left.right;
    if (left.right !== null) left.right.parent = node;
    left.right = node;
    node.parent = left;
};

Balancer.prototype.addCase1 = function (node) {
    if (node.parent === null) {
        node.color = black;
    } else {
        this.addCase2(node);
    }
};

Balancer.prototype.addCase2 = function (node) {
    if (RedBlackNodeColor(node.parent) === black) {
        return;
    } else {
        this.addCase3(node);
    }
};

Balancer.prototype.addCase3 = function (node) {
    var uncle = node.uncle();
    var grandPa = node.grandPa();

    if (uncle !== null && RedBlackNodeColor(uncle) === red) {
        node.parent.color = black;
        uncle.color = black;
        grandPa.color = red;
        this.addCase1(grandPa);
    } else {
        this.addCase4(node);
    }
};

Balancer.prototype.addCase4 = function (node) {
    var grandPa = node.grandPa();

    if (node === node.parent.right && node.parent === grandPa.left) {
        this.rotateLeft(node.parent);
        node = node.left;
    } else if (node === node.parent.left && node.parent === grandPa.right) {
        this.rotateRight(node.parent);
        node = node.right;
    }

    this.addCase5(node);
};

Balancer.prototype.addCase5 = function (node) {
    var grandPa = node.grandPa();

    node.parent.color = black;
    grandPa.color = red;

    if (node === node.parent.left && node.parent === grandPa.left) {
        this.rotateRight(grandPa);
    } else if (node === node.parent.right && node.parent === grandPa.right) {
        this.rotateLeft(grandPa);
    }
};


var tree = new RedBlackTree();

console.log(tree.add('gee', 'gee'));
console.log(tree.found('gee')); // -> 'gee'
