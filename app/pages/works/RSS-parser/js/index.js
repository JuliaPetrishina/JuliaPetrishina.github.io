'use strict';

var welcome = require('./welcome');
welcome('home');
var $ = require("jquery");

//feed to parse
var rssNews = "http://k.img.com.ua/rss/ua/news.xml";
var rssSport = "http://k.img.com.ua/rss/ua/sport.xml";
var rssWorld = "http://k.img.com.ua/rss/ua/world.xml";
var xml;

function getRss(rss) {
    
    $.ajax(rss, {
        accepts: {
            xml: "application/rss+xml"
        },
        type: 'GET',
        crossDomain: true,
        dataType: "xml",
        success:  function(data) {
            init(data);
        }
        // success: showDescription
    });
    
}

function init(data){
    xml = data;
    showDescription(xml);
};

function getNewsId(currentItem) {
    var id = currentItem.querySelector('guid').textContent;
    return id;  
}

function showDescription(data) {
    var items = data.querySelectorAll("item");
    document.querySelector('.col-xs-10').innerHTML = '';
    Array.prototype.forEach.call(items, function (item) {
        var id = getNewsId(item),
            imageEl = item.querySelector('image').textContent,
            titleEl = item.querySelector('title').textContent,
            column = document.createElement('div');
        column.setAttribute('data-id', id);
        column.classList = 'col-xs-4 column';
        column.innerHTML = '<div class="image">' + imageEl + '</div>' + '<div class="title">' + titleEl + '</div>' + '<a href="#' + id + '" class="details-link">Details</a>';
        document.querySelector('.col-xs-10').appendChild(column);
    });    
};

function showDetails(data, el) {
    var items = data.querySelectorAll("item");
    
    Array.prototype.forEach.call(items, function (item) {
        var column = el.parentNode;
        var columnId = column.getAttribute('data-id');
        console.log(columnId);
        var id = getNewsId(item),
            newsDetails = item.querySelector('fulltext').textContent,
            imageEl = item.querySelector('image').textContent,
            titleEl = item.querySelector('title').textContent;
     
        if(id === columnId) {
            document.querySelector('.row').innerHTML = '';
            document.querySelector('.row').innerHTML = '<div class="image">' + imageEl + '</div>' + '<div class="title">' + titleEl + '</div>' + '<div class="news-details">' + newsDetails + '</div>';
        }        
    });
}

document.addEventListener('change', function (event) {
    var element = event.target;
    if (element.classList.contains('select') && element.value === 'all') {
        getRss(rssNews);
    }
    else if (element.classList.contains('select') && element.value === 'world') {
        getRss(rssWorld);
    }
    else if (element.classList.contains('select') && element.value === 'sport') {
        getRss(rssSport);
    }
});
document.addEventListener('click', function (event) {
    var element = event.target;
   
    if (element.classList.contains('details-link')) {
        getRss(rssNews);
        showDetails(xml, element);
    }
});


window.onload = function () {
    getRss(rssNews);
};


window.onhashchange = function() {
    getRss(rssNews);
};






