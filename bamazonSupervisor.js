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
        message: "Hello person of ultimate superiority. What would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department"]
    }
]).then(function(response) {
    switch(response.query) {
        case "View Product Sales by Department":
            viewSales();
        break;
        case "Create New Department":
            newDepartment();
        break;
        default: 
            console.log("Inquirer has failed. Please power off your machine and await the singularity");
        break;
    }
}); //inquire then

function viewSales() {
    var theUltimateQuery = "SELECT " + 
                                "d.department_id, " +
                                "d.department_name, " +
                                "d.over_head_costs, " + 
                                "SUM(p.product_sales) AS 'total_sales' " +
                            "FROM " +
                                "departments AS d " +
                            "LEFT JOIN " +
                                "products AS p " + 
                            "ON " + 
                                "d.department_name = p.department_name " +
                            "GROUP BY " +
                                "d.department_id";
    connection.query(theUltimateQuery, function(queryErr, queryRes) {
        if(queryErr) {
            connection.end();
            return console.log(queryErr);
        }
        //console.log(queryRes);
        var table = [];
        for(let i = 0; i < queryRes.length; i++) {
            let row = {
                "Department ID": queryRes[i].department_id,
                "Department Name": queryRes[i].department_name,
                "Total Sales": "$" + queryRes[i].total_sales,
                "Overhead Costs": "$" + queryRes[i].over_head_costs,
                "Total Profit": "$" + (parseFloat(queryRes[i].total_sales) - parseFloat(queryRes[i].over_head_costs))
            }; 
            table.push(row);
        }
        console.log("Here be your sales report:");
        console.table(table);
        connection.end();
    });//Mega select query
}//viewSales()