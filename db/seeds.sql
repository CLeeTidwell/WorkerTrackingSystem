USE wts_db;

INSERT INTO departments (department_name)
VALUES ('IT'), ('Business Development'), ('Human Resources'), ('Legal'), ('Research and Development');

INSERT INTO roles (title, salary, department_id)
VALUES ('Software Engineer', 90000, 1), ('Lead Software Engineer', 140000, 1), ('Sales Representative', 80000, 2), ('Lead Marketer', 80000, 2), ('Recruiter', 60000, 3), ('Benefits Manager', 70000, 3), ('Paralegal', 50000, 4), ('Lawyer', 100000, 4), ('Clinical Researcher', 115000, 5), ('Lab Tech', 50000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, NULL), ('Paul', 'Jones', 3, NULL), ('Mary', 'Brown', 4, NULL), ('Jack', 'Green', 5, NULL), ('Anna', 'Miller', 6, NULL), ('Pedro', 'Vasquez', 7, NULL), ('Areli', 'Garcia', 8, NULL), ('Allen', 'Moore', 9, NULL), ('Sigrid', 'Karlsen', 10, NULL);
