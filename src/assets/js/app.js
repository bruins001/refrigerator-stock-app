let domFilterBox = document.getElementById('filter-box'); // HTML div with the ID "filter-box" saved in a JavaScript variable, so it can be accessed via DOM.

class Row {
    /**
     * Initializes the "Row" Class.
     * @param {Table} tableOfRow 
     * @param {Array} rowArray 
     */
    constructor(tableOfRow, rowArray) {
        this.domTableDataArray = new Array();
        this.isSelected = false;

        this.reWriteRow(tableOfRow, rowArray);
    }

    /**
    * Rewrites "this.domTableDataArray" and adds an EventListener.
    * @param {Table} tableOfRow
    * @param {Array} rowArray
    */
    reWriteRow(tableOfRow, rowArray) {
        // Checks if the row isn't the same size as the length of the table headers. Throws an Error if true.
        if (tableOfRow.headersArray.length !== rowArray.length) {
            throw Error('The "rowArray" passed to the "Row" class isn\'t the same length as the table headers.');
        }

        // Creates the DOM element "tr"(table row) that contains the whole row in HTML.
        let domRow = document.createElement('tr');

        domRow.addEventListener('click', (e) => {
            e.preventDefault();
            // Clears the div with ID "filter-box" in the HTML. Together with the next if statement, this code handles the row selection and prevents undesired behavior.
            domFilterBox.innerHTML = '';

            // Toggles the "isSelected" Class variable.
            if (this.isSelected) {
                this.isSelected = false;
                return;
            } else {
                // Sets all "isSelected" Class variables in the object tableOfRow to false. At the end of the EventListener the current row (e.target) will be set to false.
                tableOfRow.rowsArray.forEach((row) => {
                    row.isSelected = false;
                });
            }

            // Selects the row and the corrosponding table header via the event.
            let domRow = e.target.parentElement;
            let domHeaders = domRow.parentElement.getElementsByTagName('tr')[0].getElementsByTagName('th');

            // Creates form for editing the row.
            let filterForm = document.createElement('form');
            filterForm.setAttribute('id', 'filter-product-form');
            let labelsAndInputsToAddArray = new Array();
            Array.from(domHeaders).forEach((element) => {
                labelsAndInputsToAddArray.push(element.innerHTML);
            });
            let iterationCounter = -1;
            Array.from(domRow.getElementsByTagName('td')).forEach((element) => {
                iterationCounter++;
                let propertyName = labelsAndInputsToAddArray[iterationCounter];

                let labelsAndInputsDiv = document.createElement('div');
                labelsAndInputsDiv.classList.add('form-group');
                let filterBoxEditNameLabel = document.createElement('label');
                filterBoxEditNameLabel.innerHTML = propertyName.charAt(0).toUpperCase() + propertyName.slice(1) + ': ';
                filterBoxEditNameLabel.setAttribute('for', 'filter-product-name-input');
                labelsAndInputsDiv.append(filterBoxEditNameLabel);
                filterForm.append(labelsAndInputsDiv);
                let filterBoxEditNameInput = document.createElement('input');
                filterBoxEditNameInput.value = element.innerHTML;
                filterBoxEditNameInput.setAttribute('id', 'filter-product-' + propertyName + '-input');
                filterBoxEditNameInput.setAttribute('name', propertyName);
                labelsAndInputsDiv.append(filterBoxEditNameInput);
                filterForm.append(labelsAndInputsDiv);
            });
            let editButton = document.createElement('input');
            editButton.setAttribute('type', 'submit');
            editButton.setAttribute('value', 'Edit');
            editButton.addEventListener('click', (e) => {
                e.preventDefault();
                let domForm = e.target.parentElement;
                let currentRow;

                // Finds the current row in other words the row that is now selected.
                tableOfRow.rowsArray.forEach((row) => {
                    if (row.isSelected === true) {
                        currentRow = row;
                    }
                });

                for (let idx=0; idx < currentRow.domTableDataArray.length; idx++) {
                    let domTableData = currentRow.domTableDataArray[idx]; // This dom element will be updated.
                    let domInputForm = domForm.getElementsByTagName('input')[idx]; // This dom element has the new data for the "domTableData" variable.
                    let newData = domInputForm.value;

                    domTableData.innerHTML = newData;
                }
                this.isSelected = false;
                domForm.remove();
            });
            filterForm.append(editButton);

            let deleteButton = document.createElement('input');
            deleteButton.setAttribute('type', 'submit');
            deleteButton.setAttribute('value', 'Delete');
            deleteButton.addEventListener('click', (e) => {
                e.preventDefault();
                let domForm = e.target.parentElement;
                let currentRow

                // Finds the current row in other words the row that is now selected.
                tableOfRow.rowsArray.forEach((row) => {
                    if (row.isSelected === true) {
                        currentRow = row;
                    }
                });

                currentRow.domTableDataArray[0].parentElement.remove(); // Removes row in HTML.

                // Removes current row from table object.
                tableOfRow.rowsArray = tableOfRow.rowsArray.filter((row) => {
                    return row !== currentRow;
                });

                this.isSelected = false;
                domForm.remove();
            });
            filterForm.append(deleteButton);
            
            this.isSelected = true;
            domFilterBox.append(filterForm);
        });

        // Creates "td"(data table) and inserts the corresponding variable from rowArray.
        for (let idx=0; idx < rowArray.length; idx++) {
            let domTableData = document.createElement('td');
            domTableData.innerHTML = rowArray[idx];
            domRow.append(domTableData);
            this.domTableDataArray.push(domTableData);
        }
        // Inserts the "tr"(table row) in "tbody"(table body) in the HTML.
        tableOfRow.table.getElementsByTagName('tbody')[0].append(domRow);
    }
}

