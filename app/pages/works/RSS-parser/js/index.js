'use strict';

var welcome = require('./welcome');

welcome('home');
var $ = require("jquery");

//feed to parse
var feed = "../news.xml";
$.ajax(feed, {
    accepts: {
        xml: "application/rss+xml"
    },
    type: 'GET',
    crossDomain: true,
    dataType: "xml",
    success: showDescription
});

function showDescription (data) {
    $(data).find("item").each(function () {
        var el = $(this);
        $('.col-xs-10').append(
            '<div class="col-xs-4">' +
                '<div class="image">' + el.find('image').text() + '</div>' +
                '<div class="title">' + el.find('title').text() + '</div>' +
            '</div>');

        getCategory(data);
    });
}

function getCategory (data) {
    $(data).find("item").each(function () {
        var el = $(this);
        var category = el.find("category");
        var domain = category.attr('domain');
        var sportNews = domain.indexOf('sport');
        var worldNews = domain.indexOf('world');

        $('.select').change(function () {
            var optionSelected = $(this).find("option:selected");
            var valueSelected  = optionSelected.val();

            if(valueSelected === 'sport') {
                var sportEl = el.has(sportNews);

            }
            else if (valueSelected === 'world'){

            }
        });
    });
}



