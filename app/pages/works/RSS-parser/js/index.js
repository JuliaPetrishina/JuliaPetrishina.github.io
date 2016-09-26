'use strict';

var rssNews = "http://k.img.com.ua/rss/ua/news.xml";
var rssSport = "http://k.img.com.ua/rss/ua/sport.xml";
var rssWorld = "http://k.img.com.ua/rss/ua/world.xml";

var data = require('./loader');
var xmlNews = data.getRss(rssNews);
var xmlSport = data.getRss(rssSport);
var xmlWorld = data.getRss(rssWorld);

var news = require('./news');
var details = require('./details');

// EventListener on select listens of which news want to see user and renders it on the page
// -----------------------------------------------------------------------------------------
document.addEventListener('change', function (event) {
    var element = event.target;
    if (element.classList.contains('select') && element.value === 'all') {
        news.showDescription(xmlNews);
    }
    else if (element.classList.contains('select') && element.value === 'world') {
        news.showDescription(xmlSport);
    }
    else if (element.classList.contains('select') && element.value === 'sport') {
        news.showDescription(xmlWorld);
    }
});

// EventListener on link "Details" listens of which news details want to see user and renders it on the page
// ---------------------------------------------------------------------------------------------------------
document.addEventListener('click', function (event) {
   
    var element = event.target;
    
    if (element.classList.contains('details-link')) {
        event.preventDefault();        
        details.showDetails(xmlNews, element);
    }
});

window.onload = function () {
    news.showDescription(xmlNews);
};

