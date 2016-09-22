var $ = require("jquery");

module.exports = {

    // function gets the rss at a particular url
    getRss: function (url) {        
        var xml = $.ajax(url, {
            accepts: {
                xml: "application/rss+xml"
            },
            type: 'GET',
            crossDomain: true,
            dataType: "xml",
            async: false,
            success: function (data) {
                return data;
            }
        }).responseXML;
        return xml;
    }
};





