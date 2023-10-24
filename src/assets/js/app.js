class Column {
    constructor(tableOfColum, columnName) {
        this.tableOfColum = tableOfColum;
        this.domColumnHeader = HTMLElement;
        this.domRowArray = new Array();
        
        let coloumIndex = -1;
        let tableHeadersArray = this.tableOfColum.headers;
        for (let idx=0; idx < tableHeadersArray.length; idx++) {
            coloumIndex++;
            let domColumnHeader = tableHeadersArray[idx];
            if (domColumnHeader.innerHTML === columnName) {
                this.domColumnHeader = domColumnHeader;
                break;
            }
        }

        for (let idx=0; idx < this.tableOfColum.domRecordsArray.length; idx++) {
            let domRow = this.tableOfColum.domRecordsArray[idx];
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
    }
}

let domTable = document.getElementById('table-in-stock');
const table = new Table(domTable);
const column = new Column(table, "Name");
console.log(column.domRowArray);
