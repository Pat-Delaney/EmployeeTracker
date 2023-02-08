//importing express and mysql
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

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
    user: process.env.DB_USER,
    password:  process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the employees_db database.`)
);

let start = false;

const {headerTemp,employeeQues,roleQues,deptQues,updateQues} = require('./src/template.js');
const [emp_firstQ,emp_lastQ,emp_roleQ,emp_managerQ] = employeeQues;
const [role_nameQ,role_payQ,role_deptQ] = roleQues;
const [dept_nameQ] = deptQues;
const [updt_nameQ,updt_titleQ] = updateQues;

async function handleReturn(data){
  await data;
  console.log(data);
  init();
}

async function deptNames(){
  db.query('SELECT dept_name FROM department', function (err, results) {
    return(results);
  })};
async function deptReturn(){
//returns departments
db.query('SELECT dept_id AS DepartmentID, dept_name AS DepartmentName FROM department', function (err, results) {
  handleReturn(results);
})};

async function roleReturn(){
//returns roles
db.query('Select role_name AS JobTitle, role_id AS JobID, role_pay AS JobSalary, dept_name AS JobDepartment FROM roles JOIN department WHERE role_id = dept_id', function (err, results) {
  handleReturn(results);
})};

async function empReturn(){
//returns employees
db.query('Select emp_id AS EmployeeID,emp_first_name AS FirstName, emp_last_name AS LastName, role_name AS Job, dept_name AS Department, role_pay AS Salary, emp_manager AS Manager FROM employee JOIN roles,department WHERE emp_role = role_id && role_dept = dept_id', function (err, results) {
  handleReturn(results);
})};

async function addDept(){
  inquirer
  .prompt([
    {
      type:'input',
      message: dept_nameQ,
      name:'dept_name'
  }
])
.then((response)=>{
  db.query(`INSERT INTO department(dept_name) VALUES ('${response.dept_name}')`, function (err, results) {
    !err ? handleReturn(`Success! ${response.dept_name} added!`): handleReturn(err);
})
})};
async function addRole(){
let dept_choices = await deptNames()
console.log(dept_choices);
  inquirer
  .prompt([
      {
          type:'input',
          message: role_nameQ,
          name:'role_name'
      },
      {
          type:'input',
          message: role_payQ,
          name:'role_pay'
      },
      {
          type:'input',
          message: role_deptQ,
          name:'role_dept'
      }
])
.then((response)=>{
   db.query(`INSERT INTO roles (role_name,role_pay,role_dept) VALUES ('${response.role_name}','${response.role_pay}',${response.role_dept})`, function (err, results) {
    !err ? handleReturn(`Success! ${response.role_name} added!`): handleReturn(err);
    })
})};
async function addEmp() {
  inquirer
  .prompt([
    {
      type:'input',
      message: emp_firstQ,
      name:'emp_first',
   },
   {
    type:'input',
    message: emp_lastQ,
    name:'emp_last',
  }, 
  {
    type:'input',
    message: emp_roleQ,
    name:'emp_role',
  },
  {
  type:'input',
  message: emp_managerQ,
  name:'emp_manager',
  }
])
.then((response)=>{
  db.query(`INSERT INTO employee(emp_first_name,emp_last_name,emp_role,emp_manager) VALUES ('${response.emp_first}', '${response.emp_last}', '${response.emp_role}','${response.emp_manager}')`, function (err, results) {
    !err ? handleReturn(`Success! ${response.emp_first} ${response.emp_last} added!`): handleReturn(err);
  })
  })

};
async function updateEmp(){
  inquirer
  .prompt([
    {
      type:'input',
      message: emp_firstQ,
      name:'emp_first',
   },
   {
    type:'input',
    message: emp_lastQ,
    name:'emp_last',
  }, 
    {
      type:'input',
      message: updt_titleQ,
      name:'updt_title',
    }
  ])
  .then((response)=>{
    let firstLast = response.updt_name.Split(' ');
    let emp_first_name = firstLast[0];
    let emp_last_name = firstLast[1];
    db.query(`UPDATE employee SET employee_role = '${response.updt_title}' where emp_first_name = '${emp_first}',emp_last_name = '${emp_last}')`, function (err, results) {
      !err ? handleReturn(`Success! ${response.emp_first} ${response.emp_last} updated!`): handleReturn(err);
    })
    
    
    })};
// deptNames();
// deptReturn();
// roleReturn();
// empReturn();
function init(){
  !start ? console.log(headerTemp):'';
  start = true;
  inquirer
.prompt([
    {
        type:'list',
        message:'What would you like to do?',
        choices:['View Departments','View Roles','View Employees','Add Department','Add Role','Add Employee','Update Employee'],
        name:'home'
    }
    
])
.then((response)=>{
    switch (response.home) {
      case 'View Departments':
        deptReturn();
        break;
      case 'View Roles':
        roleReturn();
        break;
      case 'View Employees':
        empReturn();
        break;
      case 'Add Department':
        addDept();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'Add Employee':
        addEmp();
        break;
      case 'Update Employee':
        updateEmp();
        break;
      default:
        break;
    }
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