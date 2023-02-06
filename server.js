//importing express and mysql
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

//defining the port and initializing express
const PORT = process.env.PORT || 3001;
const app = express();

//middleware defining express functions
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//connecting to mysql
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);


const {headerTemp,employeeQues,roleQues,deptQues} = require('./src/template.js');
const [emp_firstQ,emp_lastQ,emp_roleQ,emp_managerQ] = employeeQues;
const [role_nameQ,role_payQ,role_deptQ] = roleQues;
const [dept_nameQ] = deptQues;

function deptNames(){
  db.query('SELECT dept_name FROM department', function (err, results) {
    console.log(results);
})}
function deptReturn(){
//returns departments
db.query('SELECT dept_id AS DepartmentID, dept_name AS DepartmentName FROM department', function (err, results) {
  console.log(results);
})};

function roleReturn(){
//returns roles
db.query('Select role_name AS JobTitle, role_id AS JobID, role_pay AS JobSalary, dept_name AS JobDepartment FROM roles JOIN department WHERE role_id = dept_id', function (err, results) {
  console.log(results);
})};

function empReturn(){
//returns employees
db.query('Select emp_id AS EmployeeID,emp_first_name AS FirstName, emp_last_name AS LastName, role_name AS Job, dept_name AS Department, role_pay AS Salary, emp_manager AS Manager FROM employee JOIN roles,department WHERE emp_role = role_id && role_dept = dept_id', function (err, results) {
  console.log(results);
})};

deptNames();
// deptReturn();
// roleReturn();
// empReturn();
function init(){
  inquirer
.prompt([
    {
        type:'list',
        message:'What would you like to do?',
        choices:['View Departments','View Roles','View Employees','Add Department','Add Role','Add Employee','Update Employee'],
        name:'home'
    },
    {
        type:'input',
        message: dept_nameQ,
        name:'dept_name',
        when: (answers) => answers.home === 'Add Department'
    },
    {
        type:'input',
        message: role_nameQ,
        name:'role_name',
        when: (answers) => answers.home === 'Add Role'
    },
    {
        type:'input',
        message: role_payQ,
        name:'role_pay',
        when: (answers) => answers.home === 'Add Role'
    },
    {
        type:'list',
        message: role_deptQ,
        choices:[deptReturn],
        name:'role_dept',
        when: (answers) => answers.recur === 'Yes'
    }
])
.then((response)=>{
    
});
};

init();

//catch error 404
app.use((req, res) => {
  res.status(404).end();
});

//listen to port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});