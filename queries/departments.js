const { db } = require("../models");

const getDepartments = (request, response) => {

    consol
    db.query('SELECT * FROM departments ORDER BY department_id ASC', (error, results) => {
        if (error) {
            response.status(500).send(error)
        }
        response.status(200).json(results.rows)
    })
}
 
const getDepartmentById = (request, response) => {

    const id = parseInt(request.params.id)
    db.query('SELECT * FROM departments WHERE department_id = $1', [id], (error, results) => {
        if (error) {
            response.status(404).send(error)
        }
        response.status(200).json(results.rows)
    })
}

const createDepartment = (request, response) => {  

    // this won't work even though it does give me th next id, I explained why in the group
    /*let department_id;
    db.query("SELECT MAX(department_id) from departments", (error, results) => {
        if (error) {
           throw error
        }
        setValue(results.rows[0].max)
    })
    function setValue(value) {
        department_id = parseInt(value) + 1;
        console.log(department_id);
    }
    */
    
    const {
        department_id,
        department_name,
        location_id
    } = request.body
    db.query('INSERT INTO departments (department_id,department_name,location_id) VALUES ($1,$2,$3)', [department_id,department_name,location_id], (error, results) => {
        if (error) {
            response.status(500).send(error)
        }
        response.status(201).send(`Department added with ID: ${department_id}`)
    })
}

const updateDepartment = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        department_name,
        location_id
    } = request.body
    db.query(
        'UPDATE departments SET  department_name=$1,location_id=$2 WHERE department_id = $3',
        [department_name,
            location_id,id],
        (error, results) => {
            if (error) {
                response.status(404).send(error)
            }
            response.status(200).send(`Department modified with ID: ${id}`)
        }
    )
}

const deleteDepartment = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('DELETE FROM departments WHERE department_id = $1', [id], (error, results) => {
        if (error) {
            response.status(404).send(error)
        }
        response.status(200).send(`Department deleted with ID: ${id}`)
    })
}

module.exports = {
    getDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
}