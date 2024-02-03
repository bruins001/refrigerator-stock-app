import {Table} from './classes.js';

let domFilterBox = document.getElementById('filter-box'); // HTML div with the ID "filter-box" saved in a JavaScript variable, so it can be accessed via DOM.

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
