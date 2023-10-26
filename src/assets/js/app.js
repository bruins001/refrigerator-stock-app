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

    addNewRows = (RowsToAdd) => {
        for (let rowIdx=0; rowIdx < RowsToAdd.length; rowIdx++) {
            RowsToAdd[rowIdx].addEventListener('dblclick', (e) => {
                e.preventDefault();
                console.log('You dubble clicked a product property.');
            });
            console.log("test");
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

    addRecord = (newRecordArray) => {
        if (newRecordArray.length != this.columnsArray.length) {
            throw new Error('Argument "newRecordArray" is not the same length as the number of colums in this Table.');
        }

        let domNewTableRow = document.createElement('tr');
        for (let idx=0; idx<newRecordArray.length; idx++) {
            let domNewRecord = document.createElement('td');
            domNewRecord.append(newRecordArray[idx]);
            domNewTableRow.append(domNewRecord);
            this.columnsArray[idx].addNewRows(new Array(domNewRecord));
        }

        this.table.getElementsByTagName('tbody')[0].appendChild(domNewTableRow);
        this.domRecordsArray.push(domNewTableRow);
    }
}

let domTable = document.getElementById('table-in-stock');
const table = new Table(domTable);
const newRecordArray = ['placeholder', 'placeholder', 'placeholder', 'placeholder'];
table.addRecord(newRecordArray);

let formProduct = document.getElementById('form-add-product');
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
