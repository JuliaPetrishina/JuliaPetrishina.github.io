window.onload = function () {

    function getUsersList() {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://jsonplaceholder.typicode.com/users');
        request.send();

        request.addEventListener('readystatechange', function () {
            var startTime = new Date();
            if (request.readyState === request.DONE) {
                var users = JSON.parse(request.responseText),
                    endTime = new Date(),
                    loadTime = endTime - startTime,
                    loadTimeTag = document.querySelector('.loadtime');

                loadTimeTag.innerHTML = loadTime;
                cb(users);
            }
        });
    };

    function cb(u) {
        for (var i = 0; i < u.length; i++) {
            var currentUser = u[i],
                list = document.querySelector('.list'),
                listItem = document.createElement('li'),
                link = document.createElement('a');

            link.innerHTML = currentUser.name;
            link.setAttribute('href', 'mailto:' + currentUser.email);

            listItem.classList.add('list-group-item');
            listItem.appendChild(link);
            list.appendChild(listItem);
            link.onmouseover = function (event) {
                var content = event.target.innerHTML;
                event.target.setAttribute('title', content);
            };
            link.onmouseout = function (event) {
                event.target.removeAttribute('title');
            }
        }
    }

    var btn = document.querySelector('.btn');
    btn.addEventListener('click', getUsersList, false);

    getUsersList();

};