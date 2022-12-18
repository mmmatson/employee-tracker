//Packages needed for this application
const express = require('express');
const inquirer = require("inquirer");
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'mmm333',
    database: 'employee_db'
  },
  console.log(`Connected to the employee database.`)
);

//Questions to prompt user for input
const trackerQuestions = () => {
    return inquirer.prompt([
        {
            name: "options",
            type: "list",
            message: "Choose an option:",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee's role"],
        },
        //Add department questions
        {
            when: input => { return input.options === "Add a department" },
            name: "deptName",
            type: "input",
            message: "What is the department's name?",
        },
        //Add role questions
        {
            when: input => { return input.options === "Add a role" },
            name: "roleName",
            type: "input",
            message: "What is the role's name?",
        },
        {
            when: input => { return input.options === "Add a role" },
            name: "roleSalary",
            type: "input",
            message: "What is the role's salary?",
        },
        {
            when: input => { return input.options === "Add a role" },
            name: "roleDept",
            type: "list",
            message: "What is the department for the role?",
            choices: [1, 2]//[`SELECT * FROM departments`]
        },
        //Add employee questions
        {
            when: input => { return input.options === "Add an employee" },
            name: "empFirstName",
            type: "input",
            message: "What is the employee's first name?",
        },
        {
            when: input => { return input.options === "Add an employee" },
            name: "empLastName",
            type: "input",
            message: "What is the employee's last name?",
        },
        {
            when: input => { return input.options === "Add an employee" },
            name: "empRole",
            type: "list",
            message: "What is the employee's role?",
            choices: [1, 2]//[`SELECT * FROM roles`]
        },
        {
            when: input => { return input.options === "Add an employee" },
            name: "empManager",
            type: "input",
            message: "Who is the employee's manager?",
        },
        //Update employee's role question
        {
            when: input => { return input.options === "Update an employee's role" },
            name: "empSelect",
            type: "list",
            message: "Choose an option:",
            choices: [1, 2]//[`SELECT * FROM employees`]
        },
        {
            when: input => { return input.options === "Update an employee's role" },
            name: "empRole",
            type: "input",
            message: "What is the employee's role?",
        }
    ])
        .then(answers => {
            console.log(answers);
            return answers;
        });
};

//Define function to initialize app
function init() {
    trackerQuestions()
}

// Call function to initialize app
init();

app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });