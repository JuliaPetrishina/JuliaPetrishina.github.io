"use strict";function kruscal(){function o(o,r){for(var c=0;c<o.length;c++)if(o[c].color===r.color)return r.color;return-1}function r(o,r){for(var c=0;c<o.length;c++){var i=o[c];if(i.city===r)return i}return null}for(var c=paths.sort(function(o,r){return o.price<r.price?-1:o.price>r.price?1:0}),i=0,t=0,e=[],l=0;l<c.length;l++){var p=r(cities,c[l].from),f=r(cities,c[l].to);if(-1===o(e,p)&&-1===o(e,f))t++,p.color=t,f.color=t,e.push(p),e.push(f),i+=c[l].price;else if(-1===o(e,p)&&-1!==o(e,f))p.color=t,e.push(p),i+=c[l].price;else if(-1!==o(e,p)&&-1===o(e,f))f.color=t,e.push(f),i+=c[l].price;else{if(p.color===f.color)continue;e.forEach(function(o){o.color=p.color}),t=1,i+=c[l].price}}return i}var paths=[{from:0,to:1,price:300},{from:2,to:3,price:200},{from:3,to:4,price:150},{from:4,to:1,price:500},{from:3,to:0,price:450},{from:4,to:0,price:30},{from:2,to:1,price:220},{from:2,to:0,price:100}],cities=[{city:0,color:void 0},{city:1,color:void 0},{city:2,color:void 0},{city:3,color:void 0},{city:4,color:void 0}],pathsPrice=kruscal(cities,paths);console.log(pathsPrice);