# Bootleg Amazon

## Software and File Requirements
* NPM and Nodejs installed
* A MySQL server running in the background
* A Command Line Interface to run the program (such as Mac/Linux Terminal or Windows PowerShell)
* A .env file containing details about your specific database connection (see below)

## Getting Started
1. Clone the repository to your machine and make sure you have all the necessary software up and running.
2. In the cloned repository, create a new ".env" file in the folder. This file will contain details about your bamazon database that the script files can call upon to access and manipulate the database. You may either create your own ".env" file from scratch or copy/move the provided ".envEX" file to ".env".
3. Edit the ".env" file to reflect the MySQL database you plan to work with. The final ".env" file should look like:
```javascript
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_SCHEMA=bamazon
DATABASE_USER=root
DATABASE_PASS=passwerd
```
4. Finally, setup the bamazon database with the appropriate tables using the provided SQL files before running any of the Javascript programs.
5. On the command line, be sure to run "npm install" before running any of the scripts to ensure each script ha access to the necessary dependencies.

## Database Setup
Use the provided init files to create the necessary tables and columns to run the script files. You may also use the seed files to populate the tables with some dummy items.

### Level 1 - Customer
1. Copy the contents of the "init.sql" file into the MySQL editor of your choice and execute the commands to create the database and an empty products table. 
2. Use the INSERT statement to add items to the products table, or execute the contents of "seeds.sql" to populate the products table with some dummy items.
3. You may now run "node bamazoncustomer.js" to view the store and place orders.

### Level 2 - Manager
1. If you followed the steps in Level 1, no additional database setup is required. This program relies purely on the products table.
2. You may now run "node bamazonManager.js" to view and alter the store.

### Level 3 - Supervisor
1. This level requires the products table to exist so it can tack on a "product_sales" column. Copy the contents of the "supervise.sql" file and place it into a MySQL editor of your choice and execute the commands to add the necessary column and create a departments table.
2. Optionally, use the contents of the "supSeeds.sql" file to populate the departments table and change the sales to some positive values.
3. You may now run "node bamazonSupervisor.js" to view total sales by department.

## Syntax
Use node in conjunction with one of the script files to run the program. No additional arguments or options are required on the command line; the program will prompt you for any additional info it needs. Use any of the three commands:
```
$ node bamazoncustomer.js
$ node bamazonManager.js
$ node bamazonSupervisor.js
```
Full program demo: https://youtu.be/6zhKtiLMpHU
