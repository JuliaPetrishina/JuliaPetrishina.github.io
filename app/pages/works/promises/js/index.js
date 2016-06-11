window.onload = function () {

    function all(promises) {

        const promise = new Promise(function (resolve, reject) {
            let counter = 0;
            const arr = [];
            const obj = {};

            if (promises instanceof Array) {
                for (let i = 0; i < promises.length; i++) {
                    promises[i].then(function (arg) {
                        counter++;
                        arr[i] = arg;
                        if (counter === promises.length) {
                            resolve(arr);
                        }
                    }, function (arg) {
                        reject(arg);
                    });
                }
            } else if (promises instanceof Object) {
                for (let key in promises) {
                    obj[key] = null;

                    promises[key].then(function (arg) {
                        counter++;
                        obj[key] = arg;
                        if (counter == Object.keys(promises).length) {
                            resolve(obj);
                        }
                    })
                }
            }
        });

        return promise;

    }

    const p1 = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Promise1");
        }, 7000);

    });

    const p2 = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Promise2");
        }, 1000);
    });

    const p3 = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Promise3");
        }, 3000);
    });

    const e1 = new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject("Error1");
        }, 0);
    });
    all([p1, p2]).then(r => console.log(r)) // выведет ['Promise1', 'Promise2']
    all({foo: p2, bar: p1}).then(r => console.log(r)) // выведет { foo: 'Promise2', bar: 'Promise1' }
    all([p1, e1]).catch(r => console.log(r)) // выведет 'Error1'

};






