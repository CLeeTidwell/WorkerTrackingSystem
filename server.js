const mysql = require("mysql2");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Kirin@1988",
    database: "wts_db"
});

const { initialQuestions, employeeAdd, roleAdd, departmentAdd, employeeUpdate } = require('./utils/questions');


db.connect((err) => {
  if(err) throw err;
  console.log('connected to db');
  beginPrompts();
}
);

const beginPrompts = () => {
  inquirer.prompt(initialQuestions)
      .then((data) => {
          if(data.choices === 'View all departments') {
              viewDepartments();
          } else if (data.choices === 'View all roles') {
              viewRoles();
          } else if (data.choices === 'View all employees') {
              viewEmployees();
          } else if (data.choices === 'Add a department') {
              addDepartment();
          } else if (data.choices === 'Add a role') {
              addRole();
          } else if (data.choices === 'Add an employee') {
              addEmployee();
          } else if (data.choices === 'Update an employee role') {
              updateEmployee();
          } else {
              db.end();
          }
      })
};

// VIEW ALL functions
const viewDepartments = () => {
  db.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;
    console.table(res);
    beginPrompts();
  })
};
const viewRoles = () => {
  db.query('SELECT * FROM roles', (err, res) => {
    if (err) throw err;
    console.table(res);
    beginPrompts();
  })
};
const viewEmployees = () => {
  db.query('SELECT * FROM employees', (err, res) => {
    if (err) throw err;
    console.table(res);
    beginPrompts();
  })
};

// ADD functions
const addDepartment = () => {
  inquirer.prompt(departmentAdd)
  .then((data) => {
    db.query('INSERT INTO departments (department_name) VALUES (?)', data.dptName, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(`Added ${data.dptName} to the departments table.`);
      beginPrompts();
    })
  });
};

const addRole = () => {
  inquirer.prompt(roleAdd)
  .then((data) => {
    db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [data.roleName, data.salary, data.department], (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(`Added ${data.roleName} to the roles table.`);
      beginPrompts();
    })
  });
};

const addEmployee = () => {
  inquirer.prompt(employeeAdd)
  .then((data) => {
    db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [data.firstName, data.lastName, data.role, data.manager], (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(`Added ${data.firstName} ${data.lastName} to the employees table.`);
      beginPrompts();
    })
  });
};

// UPDATE Employee Role
const updateEmployee = () => {
  inquirer.prompt(employeeUpdate)
  .then((data) => {
    db.query('UPDATE employees SET role_id = ? WHERE id = ?', [data.role, data.employee], (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(`Added ${data.roleName} to the roles table.`);
      beginPrompts();
    })
  });
};