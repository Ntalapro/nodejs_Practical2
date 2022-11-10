const { db } = require("../models");

const getLocations = (request, response) => {
    db.query('SELECT * FROM locations ORDER BY location_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
 
const getLocationById = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('SELECT * FROM locations WHERE location_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createLocation = (request, response) => {
    const {
        location_id,
        street_address,
        postal_code,
        city,
        country_id
    } = request.body
    db.query('INSERT INTO locations (location_id,street_address,postal_code,city,country_id) VALUES ($1,$2,$3,$4,&5)', [location_id,street_address,postal_code,city,country_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Location added with ID: ${location_id}`)
    })
}

const updateLocation = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        street_address,
        postal_code,
        city,
        country_id
    } = request.body
    db.query(
        'UPDATE locations SET  street_address=$1,postal_code=$2,city=$3,country_id=$4 WHERE location_id = $5',
        [street_address,postal_code,city,country_id,id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Location modified with ID: ${id}`)
        }
    )
}

const deleteLocation = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('DELETE FROM locations WHERE location_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Location deleted with ID: ${id}`)
    })
}

module.exports = {
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
}