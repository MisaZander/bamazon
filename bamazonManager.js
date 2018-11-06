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

inquire.prompt([
    {
        name: "query",
        type: "list",
        message: "Hello person of obvious superiority. What would you like to do?",
        choices: ["View Inventory Report", "View Low Inventory", "Receive/Restock", "Receive New Item"]
    }
]).then(function(response) {
    var theCase = response.query;
    switch(theCase) {
        case "View Inventory Report":
            fullReport();
        break;
        case "View Low Inventory":
            lowReport();
        break;
        case "Receive/Restock":
            receive();
        break;
        case "Receive New Item":
            receiveNew();
        break;
        default:
            return console.log("Inquirer broke. Please pour gas on your computer and light it on fire.");
    } //switch
}); //Inquirer then

function fullReport(){
    connection.query("SELECT * FROM products", function(err, res) {
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
        connection.end();
    }); //MySQL query
} //fullReport()

function lowReport() {
    console.log("We have 5 or less of the following. Might want to order more.");
    connection.query("SELECT * FROM products WHERE stock_quantity < 6", function(err, res) {
        if(res.affectedRows === 0) {
            console.log("GOOD NEWS EVERYONE! We don't appear to be running low on anything!");
        } else {
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
        }
        connection.end();
    }); //MySQL query
} //lowReport()

function receive() {
    inquire.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter the item id of the item you would like to receive:"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to receive?:"
        }
    ]).then(function(response) {
        //Validate Input
        if(isNaN(parseInt(response.id))){
            connection.end();
            return console.log("You must enter a valid number in the id field.");
        }
        if(isNaN(parseInt(response.quantity))){
            connection.end();
            return console.log("You must enter a valid number in the quantity field.");
        }

        //Obtain current number of that product
        var currQuantity = 0;
        var item = "";
        connection.query("SELECT product_name, stock_quantity FROM products WHERE ? LIMIT 1", [
            {
                item_id: parseInt(response.id)
            }
        ], function(queryErr, queryRes) {
            //console.log(queryRes);
            currQuantity = parseInt(queryRes[0].stock_quantity);
            item = queryRes[0].product_name;
        }); //SELECT query callback
        connection.query("UPDATE products SET ? WHERE ?", [
            {
                stock_quantity: currQuantity + parseInt(response.quantity)
            },
            {
                item_id: parseInt(response.id)
            }
        ], function(updateErr, updateRes) {
            if(updateErr) throw updateErr;
            console.log("Store Updated!");
            console.log("Receiving Report:");
            console.table([{
                "Item Id": response.id,
                "Item Name": item,
                "Received Quantity": response.quantity,
                "New Total": currQuantity + parseInt(response.quantity)
            }]); //Console.table
            fs.appendFile("log.txt",
            "Receiving Report(Restock) | " + moment().format("MM/DD/YYYY-HH:mm:ss") +
            " | " + item +
            " | Quantity Added: +" + response.quantity +
            " | New Total: " + currQuantity + parseInt(response.quantity) + "\n",
            function(writeErr) {
                if(writeErr) throw writeErr;
                console.log("Data logged to transaction history.");
                connection.end();
            }); //fs write
        }); //UPDATE query callback
    }); //inquire then
} //receive()

function receiveNew() {
    inquire.prompt([
        {
            name: "name",
            message: "Enter the name of the new product to add to the store:",
            type: "input"
        },
        {
            name: "department",
            message: "Enter the department the item belongs in:",
            type: "input"
        },
        {
            name: "price",
            message: "Enter price per item: $",
            type: "input"
        },
        {
            name: "quantity",
            message: "How many would you like to put into inventory?:",
            type: "input"
        }
    ]).then(function(response) {
        connection.query("INSERT INTO products SET ?", [
            {
                product_name: response.name,
                department_name: response.department,
                price: parseFloat(response.price),
                stock_quantity: parseInt(response.quantity)
            }
        ], function(queryErr, queryRes) {
            if(queryErr) throw queryErr;
            console.log("New product added!");
            console.log("Receiving Report:");
            console.table([{
                "Product Name": response.name,
                "Product Department": response.department,
                "Price": "$" + parseFloat(response.price),
                "Quantity Added": parseInt(response.quantity)
            }]); //console.table
            fs.appendFile("log.txt",
            "Receiving Report(New Item) | " + moment().format("MM/DD/YYYY-HH:mm:ss") +
            " | " + response.name +
            " | Quantity Received: " + parseInt(response.quantity) + 
            " | Sale Price: $" + parseFloat(response.price) + "\n",
            function(writeErr) {
                if(writeErr) throw writeErr;
                console.log("Report logged to file.");
            });//appendFile callback
        });//query callback
        connection.end();
    });//inquire callback
}//receiveNew()