const { db } = require("../models");

const getJobs = (request, response) => {
    db.query('SELECT * FROM jobs ORDER BY job_id ASC', (error, results) => {
        if (error) {
            response.status(500).send(error)
        }
        else{
            response.status(200).json(results.rows)
        }
    })
}
 
const getJobById = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('SELECT * FROM jobs WHERE job_id = $1', [id], (error, results) => {
        if (error) {
            response.status(404).send(error)
        }
        else{
            response.status(200).json(results.rows)
        }
    })
}

const createJob = (request, response) => {
    const {
        job_id,
        job_title,
        min_salary,
        max_salary
    } = request.body
    db.query('INSERT INTO jobs (job_id,job_title,min_salary,max_salary) VALUES ($1,$2,$3,$4)', [job_id,job_title,min_salary,max_salary], (error, results) => {
        if (error) {
            response.status(500).send(error)
        }
        else{
        response.status(201).send(`Job added with ID: ${job_id}`)
        }
    })
}

const updateJob = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        job_title,
        min_salary,
        max_salary
    } = request.body
    db.query(
        'UPDATE jobs SET job_title=$1,min_salary=$2,max_salary=$3 WHERE job_id = $4',
        [ job_title,
            min_salary,
            max_salary,id],
        (error, results) => {
            if (error) {
                response.status(404).send(error)
            }
            else{
            response.status(200).send(`Job modified with ID: ${id}`)
            }
        }
    )
}

const deleteJob = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('DELETE FROM jobs WHERE job_id = $1', [id], (error, results) => {
        if (error) {
            response.status(404).send(error)
        }
        else{
        response.status(200).send(`Job deleted with ID: ${id}`)
        }
    })
}

module.exports = {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
}