const db = require('../connection.js');

const initialQuestions = [
  {
      name: 'choices',
      type: 'list',
      message: `___________              .__                              
      \_   _____/ _____ ______ |  |   ____ ___.__. ____   ____  
       |    __)_ /     \\____ \|  |  /  _ <   |  |/ __ \_/ __ \ 
       |        \  Y Y  \  |_> >  |_(  <_> )___  \  ___/\  ___/ 
      /_______  /__|_|  /   __/|____/\____// ____|\___  >\___  >
              \/      \/|__|               \/         \/     \/ 
      ___________                     __   .__                  
      \__    ___/___________    ____ |  | _|__| ____    ____    
        |    |  \_  __ \__  \ _/ ___\|  |/ /  |/    \  / ___\   
        |    |   |  | \// __ \\  \___|    <|  |   |  \/ /_/  >  
        |____|   |__|  (____  /\___  >__|_ \__|___|  /\___  /   
                            \/     \/     \/       \//_____/    
        _________               __                              
       /   _____/__.__. _______/  |_  ____   _____              
       \_____  <   |  |/  ___/\   __\/ __ \ /     \             
       /        \___  |\___ \  |  | \  ___/|  Y Y  \            
      /_______  / ____/____  > |__|  \___  >__|_|  /            
              \/\/         \/            \/      \/             
      
      Please make a selection:`,
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
      default: 'View all departments'
  }
];

const employeeAdd = [
  {
      name: 'firstName',
      type: 'input',
      message: `What is the employee's first name?`
  },
  {
      name: 'lastName',
      type: 'input',
      message: `What is the employee's last name?`
  },
  {
      name: 'role',
      type: 'list',
      message: `What is the employee's role?`,
      // connect roles from the db 
      choices: async ()=> {
          try{
              const results = await db.promise().query('SELECT title as name, id as value FROM roles');
          return results[0];
          } catch (err) {
              console.log(err);
          }
      }
  },
  {
      name: 'manager',
      type: 'list',
      message: `Who is the employee's manager?`,
      // connect employees with manager id from the db 
      choices: async ()=> {
          try{
              const results = await db.promise().query('SELECT CONCAT(first_name, " ", last_name) as name, id as value FROM employees');
          return results[0];
          } catch (err) {
              console.log(err);
          }
      }
  },
];

const roleAdd = [
  {
      name: 'roleName',
      type: 'input',
      message: `What is the name of the role?`
  },
  {
      name: 'salary',
      type: 'input',
      message: `What is the salary of the role?`
  },
  {
      name: 'department',
      type: 'list',
      message: `Which department does the role belong to?`,
      // connect departments from the db 
      choices: async ()=> {
          try{
              const results = await db.promise().query('SELECT department_name as name, id as value FROM departments');
          return results[0];
          } catch (err) {
              console.log(err);
          }
      }
  }
];

const departmentAdd = [
  {
      name: 'dptName',
      type: 'input',
      message: `What is the name of the department?`
  }
];

const employeeUpdate = [
  {
      name: 'employee',
      type: 'list',
      message: `Which employee's role would you like to update?`,
      choices: async ()=> {
          try{
              const results = await db.promise().query('SELECT CONCAT(first_name, " ", last_name) as name, id as value FROM employees');
          return results[0];
          } catch (err) {
              console.log(err);
          }
      }
  },
  {
      name: 'role',
      type: 'list',
      message: `What is the employee's new role?`,
      choices: async ()=> {
          try{
              const results = await db.promise().query('SELECT title as name, id as value FROM roles');
          return results[0];
          } catch (err) {
              console.log(err);
          }
      }
  }
];

module.exports = {initialQuestions, employeeAdd, roleAdd, departmentAdd, employeeUpdate};