const { db } = require("../models");

const getRegions = (request, response) => {
    db.query('SELECT * FROM regions ORDER BY region_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
 
const getRegionById = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('SELECT * FROM regions WHERE region_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results)
        response.status(200).json(results.rows)
    })
}

const createRegion = (request, response) => {
    const {
        region_id,
        region_name
    } = request.body
    db.query('INSERT INTO regions (region_id,region_name) VALUES ($1,$2)', [region_id,region_name], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results)
        response.status(201).send(`Region added with ID: ${region_id}`)
    })
}

const updateRegion = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        region_name
    } = request.body
    pool.query(
        'UPDATE regions SET region_name = $1, WHERE region_id = $2',
        [region_name, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Region modified with ID: ${id}`)
        }
    )
}

const deleteRegion = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM regions WHERE region_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Region deleted with ID: ${id}`)
    })
}

module.exports = {
    getRegions,
    getRegionById,
    createRegion,
    updateRegion,
    deleteRegion,
}