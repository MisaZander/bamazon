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

