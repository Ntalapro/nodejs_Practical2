const { db } = require("../models");

const getDependents = (request, response) => {
    db.query('SELECT * FROM dependents ORDER BY dependent_id ASC', (error, results) => {
        if (error) {
            response.status(500).send(error)
        }
        else{
            response.status(200).json(results.rows)
        }
    })
}
 
const getDependentById = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('SELECT * FROM dependents WHERE dependent_id = $1', [id], (error, results) => {
        if (error) {
            response.status(404).send(error)
        }
        else{
            response.status(200).json(results.rows)
        }
    })
}

const createDependent = (request, response) => {
    const {
        dependent_id,
        first_name,
        last_name,
        relationship,
        employee_id 
    } = request.body
    db.query('INSERT INTO dependents (dependent_id,first_name,last_name,relationship,employee_id) VALUES ($1,$2,$3,$4,$5)', [dependent_id,first_name,last_name,relationship,employee_id], (error, results) => {
        if (error) {
            response.status(500).send(error)
        }
        else{
        response.status(201).send(`Dependent added with ID: ${dependent_id}`)
        }
    })
}

const updateDependent = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        first_name,
        last_name,
        relationship,
        employee_id 
    } = request.body
    db.query(
        'UPDATE dependents SET first_name=$1,last_name=$2,relationship=$3,employee_id=$4 WHERE dependent_id = $5',
        [first_name,
            last_name,
            relationship,
            employee_id,id],
        (error, results) => {
            if (error) {
                response.status(404).send(error)
            }
            else{
            response.status(200).send(`Dependent modified with ID: ${id}`)
            }
        }
    )
}

const deleteDependent = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('DELETE FROM dependents WHERE dependent_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        else{
        response.status(200).send(`Dependent deleted with ID: ${id}`)
        }
    })
}

module.exports = {
    getDependents,
    getDependentById,
    createDependent,
    updateDependent,
    deleteDependent,
}