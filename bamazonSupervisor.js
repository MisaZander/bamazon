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
                                "d.department_id AS 'Department ID', " +
                                "d.department_name AS 'Department Name', " +
                                "d.over_head_costs AS 'Overhead Costs', " + 
                                "SUM(p.product_sales) AS 'Total Sales' " +
                            "FROM " +
                                "departments AS d " +
                            "LEFT JOIN " +
                                "products AS p " + 
                            "ON " + 
                                "d.department_name = p.department_name " +
                            "GROUP BY " +
                                "d.department_id";
    connection.query(theUltimateQuery, function(queryErr, queryRes) {
        if(queryErr) throw queryErr;
        console.log(queryRes);
        connection.end();
    });//Mega select query
}//viewSales()