import {table} from './app.js';

// Fetch data
const fetchProducts = async () => {
    const response = await fetch(window.location.href + 'api/products');
    const products = await response.json();
    return products;
};

const updateProducts = async (tableToUpdate) => {
    const products = await fetchProducts();
    products.forEach((product) => {
        tableToUpdate.addRow(product);
    });
};

updateProducts(table);
setInterval(updateProducts.bind(null, table), 60000);