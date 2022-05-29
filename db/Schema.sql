DROP DATABASE IF EXISTS wts_db;
CREATE DATABASE wts_db;

USE wts_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE SET NULL,
  role_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL
);