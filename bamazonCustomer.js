// Bamazon Customer
// Require Bamazon DB Connection
const Bamazon = require('./connections').Bamazon;
// Require inquirer
const inquirer = require('inquirer');
// Customer constructor
const Customer = require('./src/customer_class');

// New instance of Customer
const bamazonCustomer = new Customer(Bamazon);

// Display all products
bamazonCustomer.viewAllProducts().then(() => {

  // get user input to send to DB for purchase
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

    bamazonCustomer.purchase(userInput);

  })
    // Error getting user input
    .catch((err) => console.log(err));


})



