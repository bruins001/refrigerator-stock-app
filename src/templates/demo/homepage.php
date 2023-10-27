<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/assets/css/style.css">
    <title>Homepage</title>
</head>
<body>
    <?php include 'components/_header.php'; ?>
    <main>
      <h1>Refrigerator stock app</h1>
      <h2>Product form</h2>
      <form id="add-product-form">
        <label for="add-product-name-input">Name: </label>
        <input type="text" name="name" id="add-product-name-input" required></input>
        <br />
        <label for="add-product-type-input">Type: </label>
        <input type="text" name="type" id="add-product-type-input" required></input>
        <br />
        <label for="add-product-experation-date-input">Experation date: </label>
        <input type="text" name="experation-date" id="add-product-experation-date-input" required></input>
        <br />
        <label type="text" for="add-product-barcode-input">Barcode: </label>
        <input type="number" name="barcode" id="add-product-barcode-input" required></input>
        <br />
        <input type="submit">
      </form>
    </main>
    <?php include 'components/_stockInTableFormat.php'; ?>
    <div id="filter-box"></div>
    <script src="/assets/js/app.js"></script>
</body>
</html>