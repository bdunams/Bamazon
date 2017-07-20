// Bamazon Manager
// Require Bamazon DB Connection
const Bamazon = require('./connections').Bamazon;
// Require inquirer
const inquirer = require('inquirer');
// Contains Manager Operations 
const Manager = require('./src/manager_class');

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
  
  // create new instance of Manager
  let bamazonManager = new Manager(Bamazon);
  
  switch(data.operations){
    // Display all products
    case 'view_all':
      bamazonManager.viewAllProducts();
    break;
    
    // Display products with less than 5 in inventory
    case 'view_low':
      bamazonManager.viewLowProducts();
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
          message: 'And how many would you like to add?'
        }
      ]).then((userInput)=>{
        bamazonManager.addToInventory(userInput);
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
        bamazonManager.newProduct(newProduct);
      })
    break;
  }
}).catch((err) => console.log(err));