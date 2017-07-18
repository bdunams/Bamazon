// Require Bamazon DB Connection
const Bamazon = require('./connections').Bamazon;

class Manager{
  
  constructor(){
    
  }
  
  viewAllProducts(){
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
  }
  
  viewLowProducts(){
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
  }
  
  addToInventory(userInput){
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
  }
  
  newProduct(newProduct){
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
  }
}

module.exports = Manager;