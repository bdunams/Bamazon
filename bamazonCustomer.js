const Bamazon = require('./connections').Bamazon;

const inquirer = require('inquirer');

purchase = () =>{
  inquirer.prompt([
  {
    type: 'input',
    name: 'userChoice',
    message: 'Please enter the id of the item you wish to purchase.'
  },
  {
    type: 'input',
    name: 'userQuantity',
    message: 'And how may would you like?'
  }
  ]).then((results)=>{
    console.log(results);
  })
}

Bamazon.connectAsync().then(() =>{
  Bamazon.queryAsync('SELECT * FROM products')
  .then(data => {
    data.forEach((product) =>{
      console.log(
        `${product.item_id} -- ${product.product_name} ---- ${product.price}`
      );
    });
    purchase();
  })
  .then(Bamazon.end())
})

