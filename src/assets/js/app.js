let domFilterBox = document.getElementById('filter-box');

class Record {
    constructor(domRow) {
        this.domTableDataArray = new Array();
        this.isSelected = false;

        this._initdomTableDataArray(domRow);
    }

    _initdomTableDataArray(domRow) {
        domRow.getElementsByTagName('td').forEach((element) => {
            this.domTableDataArray.push(element);
        });
    }
}

class Column {
    constructor(tableOfColum, columnName) {
        this.domColumnHeader = HTMLElement;
        this.domRowArray = new Array();

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

        for (let idx=0; idx < tableOfColum.domRecordsArray.length; idx++) {
            let domRow = tableOfColum.domRecordsArray[idx];
            this.domRowArray.push(domRow.getElementsByTagName('th')[coloumIndex]);
        }
    }
}

class Table {
    constructor(domTable) {
        this.table = domTable;
        let domAllColumnsArray = Array.from(this.table.getElementsByTagName('tr'));
        this.headers = domAllColumnsArray[0].getElementsByTagName('th');
        domAllColumnsArray.shift();
        this.domRecordsArray = domAllColumnsArray;
        this.columnsArray = new Array();

        for (let idx=0; idx < this.headers.length; idx++) {
            let newColumn = new Column(this, this.headers[idx].innerHTML);
            this.columnsArray.push(newColumn);
        }
    }
}

let domTable = document.getElementById('table-in-stock');
const table = new Table(domTable);
const newRecordArray = ['Milk', 'dairy', '27-10-2023', 123456789123];
table.addRecord(newRecordArray);

let formProduct = document.getElementById('add-product-form');
formProduct.addEventListener("submit", (e) => {
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

  table.addRecord(inputsArray);
});
