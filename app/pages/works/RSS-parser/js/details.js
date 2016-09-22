var $ = require("jquery");
var identifier = require("./helpers");

module.exports = {

    // Function renders xml details of clicked news
    // -------------------------------------------------- 
    showDetails: function (data, el) {
        var items = data.querySelectorAll("item");
        Array.prototype.forEach.call(items, function (item) {
            var column = el.parentNode;
            var columnId = column.getAttribute('data-id');
            var id = identifier.getNewsId(item),
                newsDetails = item.querySelector('fulltext').textContent,
                imageEl = item.querySelector('image').textContent,
                titleEl = item.querySelector('title').textContent;

            if (id === columnId) {
                document.querySelector('.row').innerHTML = '';
                document.querySelector('.row').innerHTML =
                    '<div class="col-xs-12">' +
                    '<a href="index.html">Back</a>' +
                    '<div class="image">' + imageEl + '</div>' +
                    '<div class="title">' + titleEl + '</div>' +
                    '<div class="news-details">' + newsDetails + '</div>' +
                    '</div>';
            }
        });
    }
};