'use strict';

var welcome = require('./welcome');

welcome('home');
var $ = require("jquery");

//feed to parse
var FEED = "http://k.img.com.ua/rss/ua/news.xml";
$.ajax(FEED, {
    accepts: {
        xml: "application/rss+xml"
    },
    type: 'GET',
    crossDomain: true,
    dataType: "xml",
    success: init
});

function init(data) {
    showDescription(data);
    getCategory(data);
}

function showDescription (data) {
    $(data).find("item").each(function () {
        var el = $(this);
        $('.col-xs-10').append(
            '<div class="col-xs-4">' +
                '<div class="image">' + el.find('image').text() + '</div>' +
                '<div class="title">' + el.find('title').text() + '</div>' +
            '</div>');
    });    
}

function getCategory (data) {
    $(data).find("item").each(function () {
        var el = $(this);
        var categoryHasSportNews = el.find("category[domain*='/sport/']");
        var categoryHasWorldNews = el.find("category[domain*='/world/']");
        var category = el.find("category[domain*='/world/']");
       
        var domain = category.attr('domain');
        var domainSport = categoryHasSportNews.attr('domain');
        var domainWorld = categoryHasWorldNews.attr('domain');

        $('.select').change(function () {
            var optionSelected = $(this).find("option:selected");
            var valueSelected  = optionSelected.val();
            
            if(valueSelected === 'sport' && domainSport !== undefined) {
                console.log(domainSport);
                console.log(el.find('category[domain="' + domainSport + '"]'));
            }
            else if (valueSelected === 'world' && domainWorld !== undefined){
                var currentEl = el.find('category[domain="' + domainWorld + '"]');
                var currentItem = currentEl.closest('item');
                $('.col-xs-10').replaceWith(
                    '<div class="col-xs-4">' +
                        '<div class="image">' + currentItem.find('image').text() + 'lhjfybg;ilaefbglahfbvgldsujhflfyhv' + '</div>' +
                        '<div class="title">' + currentItem.find('title').text() + '</div>' +
                    '</div>');
                console.log(currentItem);
            }
        });

    });
}



