const asyncHandler = require('express-async-handler')
const Employee = require('../models/employee')


const getAllEmployees = asyncHandler(async (req , res) => {
    const records = await Employee.find()

    try{
        res.status(200).json(records)
    }
    catch(err){
        res.status(501).json({msg : `Failed to retrieve data error : ${err}` })
    }
})

module.exports = {getAllEmployees}