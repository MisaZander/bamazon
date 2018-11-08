USE bamazon;

INSERT INTO departments(department_name, over_head_costs)
VALUES
('Automotive', 10000),
('Bathroom', 2000),
('Books', 1500),
('Confections', 3000),
('Games', 1000),
('Utilities', 5000);

-- Add some sales
UPDATE products
SET product_sales=5164.85
WHERE item_id=1;

UPDATE products
SET product_sales=0.99
WHERE item_id=2;

UPDATE products
SET product_sales=1499.50
WHERE item_id=3;

UPDATE products
SET product_sales=0.00
WHERE item_id=4;

UPDATE products
SET product_sales=149.70
WHERE item_id=5;

UPDATE products
SET product_sales=839.30
WHERE item_id=6;

UPDATE products
SET product_sales=2375.00
WHERE item_id=7;

UPDATE products
SET product_sales=20368.00
WHERE item_id=8;

UPDATE products
SET product_sales=30144.92
WHERE item_id=9;

UPDATE products
SET product_sales=159.92
WHERE item_id=10;

UPDATE products
SET product_sales=7.18
WHERE item_id=11;