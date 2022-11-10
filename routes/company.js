const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const { db } = require("../models");
const countries = require("../queries/countries")
const departments = require("../queries/departments")
const dependents = require("../queries/dependents")
const employees = require("../queries/employees")
const jobs = require("../queries/jobs")
const locations = require("../queries/locations")
const regions = require("../queries/regions")




//TASK1
 
//1
router.get('/countries', countries.getCountries)
router.get('/countries/:id', countries.getCountryById)
router.post('/countries', countries.createCountry)
router.put('/countries/:id', countries.updateCountry)
router.delete('/countries/:id', countries.deleteCountry)

//2
router.get('/departments', departments.getDepartments)
router.get('/departments/:id', departments.getDepartmentById)
router.post('/departments', departments.createDepartment)
router.put('/departments/:id', departments.updateDepartment)
router.delete('/departments/:id', departments.deleteDepartment)

//3
router.get('/dependents', dependents.getDependents)
router.get('/dependents/:id', dependents.getDependentById)
router.post('/dependents', dependents.createDependent)
router.put('/dependents/:id', dependents.updateDependent)
router.delete('/dependents/:id', dependents.deleteDependent)

//4
router.get('/employees', employees.getEmployees)
router.get('/employees/:id', employees.getEmployeeById)
router.post('/employees', employees.createEmployee)
router.put('/employees/:id', employees.updateEmployee)
router.delete('/employees/:id', employees.deleteEmployee)

//5
router.get('/jobs', jobs.getJobs)
router.get('/jobs/:id', jobs.getJobById)
router.post('/jobs', jobs.createJob)
router.put('/jobs/:id', jobs.updateJob)
router.delete('/jobs/:id', jobs.deleteJob)

//6
router.get('/locations', locations.getLocations)
router.get('/locations/:id', locations.getLocationById)
router.post('/locations', locations.createLocation)
router.put('/locations/:id', locations.updateLocation)
router.delete('/locations/:id', locations.deleteLocation)

//7
router.get('/regions', regions.getRegions)
router.get('/regions/:id',regions.getRegionById)
router.post('/regions', regions.createRegion)
router.put('/regions/:id', regions.updateRegion)
router.delete('/regions/:id', regions.deleteRegion)

//////////////////////////////////////////////////////////////////////////////////////////////

/*def paginate_questions(request, selection):

    page = request.args.get("page", 1, type=int)
    start = (page - 1) * QUESTIONS_PER_PAGE
    end = start + QUESTIONS_PER_PAGE
    print(page)
    questions = [question.format() for question in selection]
    current_questions = questions[start:end]

    return current_questions*/ 

//TASK2

//1
router.get('/salaries', (request, response) => {
  
    let res = []

    // get highest paid employee and add to res[]
        db.query(`SELECT employee_id,max_salary as highest_salary
                from "jobs"
                join "employees" ON "jobs"."job_id" = "employees"."job_id"
                    ORDER BY max_salary DESC LIMIT 1`, (error, results) => {
            if (error) {
                throw error
            }
            setHigh(results.rows)
        })
    // get lowest paid employee and add to res[]
        db.query(`SELECT employee_id,max_salary as lowest_salary
                from "jobs"
                join "employees" ON "jobs"."job_id" = "employees"."job_id"
                    ORDER BY max_salary  LIMIT 1`, (error, results) => {
            if (error) {
                throw error
            }
            setLow(results.rows)
            response.status(200).json(res)
        })
        function setHigh(value){
            res.push({
                key:   "highest_pay",
                value: value
            })
        }
        function setLow(value){
            res.push({
                key:   "lowest_pay",
                value: value
            })
        }
        
        //response.status(200).json(res)
});

//2
router.get('/employees/role/:role', (request, response) => {
  
    const role = String(request.params.role)
    db.query(`SELECT * FROM employees
            join "jobs" ON "jobs"."job_id" = "employees"."job_id" 
            WHERE "jobs"."job_title" = $1`, [role], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
});

//3
router.get('/employees/pagination/:page', (request, response) => {
    const page = parseInt(request.params.page)
    db.query(`SELECT *
            FROM employees
            LIMIT 10 OFFSET ($1 - 1) * 10`, [page],(error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
});


////////////////////////////////////////////////////////////////////////////////////////////////




module.exports = router;
