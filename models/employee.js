const mysql = require('mysql');
const config = require('../config');

function convertRowDataPacketToEmployee(input) {
    let employee = new Employee();
    employee.empNo = input.emp_no;
    employee.birthDate = input.birth_date;
    employee.firstName = input.first_name;
    employee.lastName = input.last_name;
    employee.gender = input.gender;
    employee.hireDate = input.hire_date;
    return employee;
};

class Employee {
    constructor(empNo, birthDate, firstName, lastName, gender, hireDate) {
        this.emp_no = empNo;
        this.birth_date = birthDate;
        this.first_name = firstName;
        this.last_name = lastName;
        this.gender = gender;
        this.hire_date = hireDate;
    }

    createEmployee() {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection(config.MariaDB);
            let query = connection.query('INSERT INTO EMPLOYEES SET ?', this, function(error, results, fields) {
                connection.end();
                if (error) {
                    reject({ message: error.message });
                }
                resolve({
                    message: `The employee was inserted`
                });
            });
        });
    }

    static getEmployees(index, rowsPage) {
        return new Promise((reslove, reject) => {
            const connection = mysql.createConnection(config.MariaDB);
            connection.query('SELECT * FROM EMPLOYEES LIMIT ?, ?', [parseInt(index), parseInt(rowsPage)], function(error, results, fields) {

                connection.end();
                if (error) {
                    reject({ message: error.message });
                }

                let employees = [];
                for (let i = 0; i < results.length; i++) {
                    let employee = convertRowDataPacketToEmployee(results[i]);
                    employees.push(employee);
                }

                reslove(employees);
            });
        });
    }

    static deleteEmployee(emp_no) {
        return new Promise((reslove, reject) => {
            const connection = mysql.createConnection(config.MariaDB);
            connection.query('DELETE FROM EMPLOYEES WHERE emp_no=?', [emp_no], function(error, results, fields) {
                connection.end();
                if (error) {
                    reject({ message: error.message });
                }
                console.log(connection.query);
                reslove({
                    message: `The employee was deleted`
                });
            });
        });
    }
}

module.exports = Employee;