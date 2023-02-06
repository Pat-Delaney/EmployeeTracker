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
  console.log(`<br><br><br><br><br> Connected to the employees_db database.`)
);

let start = false;

const {headerTemp,employeeQues,roleQues,deptQues,updateQues} = require('./src/template.js');
const [emp_firstQ,emp_lastQ,emp_roleQ,emp_managerQ] = employeeQues;
const [role_nameQ,role_payQ,role_deptQ] = roleQues;
const [dept_nameQ] = deptQues;

function deptNames(){
  db.query('SELECT dept_name FROM department', function (err, results) {
    console.log(results);
})
init();
};
function deptReturn(){
//returns departments
db.query('SELECT dept_id AS DepartmentID, dept_name AS DepartmentName FROM department', function (err, results) {
  console.log(results);
})

init();
};

function roleReturn(){
//returns roles
db.query('Select role_name AS JobTitle, role_id AS JobID, role_pay AS JobSalary, dept_name AS JobDepartment FROM roles JOIN department WHERE role_id = dept_id', function (err, results) {
  console.log(results);
})
init();
};

function empReturn(){
//returns employees
db.query('Select emp_id AS EmployeeID,emp_first_name AS FirstName, emp_last_name AS LastName, role_name AS Job, dept_name AS Department, role_pay AS Salary, emp_manager AS Manager FROM employee JOIN roles,department WHERE emp_role = role_id && role_dept = dept_id', function (err, results) {
  console.log(results);
})
init();
};

function addDept(){
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
    !err ? console.log(`Success! ${response.dept_name} added!`): console.log(err);
})

init();
})};
function addRole(){
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
          type:'list',
          message: role_deptQ,
          choices:[deptNames()],
          name:'role_dept'
      }
])
.then((response)=>{
  db.query(`INSERT INTO roles (role_name,role_pay,role_dept) VALUES ('${response.role_name}','${response.role_pay}',1)`, function (err, results) {
    !err ? console.log(`Success! ${response.role_name} added!`): console.log(err);
  })

  init();
  })};
function addEmp(){
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
  db.query(`INSERT INTO employee(emp_first_name,emp_last_name,emp_manager) VALUES ('${response.emp_first}', '${response.emp_last}', '${response.emp_role}','${response.emp_manager}')`, function (err, results) {
    !err ? console.log(`Success! ${response.emp_first} ${response.emp_last} added!`): console.log(err);
  })

  init();
  })};

function addEmp(){
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
  db.query(`INSERT INTO employee(emp_first_name,emp_last_name,emp_manager) VALUES ('${response.emp_first}', '${response.emp_last}', '${response.emp_role}','${response.emp_manager}')`, function (err, results) {
    !err ? console.log(`Success! ${response.emp_first} ${response.emp_last} added!`): console.log(err);
  })

  init();
  })};
function updateEmp(){
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
    db.query(`INSERT INTO employee(emp_first_name,emp_last_name,emp_manager) VALUES ('${response.emp_first}', '${response.emp_last}', '${response.emp_role}','${response.emp_manager}')`, function (err, results) {
      !err ? console.log(`Success! ${response.emp_first} ${response.emp_last} added!`): console.log(err);
    })
  
    init();
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