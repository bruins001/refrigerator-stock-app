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
      <label for="photo">Photo: </label>
      <input type="file" name="photo"></input>
      <br />
      <label for="name">Name: </label>
      <input type="text" name="name" required></input>
      <br />
      <label for="type">Type: </label>
      <input type="text" name="type" required></input>
      <br />
      <label for="experation-date">Experation date: </label>
      <input type="text" for="experation-date" required></input>
      <br />
      <label type="text" for="barcode">Barcode: </label>
      <input type="number" for="barcode" required></input>
      <br />
      <input type="submit">
    </form>
  </main>
  <?php include 'components/_stockInTableFormat.php'; ?>
  <script src="/assets/js/app.js"></script>
</body>
</html>