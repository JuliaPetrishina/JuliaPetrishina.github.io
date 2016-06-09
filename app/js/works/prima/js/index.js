var n = 5;
var paths = [
    {from:0, to: 1, price: 300},
    {from:2, to: 3, price: 200},
    {from:3, to: 4, price: 150},
    {from:4, to: 1, price: 500},
    {from:3, to: 4, price: 60},
    {from:4, to: 1, price: 20},
    {from:3, to: 0, price: 450},
    {from:4, to: 1, price: 90},
    {from:2, to: 3, price: 220},
    {from:3, to: 4, price: 170},
    {from:4, to: 0, price: 30},
    {from:0, to: 4, price: 370},
    {from:2, to: 1, price: 220},
    {from:3, to: 0, price: 410},
    {from:1, to: 2, price: 80}
];

function prima(){

    var visitedCities = [];

    var pathsSort = paths.sort(function(a, b){
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
    });

    visitedCities.push(pathsSort[0]['from']);

    var cityFrom, cityTo;
    var price = 0;
    var listGrafs = [];

    while (visitedCities.length < n) {
        for (var i = 0; i < pathsSort.length; i++) {

            cityFrom = visitedCities.indexOf(pathsSort[i]['from']);
            cityTo = visitedCities.indexOf(pathsSort[i]['to']);

            if (cityFrom === -1 && cityTo !== -1) {
                visitedCities.push(pathsSort[i]['from']);
                price += pathsSort[i]['price'];
                listGrafs.push(pathsSort[i]);
                break;
            } else if (cityTo === -1 && cityFrom !== -1) {
                visitedCities.push(pathsSort[i]['to']);
                price += pathsSort[i]['price'];
                listGrafs.push(pathsSort[i]);
                break;
            }
        }

    }

    listGrafs.sort(function(a, b){
        if (a.from < b.from) {
            if (a.to < b.to) return 1;
            if (a.to > b.to) return -1;
            return 0;
        }
        if (a.from > b.from) {
            if (a.to < b.to) return 1;
            if (a.to > b.to) return -1;
            return 0;
        }
        return 0;
    });

    return listGrafs;
}

console.log('result of prima: ' + prima(paths, n));