// Customer constructor
const Customer = require('./customer_class');

// Store Manager Class
// Can view all and low products, add inventory and new products
// Inherits methods of Customer
class Manager extends Customer{
  
  constructor(connection){
    this.connection = connection;
  }
  
  // Method to connect to DB and display products w/ quant. < 5 
  viewLowProducts(){
    this.connection.connectAsync().then(() =>{
      // MySQL query for all from products table
      this.connection.queryAsync('SELECT * FROM products WHERE stock_quantity < 5')
      .then(data => {

        data.forEach((product) =>{
          console.log(
            `${product.item_id} -- ${product.product_name} ---- ${product.price}`
          );
        })
      })
      .then(this.connection.end());
    })
  }
  
  // Method to increase quantity of item in DB 
  // Expects an object with choice of id and quantity
  addToInventory(userInput){
    // Get DB info of the item selected
    this.connection.queryAsync('SELECT * FROM products WHERE item_id = ?', [userInput.choice])
      .then(queryItem => {
        // UPDATE Inventory
        this.connection.queryAsync('UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ? LIMIT 1', [userInput.quantity, userInput.choice])
          .then(() => {

          let newTotal = parseInt(userInput.quantity) + queryItem[0].stock_quantity;

          console.log(`\nInventory update was successful!\nNew inventory is ${newTotal}`);

        })
      // Close DB connection
      .then(this.connection.end())
    })
  }
  
  // Method to add a new product to the DB
  // Expects object with name, department, price and quantity properties
  newProduct(newProduct){
    // INSERT data into DB
    this.connection.queryAsync(
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
    .then(this.connection.end())
    // Handle error inserting data
    .catch((err) => console.log(err))
  }
}

module.exports = Manager;