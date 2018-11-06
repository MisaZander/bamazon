DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(60) NOT NULL,
    department_name VARCHAR(60) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT(11) NOT NULL DEFAULT 0
);