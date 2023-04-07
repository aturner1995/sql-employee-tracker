const table = require('console.table');
// Function to view all departments
const viewDepartments = (db,startPrompt) => {
    db.query(`SELECT * FROM departments`, (err,results) => {
        console.table(results);
        startPrompt();
    })
};
// Function to view all roles
const viewRoles = (db,startPrompt) => {
    db.query(`SELECT * FROM roles`, (err,results) => {
        console.table(results);
        startPrompt();
    })
};
// Function to view all employees
const viewEmployees = (db,startPrompt) => {
    db.query(`SELECT * FROM employee`, (err,results) => {
        console.table(results);
        startPrompt();
    })
};

module.exports = {viewDepartments, viewEmployees, viewRoles};