// Require Bamazon DB Connection
const Bamazon = require('./connections').Bamazon;
// Require inquirer
const inquirer = require('inquirer');

// Function to get choice and quantity
// then complete purchase and update DB
purchase = () =>{
  // 
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
      // if there isn't enough in stock, throw error
      if(queryItem[0].stock_quantity < userInput.quantity){
        throw 'Insufficient quantity';
        return;
      }
      // else update stock in db and display purchase
      else{
        // UPDATE DB item reflecting purchased quantity
        Bamazon.queryAsync('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ? LIMIT 1', [userInput.quantity, userInput.choice])
          .then(() => {
          
          let total = parseInt(userInput.quantity) * queryItem[0].price;
          
          console.log(`\nTransaction was successful!\n
            Your total is ${total}`);
          
        })
      }
      // Close DB connection
    }).then(Bamazon.end())
      // Error with getting DB info
      .catch((err) => console.log(err));
    // Error getting user input
  }).catch((err) => console.log(err));
}

// Function to connect to DB and display products
Bamazon.connectAsync().then(() =>{
  // MySQL query for all from products table
  Bamazon.queryAsync('SELECT * FROM products')
  .then(data => {
    
    data.forEach((product) =>{
      console.log(
        `${product.item_id} -- ${product.product_name} ---- ${product.price}`
      );
    });
    // Customer can now purchase
    purchase();
  })
})

