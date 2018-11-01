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

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES
('Sack O Chocolate Diddlers', 'Confections', 10.99, 15),
('Neopets Trading Card', 'Games', 0.99, 999),
('Can\'t Catch Harry Card Game', 'Games', 29.99, 50),
('rogersimon10 Brand Jumper Cables', 'Automotive', 45.98, 1),
('5 Pound Gummy Worm', 'Confections', 24.95, 30),
('Lavender Bath Salts', 'Bathroom', 11.99, 40),
('Toilet Bidet', 'Bathroom', 25.00, 5),
('64-Pack Toilet Paper', 'Bathroom', 42.88, 25),
('\"Twilight\" Book on Tape', 'Books', 19.99, 8492),
('Neck Basket', 'Utilities', 19.99, 62);

SELECT * FROM products;