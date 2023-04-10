const table = require('console.table');
// Function to view all departments
const viewDepartments = (db, startPrompt) => {
    db.query(`SELECT id AS 'Department Id',
            name AS 'Department Name'
            FROM departments`,
        (err, results) => {
            console.table(results);
            startPrompt();
        })
};
// Function to view all roles
const viewRoles = (db, startPrompt) => {
    db.query(`SELECT roles.id AS 'Role Id', 
    roles.title AS 'Job Title', 
    roles.salary AS 'Salary', 
    departments.name AS 'Department Name' 
    FROM roles 
    JOIN departments ON roles.department_id = departments.id`,
        (err, results) => {
            console.table(results);
            startPrompt();
        })
};
// Function to view all employees
const viewEmployees = (db, startPrompt) => {
    db.query(`SELECT employee.id AS 'Employee Id', 
            employee.first_name AS 'First Name', 
            employee.last_name AS 'Last Name', 
            roles.title AS 'Job Title', 
            roles.salary AS 'Salary', 
            CONCAT(m.first_name, ' ', m.last_name) AS 'Manager' 
              FROM employee
              JOIN roles ON employee.role_id = roles.id
              LEFT JOIN employee m ON employee.manager_id = m.id;`,
        (err, results) => {
            if (err) {
                console.error(err);
            } else {
                console.table(results);
            }
            startPrompt();
        });
};

const viewEmployeesByDepartment = (db, startPrompt) => {
    db.query(`SELECT e.id AS 'Employee Id',
                     e.first_name AS 'First Name',
                     e.last_name AS 'Last Name',
                     d.name AS 'Department',
                     r.title AS 'Job Title',
                     r.salary AS 'Salary',
                     CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
              FROM employee e
              JOIN roles r ON e.role_id = r.id
              JOIN departments d ON r.department_id = d.id
              LEFT JOIN employee m ON e.manager_id = m.id
              ORDER BY Department;`,
        (err, results) => {
            if (err) {
                console.error(err);
            } else {
                console.table(results);
            }
            startPrompt();
        });
};


const viewEmployeesByManager = (db, startPrompt) => {
    db.query(`SELECT employee.id AS 'Employee Id', 
            employee.first_name AS 'First Name', 
            employee.last_name AS 'Last Name', 
            roles.title AS 'Job Title', 
            roles.salary AS 'Salary', 
            CONCAT(m.first_name, ' ', m.last_name) AS 'Manager' 
              FROM employee
              JOIN roles ON employee.role_id = roles.id
              LEFT JOIN employee m ON employee.manager_id = m.id
              ORDER BY Manager;`,
        (err, results) => {
            if (err) {
                console.error(err);
            } else {
                console.table(results);
            }
            startPrompt();
        });
};

const viewDepartmentBudget = (db, startPrompt) => {
    db.query(`SELECT departments.name AS 'Department', SUM(roles.salary) AS 'Total Budget' 
              FROM employee
              JOIN roles ON employee.role_id = roles.id
              JOIN departments ON roles.department_id = departments.id
              GROUP BY departments.id`,
        (err, results) => {
            if (err) {
                console.error(err);
                startPrompt();
                return;
            }

            // Display the department budgets in a table
            console.table('Department Budgets:', results);

            startPrompt();
        });
};

module.exports = { viewDepartments, viewEmployees, viewRoles, viewEmployeesByDepartment, viewEmployeesByManager, viewDepartmentBudget };