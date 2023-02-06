INSERT INTO employee(emp_first_name,emp_last_name,emp_manager)
VALUES ('Jim', 'Smith', 'null'),
       ('Fred', 'Johnson',  'Jim Smith'),
       ('Jack', 'Greens',  'Norbit Lanson'),
       ('Norbit', 'Lanson', 'null');

INSERT INTO department (dept_name)
VALUES ('Customer Service'),
       ('Production'),
       ('Management');

INSERT INTO roles (role_name,role_pay,role_dept)
VALUES ('Customer Service Rep','10000000',1),
       ('Worker','10000000',2),
       ('Manager','1000000000',3);

