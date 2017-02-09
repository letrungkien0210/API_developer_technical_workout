const Employee = require('../models/employee');

module.exports = (app, express) => {
    let apiRouter = express.Router();

    apiRouter.post('/create_employee', (req, res) => {

        if (req.body.emp_no === undefined) {
            return res.json({ message: 'Employee number is undefined' });
        }
        if (req.body.birth_date === undefined) {
            return res.json({ message: 'Birth date is undefined' });
        }
        if (req.body.first_name === undefined) {
            return res.json({ message: 'First name is undefined' });
        }
        if (req.body.last_name === undefined) {
            return res.json({ message: 'Last name is undefined' });
        }
        if (req.body.gender === undefined) {
            return res.json({ message: 'Gender is undefined' });
        }
        if (req.body.hire_date === undefined) {
            return res.json({ message: 'Hire date is undefined' });
        }

        let employee = new Employee(req.body.emp_no, req.body.birth_date, req.body.first_name, req.body.last_name, req.body.gender, req.body.hire_date);

        employee.createEmployee().then((resolve) => {
            return res.json(resolve);
        }, error => {
            return res.json({ error: error });
        });

    });

    apiRouter.get('/employees/:index/:rows_page', (req, res) => {

        Employee.getEmployees(req.params.index, req.params.rows_page).then(
            resolve => {
                return res.json({ message: 'Get the employees list', employees: resolve });
            }, error => {
                return res.json({ message: error });
            }
        );
    });

    apiRouter.get('/employee/delete/:emp_no', (req, res) => {
        Employee.deleteEmployee(req.params.emp_no).then(resolve => {
            return res.json(resolve);
        }, error => {
            return res.json({ message: error });
        });
    })

    return apiRouter;
};