const { db } = require("../models");

const getCountries = (request, response) => {
    db.query('SELECT * FROM countries ORDER BY country_id ASC', (error, results) => {
        if (error) {
            response.status(500).send(error)
        }
        else{
            response.status(200).json(results.rows)
        }
    })
}
 
const getCountryById = (request, response) => {
    const id = request.params.id
    db.query('SELECT * FROM countries WHERE country_id = $1', [id], (error, results) => {
        if (error) {
            response.status(404).send(error)
        }
        else{
        response.status(200).json(results.rows)
        }
    })
}

const createCountry = (request, response) => {
    const {
        country_id,
        country_name,
        region_id
    } = request.body
    db.query('INSERT INTO countries (country_id,country_name,region_id) VALUES ($1,$2,$3)', [country_id,country_name,region_id], (error, results) => {
        if (error) {
            response.status(500).send(error)
        }
        else{
        response.status(201).send(`Country added with ID: ${country_id}`)
        }
    })
}

const updateCountry = (request, response) => {
    const id = request.params.id
    const {
        country_name,
        region_id
    } = request.body
    db.query(
        'UPDATE countries SET  country_name = $1, region_id= $2 WHERE country_id = $3',
        [country_name,
            region_id,id],
        (error, results) => {
            if (error) {
                response.status(500).send(error)
            }
            else{
            response.status(200).send(`Country modified with ID: ${id}`)
            }
        }
    )
}

const deleteCountry = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('DELETE FROM countries WHERE country_id = $1', [id], (error, results) => {
        if (error) {
            response.status(404).send(error)
        }
        else{
        response.status(200).send(`Country deleted with ID: ${id}`)
        }
    })
}

module.exports = {
    getCountries,
    getCountryById,
    createCountry,
    updateCountry,
    deleteCountry,
}