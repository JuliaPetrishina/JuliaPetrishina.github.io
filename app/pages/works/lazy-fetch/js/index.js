var lazyFetch = (function createLazyFetch() {

    let array = [];

    return function lazyFetchFn(url) {
        let cash;
        for (let i = 0; i < array.length; i++){
            if(array[i].url === url){
                cash = array[i];
            }
        }
        if(cash === undefined){
            let promise = fetch(url);
            array.push({
                url: url,
                time: Date.now(),
                result: promise
            });
            return promise;
        }else if(cash !== undefined && (Date.now() - cash.time) < 30000){
            return cash.result;
        }
    }
})();


lazyFetch('http://pokeapi.co/api/v2/pokemon/1').then(r => console.log(r));
setTimeout(function(){
    lazyFetch('http://pokeapi.co/api/v2/pokemon/2').then(r => console.log(r));
}, 2000);
lazyFetch('http://pokeapi.co/api/v2/pokemon/2').then(r => console.log(r));
