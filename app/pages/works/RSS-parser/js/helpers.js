var $ = require("jquery");

module.exports = {
    // Function gets id of items in xml
    // --------------------------------------------------
    getNewsId: function (currentItem) {
        var id = currentItem.querySelector('guid').textContent;
        return id;
    }
};

