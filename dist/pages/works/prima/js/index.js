"use strict";function prima(){var r=[],o=paths.sort(function(r,o){return r.price<o.price?-1:r.price>o.price?1:0});r.push(o[0].from);for(var t,e,f=0,i=[];r.length<n;)for(var p=0;p<o.length;p++){if(t=r.indexOf(o[p].from),e=r.indexOf(o[p].to),-1===t&&-1!==e){r.push(o[p].from),f+=o[p].price,i.push(o[p]);break}if(-1===e&&-1!==t){r.push(o[p].to),f+=o[p].price,i.push(o[p]);break}}return i.sort(function(r,o){return r.from<o.from?r.to<o.to?1:r.to>o.to?-1:0:r.from>o.from?r.to<o.to?1:r.to>o.to?-1:0:0}),i}var n=5,paths=[{from:0,to:1,price:300},{from:2,to:3,price:200},{from:3,to:4,price:150},{from:4,to:1,price:500},{from:3,to:4,price:60},{from:4,to:1,price:20},{from:3,to:0,price:450},{from:4,to:1,price:90},{from:2,to:3,price:220},{from:3,to:4,price:170},{from:4,to:0,price:30},{from:0,to:4,price:370},{from:2,to:1,price:220},{from:3,to:0,price:410},{from:1,to:2,price:80}];console.log("result of prima: "+prima(paths,n));