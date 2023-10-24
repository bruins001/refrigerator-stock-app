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
console.log(table.columnsArray);
