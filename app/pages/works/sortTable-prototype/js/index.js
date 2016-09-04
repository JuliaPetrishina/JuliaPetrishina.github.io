;(function () {
    'use strict';

    var deleteBtn = document.querySelector('.btn-del');

    var Table = function () {
        this.table = document.querySelector('.table');
        this.headerCells = this.table.querySelectorAll('thead th');
        this.row = this.table.querySelectorAll('tbody tr');
        this.filters = this.table.querySelectorAll('.filter');
    };

    Table.prototype = {
        selectRow: function (event) {
            var element = event.target;
            if (element.checked === true) {
                element.parents('tr');
                element.parents('tr')[0].classList.add('selected');
            } else {
                element.parents('tr')[0].classList.remove('selected');
            }
        },

        deleteRow: function () {
            var selectedRows = this.table.querySelectorAll('.selected');
            selectedRows.forEach(function (item) {
                if (item.parentNode) {
                    item.parentNode.removeChild(item);
                }
            })
        },

        editRow: function (e) {
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
        },

        editRowDone: function () {
            var editingRow = this.table.querySelector('.editing');
            var inputEdit = editingRow.querySelector('input');
            editingRow.innerHTML = '';
            var value = inputEdit.value;
            if (inputEdit.parentNode) {
                inputEdit.parentNode.removeChild(inputEdit);
            }
            editingRow.innerHTML = value;
            editingRow.className = '';
        },

        getData: function (elements) {
            var data = [];

            Array.prototype.forEach.call(elements, function (el) {
                data.push(el.innerHTML.toLowerCase());
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
        },

        getIndex: function (event) {
            var el = event.target;
            var index;

            Array.prototype.forEach.call(this.headerCells, function (item, i) {
                var input = item.querySelector('.filter');
                if (el === item || el === input) {
                    index = i;
                }
            });

            return index;
        },

        sortTable: function (event) {
            var i = this.getIndex(event) + 1;
            var cells = this.table.querySelectorAll('tr td:nth-child(' + i + ')');
            var names = this.getData(cells);

            Array.prototype.forEach.call(this.headerCells, function (th) {
                if (th.classList.contains('up-order')) {
                    names.reverse();
                }
            });

            names.forEach(function (name, i) {
                cells[i].innerHTML = name;
            });
        },
        
        filterData: function (event) {
            var index = this.getIndex(event) + 1,
                cells = this.table.querySelectorAll('tr td:nth-child(' + index + ')'),
                names = this.getData(cells),
                input = event.target,
                value = input.value,
                valueLength = value.length;

            for (var i = 0; i < names.length; i++) {
                var name = names[i];
                if (name.substring(0, valueLength) === value) {
                    cells.forEach(function (cell) {
                        if(name.toLowerCase() === cell.textContent.toLowerCase()) {
                            cell.style.opacity = '1';
                        }
                    });
                }
                else if (name.substring(0, valueLength) !== value){
                    cells.forEach(function (cell) {
                        if(name.toLowerCase() === cell.textContent.toLowerCase()) {
                            cell.style.opacity = '0';
                        }
                    });
                }
                else if (value === ''){
                    names.forEach(function (item, ind) {                        
                        cells[ind].style.opacity = '1';                                          
                    });
                }              
            }
        }
    };

    var table = new Table;

    document.addEventListener('change', function (event) {
        var element = event.target;
        if (element.classList.contains('checkbox')) {
            table.selectRow(event);
        }
    });

    deleteBtn.addEventListener('click', table.deleteRow);

    document.addEventListener('dblclick', function (event) {
        var element = event.target;
        if (element.tagName.toLowerCase() === 'td') {
            table.editRow(event);
        }
    });

    document.addEventListener('input', function (event) {
        var element = event.target;
        if (element.classList.contains('filter')) {
            table.filterData(event);
        }
    });

    document.addEventListener('click', function (event) {
        var element = event.target;
        if (element.classList.contains('btn-save')) {
            table.editRowDone();
        }
    });

    document.addEventListener('click', function (event) {
        var element = event.target;
        if (element.tagName === 'TH') {
            if (element.classList.contains('down-order')) {
                element.classList.remove('down-order');
                element.classList.add('up-order');
                table.sortTable(event);
            } else {
                element.classList.add('down-order');
                element.classList.remove('up-order');
                table.sortTable(event);
            }
        }
    });

})();