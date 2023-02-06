DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  dept_id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
  role_id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(30) NOT NULL,
  role_pay INT NOT NULL,
  role_dept INT,
  FOREIGN KEY (role_dept)
  REFERENCES department(dept_id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  emp_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  emp_first_name VARCHAR(30) NOT NULL,
  emp_last_name VARCHAR(30) NOT NULL,
  emp_role INT,
  emp_manager VARCHAR(30),
  FOREIGN KEY (emp_role)
  REFERENCES roles(role_id)
  ON DELETE SET NULL
);