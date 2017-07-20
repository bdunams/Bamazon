// Store Manager Class
// Can view all and low products, add inventory and new products
class Customer{
  // Expects DB connection
  constructor(connection){
    this.connection = connection;
  }
  
  // Method to connect to DB and display all products
  viewAllProducts(){
      
      return this.connection.queryAsync('SELECT * FROM products')
      .then(data => {

        data.forEach((product) =>{
          console.log(
            `${product.item_id} -- ${product.product_name} ---- ${product.price}`
          );
        })
        
      })
    .catch((err) => console.log(err));

  }
  
  // Method to close DB connection 
  closeConnection(){
    this.connection.end()
  }
  
  // Method to get choice and quantity
  // then complete purchase and update DB
  // Expects object of item id and quantity
  purchase(userInput){
    
    // Get DB info of the item selected
    this.connection.queryAsync('SELECT * FROM products WHERE item_id = ?', [userInput.choice])
      .then(queryItem => {
      
      // if there isn't enough in stock, throw error
      if(queryItem[0].stock_quantity < userInput.quantity){
        throw 'Insufficient quantity';
        this.connection.end();
        return;
      }
      
      // else update stock in db and display purchase
      else{
        // UPDATE DB item reflecting purchased quantity
        this.connection.queryAsync('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ? LIMIT 1', [userInput.quantity, userInput.choice])
          .then(() => {
          
          let total = parseInt(userInput.quantity) * queryItem[0].price;
          
          console.log(`\nTransaction was successful!\n
            Your total is ${total}`);
          
          // Close DB connection
        }).then(this.connection.end())
          .catch((err) => console.log(err));
      }
      
      
    })
      // Handle error with getting DB info
      .catch((err) => console.log(err));
  }
}

module.exports = Customer;