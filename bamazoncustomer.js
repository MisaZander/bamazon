require("dotenv").config();
var sequel = require("mysql");
var inquire = require("inquirer");
var fs = require("fs");

//Initiate Connection
var connection = sequel.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_SCHEMA,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS
});

//Display the store
connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, res) {
    //console.log(res);
    for(let i = 0; i < res.length; i++) {
        console.log("Item #" + res[i].item_id + ": " + res[i].product_name + ". Price: $" + res[i].price);
    }
    //connection.end();
    inquire.prompt([
        {
            name: "choice",
            message: "Enter the item number of the product you would like to buy: ",
            type: "input"
        },
        {
            name: "quantity",
            message: "How many do you want?: ",
            type: "input"
        }
    ]).then(function(response) {
        //console.log("You have ordered " + response.quantity + " of " + res[response.choice - 1].product_name + " for $" + res[response.choice - 1].price + " each.");
        //connection.end();
        
    });
});
