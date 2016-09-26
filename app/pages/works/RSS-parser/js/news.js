var $ = require("jquery");
var identifier = require("./helpers");

module.exports = {

    // Function renders xml description in the browser page
    // --------------------------------------------------
    showDescription: function (data) {
        var items = data.querySelectorAll("item");
        document.querySelector('.col-xs-10').innerHTML = '';
        Array.prototype.forEach.call(items, function (item) {
            var id = identifier.getNewsId(item),
                imageEl = item.querySelector('image').textContent,
                titleEl = item.querySelector('title').textContent,
                column = document.createElement('div');
            column.setAttribute('data-id', id);
            column.classList = 'col-xs-4 column';
            column.innerHTML = '<div class="image">' + imageEl + '</div>' + '<div class="title">' + titleEl + '</div>' + '<a href="details.html" class="details-link">Details</a>';
            document.querySelector('.col-xs-10').appendChild(column);
        });
    }
}