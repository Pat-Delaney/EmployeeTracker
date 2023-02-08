INSERT INTO employee(emp_first_name,emp_last_name,emp_role,emp_manager)
VALUES ('Jim', 'Smith',3, 'null'),
       ('Fred', 'Johnson',2,  'Jim Smith'),
       ('Jack', 'Greens',1,  'Norbit Lanson'),
       ('Norbit', 'Lanson',3, 'null');

INSERT INTO department (dept_name)
VALUES ('Customer Service'),
       ('Production'),
       ('Management');

INSERT INTO roles (role_name,role_pay,role_dept)
VALUES ('Customer Service Rep','10000000',1),
       ('Worker','10000000',2),
       ('Manager','1000000000',3);
