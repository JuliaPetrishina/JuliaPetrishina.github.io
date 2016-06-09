var paths = [
    {
        from: 1,
        to: 2,
        price: 7
    },
    {
        from: 1,
        to: 3,
        price: 9
    },
    {
        from: 6,
        to: 1,
        price: 14
    },
    {
        from: 2,
        to: 3,
        price: 10
    },
    {
        from: 4,
        to: 2,
        price: 15
    },
    {
        from: 4,
        to: 3,
        price: 11
    },
    {
        from: 5,
        to: 4,
        price: 6
    },
    {
        from: 5,
        to: 6,
        price: 9
    },
    {
        from: 6,
        to: 3,
        price: 2
    }
];

function djkstra(edges, start, end) {
    var prices = {};
    prices[start] = {
        price: 0,
        path: [start]
    };
    var queue = [start];

    while (queue.length) {
        var current = queue.shift(); //1

        for (var i = 0; i < edges.length; i++) {// i = 0
            if (edges[i].from === current || edges[i].to === current) {
                var destination;

                if (edges[i].from === current) {
                    destination = edges[i].to;
                }
                else {
                    destination = edges[i].from;
                }

                if (typeof prices[destination] === 'undefined') {
                    prices[destination] = {
                        price: Infinity
                    }
                }

                if (prices[current].price + edges[i].price < prices[destination].price) {
                    prices[destination] = {
                        price: prices[current].price + edges[i].price,
                        path: prices[current].path.concat(destination)
                    };

                    if (queue.indexOf(destination) === -1) {
                        queue.push(destination);
                    }
                }
            }
        }
    }

    return prices[end];
}

console.log(djkstra(paths, 1, 4));
//[1, 3, 4]
console.log(djkstra(paths, 1, 5));
//[1, 3, 6, 5]
