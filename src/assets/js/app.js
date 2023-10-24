class Table {
    constructor(domTable) {
        this.table = domTable;
        this.domAllColumnsArray = Array.from(this.table.getElementsByTagName('tr'));
    }
}

class Column {
    constructor(tableOfColoum, columnName) {
        this.tableOfColoum = tableOfColoum;
        this.columnName = columnName;
        this.domRowArray = new Array();
        
        let coloumIndex = -1;
        let tableHeadersArray = this.tableOfColoum.domAllColumnsArray[0].getElementsByTagName('th');
        for (let idx=0; idx < tableHeadersArray.length; idx++) {
            coloumIndex++;
            if (tableHeadersArray[idx].innerHTML === this.columnName) {
                break;
            }
        }

        for (let idx=1; idx < this.tableOfColoum.domAllColumnsArray.length; idx++) {
            let domRow = this.tableOfColoum.domAllColumnsArray[idx];
            this.domRowArray.push(domRow.getElementsByTagName('th')[coloumIndex]);
        }
    }
}

let domTable = document.getElementById('table-in-stock');
const table = new Table(domTable);
const column = new Column(table, "Name");
console.log(column.domRowArray);
