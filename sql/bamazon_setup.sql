CREATE SCHEMA IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products(
	item_id INTEGER AUTO_INCREMENT NOT NULL UNIQUE,
	product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(7, 2) NOT NULL,
    stock_quantity INTEGER(4) NOT NULL,
    
    PRIMARY KEY (item_id)
);

