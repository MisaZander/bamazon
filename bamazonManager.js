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