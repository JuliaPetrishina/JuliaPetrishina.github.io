var paths = [
    {from: 0, to: 1, price: 300},
    {from: 2, to: 3, price: 200},
    {from: 3, to: 4, price: 150},
    {from: 4, to: 1, price: 500},
    {from: 3, to: 0, price: 450},
    {from: 4, to: 0, price: 30},
    {from: 2, to: 1, price: 220},
    {from: 2, to: 0, price: 100}
];

var cities = [
    {city: 0, color: undefined},
    {city: 1, color: undefined},
    {city: 2, color: undefined},
    {city: 3, color: undefined},
    {city: 4, color: undefined}
];

function kruscal() {

    var pathsSort = paths.sort(function (a, b) {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
    });

    function getCityColor(visitedCities, city) {
        for (var i = 0; i < visitedCities.length; i++) {
            if (visitedCities[i].color === city.color) {
                return city.color;
            }
        }

        return -1;
    }

    function getCity(cities, cityNumber) {
        for (var i = 0; i < cities.length; i++) {
            var city = cities[i];
            if (city.city === cityNumber) {
                return city;
            }
        }

        return null;
    }

    var price = 0;
    var colorCounter = 0;
    var visitedCities = [];

    for (var i = 0; i < pathsSort.length; i++) {

        var cityFrom = getCity(cities, pathsSort[i].from);
        var cityTo = getCity(cities, pathsSort[i].to);

        if (getCityColor(visitedCities, cityFrom) === -1 && getCityColor(visitedCities, cityTo) === -1) {
            colorCounter++;
            cityFrom.color = colorCounter;
            cityTo.color = colorCounter;
            visitedCities.push(cityFrom);
            visitedCities.push(cityTo);
            price += pathsSort[i].price;
        }
        else if (getCityColor(visitedCities, cityFrom) === -1 && getCityColor(visitedCities, cityTo) !== -1) {
            cityFrom.color = colorCounter;
            visitedCities.push(cityFrom);
            price += pathsSort[i].price;
        }
        else if (getCityColor(visitedCities, cityFrom) !== -1 && getCityColor(visitedCities, cityTo) === -1) {
            cityTo.color = colorCounter;
            visitedCities.push(cityTo);
            price += pathsSort[i].price;
        }
        else {
            if (cityFrom.color === cityTo.color) {
                continue;

            } else {
                visitedCities.forEach(function (el) {
                    el.color = cityFrom.color;
                });

                colorCounter = 1;
                price += pathsSort[i].price;
            }
        }
    }

    return price;

}

var pathsPrice = kruscal(cities, paths);
console.log(pathsPrice);
