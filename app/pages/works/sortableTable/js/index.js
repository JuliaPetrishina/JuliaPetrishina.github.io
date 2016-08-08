;(function () {
    'use strict';

    var deleteBtn = document.querySelector('.btn-del');
    var table = document.querySelector('.table');
    var ths = table.querySelectorAll('thead th');

    function selectRow(event) {
        var element = event.target;
        if (element.checked === true) {
            element.parents('tr');
            element.parents('tr')[0].classList.add('selected');
        } else {
            element.parents('tr')[0].classList.remove('selected');
        }
    };

    function deleteRow() {
        var selectedRows = table.querySelectorAll('.selected');
        selectedRows.forEach(function (item) {
            if (item.parentNode) {
                item.parentNode.removeChild(item);
            }
        });
    };

    function editRow(e) {
        var element = e.target;
        var input = document.createElement('input');
        var button = document.createElement('button');

        button.className = 'btn btn-default btn-save';
        button.innerHTML = 'save';
        input.type = 'text';
        input.value = element.innerHTML;
        element.className = 'editing';
        element.innerHTML = '';
        element.appendChild(input);
        element.appendChild(button);
        element.className = 'editing';
        input.focus();
    };

    function editRowDone() {
        var editingRow = table.querySelector('.editing');
        var inputEdit = editingRow.querySelector('input');
        editingRow.innerHTML = '';
        var value = inputEdit.value;
        if (inputEdit.parentNode) {
            inputEdit.parentNode.removeChild(inputEdit);
        }
        editingRow.innerHTML = value;
        editingRow.className = '';
    };

    function getData(elements) {
        var data = [];

        [].forEach.call(elements, function (el) {
            data.push(el.innerHTML);
        });

        data.sort(function (a, b) {
            var nameA = a.toLowerCase(), nameB = b.toLowerCase();
            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            return 0;
        });

        return data;
    }

    function getIndex(event) {
        var el = event.target;
        var index;

        [].forEach.call(ths, function (th, i) {
            if (el === th) {
                index = i;
            }
        });

        return index;
    }

    function sort(event) {
        var i = getIndex(event) + 1;
        var tds = table.querySelectorAll('tr td:nth-child(' + i + ')');
        var names = getData(tds);

        [].forEach.call(ths, function (th) {
            if (th.classList.contains('up-order')) {
                names.reverse();
            }
        });

        names.forEach(function (name, i) {
            tds[i].innerHTML = name;
        });
    };

    function sortUp() {
        var i = getIndex() + 1;
        console.log(i);
        var tds = table.querySelectorAll('tr td:nth-child(' + i + ')');
        var names = getData(tds).reverse();
        names.forEach(function (name, i) {
            tds[i].innerHTML = name;
        })
    };

    document.querySelector('body').addEventListener('change', function (event) {
        var element = event.target;
        if (element.classList.contains('checkbox')) {
            selectRow(event);
        }
    });

    deleteBtn.addEventListener('click', deleteRow);

    document.querySelector('body').addEventListener('dblclick', function (event) {
        var element = event.target;
        if (element.tagName.toLowerCase() === 'td') {
            editRow(event);
        }
    });

    document.querySelector('body').addEventListener('click', function (event) {
        var element = event.target;
        if (element.classList.contains('btn-save')) {
            editRowDone();
        }
    });

    document.querySelector('body').addEventListener('click', function (event) {
        var element = event.target;
        if (element.tagName === 'TH') {
            if (element.classList.contains('down-order')) {
                element.classList.remove('down-order');
                element.classList.add('up-order');
                sort(event);
            } else {
                element.classList.add('down-order');
                element.classList.remove('up-order');
                sort(event);
            }
        }
    });

})();
