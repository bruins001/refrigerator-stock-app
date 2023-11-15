<?php
class ProductController {
    private static $products = [['cheese', 'dairy', '30-11-2023', '4189596056953']]; // Static test data.

    static function getProducts() {
        return json_encode(self::$products);
    }
}
?>