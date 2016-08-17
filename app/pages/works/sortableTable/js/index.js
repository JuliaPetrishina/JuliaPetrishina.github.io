;(function () {
    'use strict';

    var deleteBtn = document.querySelector('.btn-del');
    var table = document.querySelector('.table');
    var headerCells = table.querySelectorAll('thead th');

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

        Array.prototype.forEach.call(elements, function (el) {
            data.push(el.innerHTML);
        });

        data.sort(function (a, b) {
            var first = a.toLowerCase(), 
                second = b.toLowerCase();
            if (first < second)
                return -1;
            if (first > second)
                return 1;
            return 0;
        });

        return data;
    }

    function getIndex(event) {
        var el = event.target;
        var index;

        Array.prototype.forEach.call(headerCells, function (item, i) {
            var input = item.querySelector('.input-filter');
            if (el === item || el === input) {
                index = i;
            }
        });

        return index;
    }

    function sortTable(event) {
        var i = getIndex(event) + 1;
        var cells = table.querySelectorAll('tr td:nth-child(' + i + ')');
        var names = getData(cells);

        Array.prototype.forEach.call(headerCells, function (th) {
            if (th.classList.contains('up-order')) {
                names.reverse();
            }
        });
        
        names.forEach(function (name, i) {
            cells[i].innerHTML = name;
        });
    };
    
    table.addEventListener('change', function (event) {
        var element = event.target;
        if (element.classList.contains('checkbox')) {
            selectRow(event);
        }
    });

    deleteBtn.addEventListener('click', deleteRow);

    table.addEventListener('dblclick', function (event) {
        var element = event.target;
        if (element.tagName.toLowerCase() === 'td') {
            editRow(event);
        }
    });

    table.addEventListener('click', function (event) {
        var element = event.target;
        if (element.classList.contains('btn-save')) {
            editRowDone();
        }
    });

    table.addEventListener('click', function (event) {
        var element = event.target;
        if (element.tagName === 'TH') {
            if (element.classList.contains('down-order')) {
                element.classList.remove('down-order');
                element.classList.add('up-order');
                sortTable(event);
            } else {
                element.classList.add('down-order');
                element.classList.remove('up-order');
                sortTable(event);
            }
        }
    });

})();
