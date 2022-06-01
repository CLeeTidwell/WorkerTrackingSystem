// required modules
const inquirer = require('inquirer');
const mysql = require('mysql2');
const conT = require('console.table');
const dBase = require('./connection');

// List of Selection
let staff = {
    viewStaff: 'View Staff',
    addStaff: 'Add Staff',
    viewRole: 'View Roles',
    addRole: 'Add Role',
    updateRole: 'Update Staff Role',
    viewDept: 'View Departments',
    addDept: 'Add Department',
    quit: 'Quit'
}

initialize();

async function initialize() {
    const uInput = await inquirer.prompt([
        {
            name: 'staff',
            type: 'list',
            message: 'Please make a selection',
            choices: [
                staff.viewStaff,
                staff.addStaff,
                staff.viewRole,
                staff.addRole,
                staff.updateRole,
                staff.viewDept,
                staff.addDept,
                staff.quit
            ]}])
        
        // Switch Case For User Input
        .then((uInput) => {

        switch (uInput.staff) {
            case staff.viewStaff:
                viewStaff();
                break;
            case staff.addStaff:
                addStaff();
                break;
            case staff.viewRole:
                viewRole();
                break;
            case staff.addRole:
                addRole();
                break;
            case staff.updateRole:
                updateRole();
                break;  
            case staff.viewDept:
                viewDept();
                break;
            case staff.addDept:
                addDept();
                break;
            case staff.quit:
                dBase.end();
                break;
        }})};

// View Selection
function viewDept(deptRes) {
    dBase.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log('\nDepartments\n');
        console.table(res);

        initialize();
    });
}

function viewStaff(uInput) {
    
    const qFill = `SELECT employee.id, employee.first_name AS "first name", employee.last_name AS "last name", role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    INNER JOIN role ON role.id=employee.role_id
    INNER JOIN department ON (department.id = role.department_id);`;

    dBase.query(qFill, (err, res) => {
        if (err) throw err;
        console.log('\nEmployees\n');
        console.table(res);

        initialize();
    });
}

function viewRole(uInput) {

    dBase.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.log('\nRoles\n');
        console.table(res);

        initialize();
    });
}

// Create Selection
function addDept(deptRes) {

    dBase.query(`SELECT * FROM department`, async (err, res) => {
        const depts= await res.map(({ id, name }) => ({
            value: id,
            name: name
        }));
    
    const deptRes = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Department Name?'
        },
    ])

    .then((deptRes) => {
        depts.name = deptRes.name;

        dBase.query(`INSERT INTO department (id, name) VALUES (NULL, '${depts.name}');`, (err, res) => {
            if (err) throw err;
            console.log('\nDepartment', depts.name, 'Added\n');
            viewDept();
        })})});
}

function addRole() {

    dBase.query(`SELECT * FROM department`, async (err, res) => {
        const deptsA= await res.map(({ id, name }) => ({
            value: id,
            name: name
        }));
    
    const roleRes = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Role Title?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Role Salary?'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Department?',
            choices: deptsA
        },
    ])

    .then((roleRes) => {
        
        const sRole ={
            title: roleRes.title,
            salary: roleRes.salary,
            department_id: roleRes.department_id,
        }

        dBase.query(`INSERT INTO role (id, title, salary, department_id) VALUES (NULL, '${sRole.title}', ${sRole.salary}, ${sRole.department_id});`, (err, res) => {
            if (err) throw err;
            console.log('\nRole', sRole.title, 'Added\n');
            viewRole();
        })})});
}

function addStaff() {
    dBase.query(`SELECT * FROM role`, async (err, res) => {
        const roleS = await res.map(({ id, title }) => ({
            value: id,
            name: title
        }));

    dBase.query(`SELECT * FROM employee`, async (err, res) => {
        const empS = await res.map(({ id, first_name, last_name }) => ({
            value: id,
            name: `${first_name} ${last_name}`
        }));

    const staffRes = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'First Name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Last Name?'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Role?',
            choices: roleS
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Manager?',
            choices: empS
        },
    ])

    .then((staffRes) => {
        let manID;
        let manName;
        if (staffRes.manager_id === 'null') {
            manID = null;
            manName = null;
        } else {
            manID = staffRes.manager_id;
            manName = staffRes.manager_id;
        }

        const sStaff = {
            id: staffRes.id,
            first_name: staffRes.first_name,
            last_name: staffRes.last_name,
            role_id: staffRes.role_id,
            manager_id: manID

        }

        dBase.query(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (NULL, '${sStaff.first_name}', '${sStaff.last_name}', ${sStaff.role_id}, ${manID});`, (err, res) => {
            if (err) throw err;
            console.log('\nEmployee', sStaff.first_name, sStaff.last_name, 'Added\n');
            viewStaff();
        })})})});
}

// Update Selection
function upStaffRole() {
    dBase.query('SELECT * FROM role', async (err, res) => {
        const roleU = await res.map(({ id, title }) => ({
            value: id,  
            name: title
            }));
            
    dBase.query('SELECT * FROM employee', async (err, res) => {
        const empU = await res.map(res => {
            return {
            name: `${res.first_name} ${res.last_name}`,
            value: res.id
            }});
        
        const staffRes = await inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Employee?',
                choices: empU
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Role?',
                choices: roleU
            }
        ])

        .then((staffRes) => {
            const sStaff = {
                id: staffRes.id,
                role_id: staffRes.role_id
            }

            dBase.query(`UPDATE employee SET role_id = ${sStaff.role_id} WHERE id = ${sStaff.id};`, (err, res) => {
                if (err) throw err;
                console.log('\nEmployee Role Updated\n');
                viewStaff();
            })})})});
}