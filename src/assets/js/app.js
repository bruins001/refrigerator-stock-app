let domFilterBox = document.getElementById('filter-box');

class Row {
    constructor(tableOfRow, rowArray) {
        this.domTableDataArray = new Array();
        this.isSelected = false;

        this.reWriteRow(tableOfRow, rowArray);
    }

    reWriteRow(tableOfRow, rowArray) {
        if (tableOfRow.headers.length !== rowArray.length) {
            throw Error('The "rowArray" passed to the "Row" class isn\'t the same length as the table headers');
        }

        let domRow = document.createElement('tr');
        for (let idx=0; idx < rowArray.length; idx++) {
            let domTableData = document.createElement('td');
            domTableData.innerHTML = rowArray[idx];
            domRow.append(domTableData);
            this.domTableDataArray.push(domTableData);
        }
        tableOfRow.table.getElementsByTagName('tbody')[0].append(domRow);
    }
}

class Column {
    constructor(tableOfColum, columnName) {
        this.domColumnHeader = HTMLElement;
        this.domRow = new Array();

        let coloumIndex = -1;
        let tableHeadersArray = tableOfColum.headers;
        for (let idx=0; idx < tableHeadersArray.length; idx++) {
            coloumIndex++;
            let domColumnHeader = tableHeadersArray[idx];
            if (domColumnHeader.innerHTML === columnName) {
                this.domColumnHeader = domColumnHeader;
                break;
            }
        }

        for (let idx=0; idx < tableOfColum.rowsArray.length; idx++) {
            let domRow = tableOfColum.rowsArray[idx];
            this.domRow.push(domRow.getElementsByTagName('th')[coloumIndex]);
        }
    }
}

class Table {
    constructor(domTable) {
        this.table = domTable;
        this.headers = HTMLElement;
        this.rowsArray = new Array();
        this.columnsArray = new Array();

        this._initClassVariables(this.table);
    }

    _initClassVariables(domTable) {
        let domColumnArray = Array.from(this.table.getElementsByTagName('tr'));

        this.table = domTable;
        this.headers = domColumnArray[0].getElementsByTagName('th');
        this.rowsArray = new Array();
        this.columnsArray = new Array();

        for (let idx=0; idx < this.headers.length; idx++) {
            let newColumn = new Column(this, this.headers[idx].innerHTML);
            this.columnsArray.push(newColumn);
        }
    }

    addRow(rowToAdd) {
        let rowToAddObject = new Row(this, rowToAdd);
        this.rowsArray.push(rowToAddObject);
    }
}

let domTable = document.getElementById('table-in-stock');
const table = new Table(domTable);
const newRowArray = ['Milk', 'dairy', '27-10-2023', 123456789123];
table.addRow(newRowArray);

let productForm = document.getElementById('add-product-form');
productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let domForm = e.target;
  let inputsArray = new Array().filter.call(domForm.getElementsByTagName('input'), (element) => element.getAttribute('type') != 'submit');
  for (let idx=0; idx < inputsArray.length; idx++) {
    console.log(inputsArray[idx].getAttribute('name') === 'barcode');
    if (inputsArray[idx].getAttribute('name') === 'barcode' && inputsArray[idx].value.length !== 12) {
      throw new Error('The barcode isn\'t 12 digits.');
    } else if (inputsArray[idx].getAttribute('name') === 'barcode') {
      inputsArray[idx] = parseInt(inputsArray[idx].value);
      continue;
    }
    inputsArray[idx] = inputsArray[idx].value;
  }

  table.addRow(inputsArray);
});
