require("dotenv").config();
var sequel = require("mysql");
var inquire = require("inquirer");
var fs = require("fs");
var moment = require("moment");
const cTable = require("console.table");

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
    // for(let i = 0; i < res.length; i++) {
    //     console.log("Item #" + res[i].item_id + ": " + res[i].product_name + ". Price: $" + res[i].price);
    // }

    var store = [];
    for(let i = 0; i < res.length; i++) {
        let item = {
            "Item ID": res[i].item_id,
            "Product Name": res[i].product_name,
            "Price": "$" + res[i].price,
            "In Stock": res[i].stock_quantity
        }
        store.push(item);
    }
    console.table(store);
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
        //Find the item
        for(var i = 0; i < res.length; i++) {
            //console.log("Line " + i + ": Inquire Choice-" + response.choice + " Current Item ID-" + res[i].item_id);
            if(parseInt(response.choice) === parseInt(res[i].item_id)){
                //console.log("FOUND IT!");
                //Found the item but do we have enough?
                if(parseInt(response.quantity) > res[i].stock_quantity){
                    connection.end();
                    return console.log("We don't have enough of that in stock. Please try your order again.");
                } else {
                    console.log("Placing order...");
                    connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        stock_quantity: parseInt(res[i].stock_quantity) - parseInt(response.quantity)
                    },
                    {
                        item_id: parseInt(response.choice)
                    }],
                    function(error, queryRes) {
                        if(error) {
                            console.log("Unable to perform transaction at this time.");
                            return console.log(error);
                        } else {
                            console.log("Thank U for your order!");
                            console.log("Order Summary:");
                            console.table([{
                                "Item Ordered": res[i].product_name,
                                "Price Per Item": res[i].price,
                                "Quantity Ordered": response.quantity,
                                "Order Subtotal": parseFloat(res[i].price) * parseInt(response.quantity)
                            }]);
                            fs.appendFile("log.txt",
                            "Customer Transaction | " + moment().format("MM/DD/YYYY-HH:mm:ss") + 
                            " | Ordered: " + res[i].product_name + 
                            " | Quantity: " + response.quantity +
                            " | Stock Remaining: " + (res[i].stock_quantity - response.quantity),
                            function(writeError) {
                                if(writeError){
                                    console.log("Could not log transaction to history.");
                                }
                            });
                        }
                    });
                    connection.end();
                    return;
                }
            }
        }
        //If this point is reached, the item id is invalid
        connection.end();
        return console.log("Item does not exist or is out of stock. Please try again later.");
    });
});
