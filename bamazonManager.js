// Bamazon Manager
// Require Bamazon DB Connection
const Bamazon = require('./connections').Bamazon;
// Require inquirer
const inquirer = require('inquirer');

inquirer.prompt([
	{
	  name: 'operations',
	  message: 'Manager Options',
	  type: 'list',
	  choices: [
		  {
		  	name: "View Products for Sale",
		  	value : 'view_all'
		  },
		  {
		  	name: "View Low Inventory",
		  	value : 'view_low'
		  },
		  {
		  	name: 'Add to Inventory',
		  	value : 'more_inventory'
		  },		  
		  {
		  	name: 'Add New Product',
		  	value : 'new_product'
		  }
	  ]
	} 
]).then( (data) => {
  
  switch(data.operations){
    // Display all products
    case 'view_all':
      Bamazon.connectAsync().then(() =>{
        // MySQL query for all from products table
        Bamazon.queryAsync('SELECT * FROM products')
        .then(data => {

          data.forEach((product) =>{
            console.log(
              `${product.item_id} -- ${product.product_name} ---- ${product.price}`
            );
          })
        })
        .then(Bamazon.end());
      })
    break;
      
    case 'view_low':
      Bamazon.connectAsync().then(() =>{
        // MySQL query for all from products table
        Bamazon.queryAsync('SELECT * FROM products WHERE stock_quantity < 5')
        .then(data => {

          data.forEach((product) =>{
            console.log(
              `${product.item_id} -- ${product.product_name} ---- ${product.price}`
            );
          })
        })
        .then(Bamazon.end());
      })
    break;
      
    case 'more_inventory':
      inquirer.prompt([
        {
          type: 'input',
          name: 'choice',
          message: 'Please enter the id of the item you wish to purchase.'
        },
        {
          type: 'input',
          name: 'quantity',
          message: 'And how may would you like?'
        }
      ]).then((userInput)=>{
        // Get DB info of the item selected
        Bamazon.queryAsync('SELECT * FROM products WHERE item_id = ?', [userInput.choice])
          .then(queryItem => {
            // UPDATE Inventory
            Bamazon.queryAsync('UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ? LIMIT 1', [userInput.quantity, userInput.choice])
              .then(() => {

              let newTotal = parseInt(userInput.quantity) + queryItem[0].stock_quantity;

              console.log(`\nInventory update was successful!\nNew inventory is ${newTotal}`);

            })
          // Close DB connection
          .then(Bamazon.end())
        })
      })
    break;
        
    case 'new_product':
      inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Please enter the name of the new product.'
        },
        {
          type: 'input',
          name: 'department',
          message: 'And the department?'
        },
        {
          type: 'input',
          name: 'price',
          message: 'And at what price will it sell?'
        },
        {
          type: 'input',
          name: 'quantity',
          message: 'Finally, how many will be for sale?'
        }
      ]).then((newProduct)=>{
        // INSERT data into DB
        Bamazon.queryAsync(
          'INSERT INTO products( product_name, department_name,price, stock_quantity)VALUES(?,?,?,?)', 
          [
            newProduct.name, 
            newProduct.department, 
            parseInt(newProduct.price), 
            parseInt(newProduct.quantity)
          ])
          .then(queryItem => {
            console.log('New product has been successfully added!')
        })
        // Close DB connection
        .then(Bamazon.end())
        // Handle error inserting data
        .catch((err) => console.log(err))
      })
    break;
  }
});