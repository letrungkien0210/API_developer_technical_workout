const apis = require('./config/apis');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const Employee = require('../models/employee');

const should = chai.should();
const assert = chai.assert;

let employee = new Employee(123, "1953-09-02", "Kien", "Le", "M", "1986-06-26");

chai.use(chaiHTTP);

describe('Test APIs', () => {
    after(done => {
        let url = `${apis.deleteEmployee}/${employee.emp_no}`;

        chai.request(server)
            .get(url)
            .end((req, res) => {
                res.should.have.status(200);
                assert.equal(res.body.message, "The employee was deleted");
                done();
            });
    });

    describe('Employees', () => {
        it('Get the employees list', (done) => {
            let url = `${apis.getEmployees}/0/10`;

            chai.request(server)
                .get(url)
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.message, "Get the employees list");
                    assert.equal(res.body.employees.length, 10);
                    done();
                });
        })
        it('Create a employee', (done) => {
            let url = `${apis.createEmployee}`;

            chai.request(server)
                .post(url)
                .send(employee)
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.message, "The employee was inserted");
                    done();
                });
        })
    });
});