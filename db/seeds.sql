INSERT INTO department (id, name)
VALUES (1, 'Customer Service'),
       (2, 'Development'),
       (3, 'Marketing'),
       (4, 'Accounting'),
       (5, 'Human Resources');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Representative', 55000.00, 1),
       (2, 'Junior Developer', 75000.00, 2),
       (3, 'Senior Developer', 90000.00, 2),
       (4, 'Accountant', 80000.00, 4),
       (5, 'Strategist', 120000.00, 3),
       (6, 'Administrator', 60000.00, 5),
       (7, 'Supervisor', 100000.00, 4),
       (8, 'Project Manager', 180000.00, 2),
       (9, 'CEO', 350000.00, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Charlie', 'Buckets', 1, NULL),
       (2, 'Melanie', 'Flowers', 2, NULL),
       (3, 'Blaine', 'Overwood', 6, NULL),
       (4, 'Exeter', 'Flexitor', 5, NULL),
       (5, 'Fiora', 'Truffles', 3, NULL),
       (6, 'Bokeem', 'Woodbine', 7, NULL),
       (7, 'Tee', 'X', 1, NULL),
       (8, 'Fan', 'Bing-Bing', 4, NULL),
       (9, 'Harry', 'Zhou', 8, NULL),
       (10, 'Andy', 'Rooh', 9, NULL);
       

