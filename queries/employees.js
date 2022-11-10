const { db } = require("../models");

const getEmployees = (request, response) => {
    db.query('SELECT * FROM employees ORDER BY employee_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
 
const getEmployeeById = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('SELECT * FROM employees WHERE employee_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createEmployee = (request, response) => {
    const {
        employee_id,
        first_name,
        last_name,
        email,
        phone_number,
        hire_date,
        job_id,
        salary, 
        manager_id,
        department_id
    } = request.body
    db.query('INSERT INTO employees (employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary, manager_id,department_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary, manager_id,department_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Employee added with ID: ${employee_id}`)
    })
}

const updateEmployee = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        first_name,
        last_name,
        email,
        phone_number,
        hire_date,
        job_id,
        salary, 
        manager_id,
        department_id
    } = request.body
    db.query(
        'UPDATE employees SET  first_name=$1,last_name=$2,email=$3,phone_number=$4,hire_date=$5,job_id=%6,salary=%7, manager_id=$8,department_id=$9 WHERE employee_id = $10',
        [first_name,
            last_name,
            email,
            phone_number,
            hire_date,
            job_id,
            salary, 
            manager_id,
            department_id,id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Employee modified with ID: ${id}`)
        }
    )
}

const deleteEmployee = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('DELETE FROM employees WHERE employee_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Employee deleted with ID: ${id}`)
    })
}

module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}