class Column {
    /** 
     * Initializes the "Column" Class
     * @param {Table} tableOfColum
     * @param {String} columnName
     */
    constructor(tableOfColum, columnName) {
        this.domColumnHeader = HTMLElement;

        let coloumIndex = -1;
        let tableHeadersArray = tableOfColum.headersArray;

        // Finds and initializes in the Class variable "this.domColumnHeader" the column header HTML element, so it can be accessed via the DOM.
        for (let idx=0; idx < tableHeadersArray.length; idx++) {
            coloumIndex++;
            let domColumnHeader = tableHeadersArray[idx];
            if (domColumnHeader.innerHTML === columnName) {
                this.domColumnHeader = domColumnHeader;
                break;
            }
        }
    }
}

class Table {
    /**
     * Initializes the "Table" Class
     * @param {HTMLElement} domTable 
     */
    constructor(domTable) {
        this.table = domTable;
        this.headersArray = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('th');
        this.rowsArray = new Array();
        this.columnsArray = new Array();

        for (let idx=0; idx < this.headersArray.length; idx++) {
            let newColumn = new Column(this, this.headersArray[idx].innerHTML);
            this.columnsArray.push(newColumn);
        }
    }

    /**
     * Adds a "Row" object to the "rowsArray" variable
     * @param {Array} rowToAdd 
     */
    addRow(rowToAdd) {
        let rowToAddObject = new Row(this, rowToAdd);
        this.rowsArray.push(rowToAddObject);
    }
}


let domTable = document.getElementById('table-in-stock'); // Gets product table from HTML
const table = new Table(domTable); // Creates new table object based on the "Table" Class and DOM object of product table

let productForm = document.getElementById('add-product-form'); // Gets the add product form from HTML.
// Adds eventsListener to the "productForm" variable. Adds products via "table" variable.
productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const domForm = e.target;
  const inputsArray = new Array().filter.call(domForm.getElementsByTagName('input'), (element) => element.getAttribute('type') != 'submit');
  for (let idx=0; idx < inputsArray.length; idx++) {
    if (inputsArray[idx].getAttribute('name') === 'barcode' && inputsArray[idx].value.length !== 12) {
      throw new Error('The barcode isn\'t 12 digits.');
      // Converts the barcode to an int and pushes it to the array.
    } else if (inputsArray[idx].getAttribute('name') === 'barcode') {
      inputsArray[idx] = parseInt(inputsArray[idx].value);
      continue;
    }
    inputsArray[idx] = inputsArray[idx].value;
  }

  table.addRow(inputsArray);

  // Clears input domElements.
  Array.from(domForm.getElementsByTagName('input')).forEach((domElement) => {
    if (domElement.getAttribute('type') === 'submit') {
        return;
    }
    domElement.value = '';
  });
});
