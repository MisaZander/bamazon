USE bamazon;

CREATE TABLE departments(
	department_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(20) NOT NULL,
    over_head_costs DECIMAL(10, 2) NOT NULL DEFAULT 0
);

ALTER TABLE products
ADD COLUMN product_sales DECIMAL(10, 2) NOT NULL DEFAULT 0;