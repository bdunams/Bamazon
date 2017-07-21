-- insert row into db table
INSERT INTO products(
-- column names
	product_name,
    department_name,
    price,
    stock_quantity
)
VALUES
( 'Sports Coat', 'Clothing', 110, 110 ),
( 'Hat', 'Clothing',  49.99, 100 ),
( 'IPhone 7', 'Electronics',  700, 75 ),
( 'Bluetooth Headphones', 'Electronics', 80, 150 ),
( 'The World of JavaScript', 'Books',  35, 80 ),
( 'JavaScript Fundamentals', 'Books',  45, 35 ),
( 'Kong: Skull Island Blu-ray', 'Movies',  25.99, 120 ),
( 'Guardians of the Galaxy 2', 'Movies',  19.99, 100 ),
( 'Madden 2018', 'Games',  59.99, 150 ),
( 'Mass Effect Andromeda', 'Games',  39.99, 90 ),
( 'Washing Machine', 'Appliances',  649.99, 100 ),
( 'Frigerator', 'Appliances',  1119.99, 80 )