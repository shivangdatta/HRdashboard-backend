const asyncHandler = require('express-async-handler');
const Employee = require('../models/employee');

const getAllEmployees = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const records = await Employee.aggregate([
      {
        "$project": {
          "_id": 1,
          "employeeId": 1,
          "name": 1,
          "age": 1
        }
      },
      { "$skip": skip },
      { "$limit": limit }
    ]);

    res.status(200).json(records);
  } catch (err) {
    res.status(501).json({ msg: `Failed to retrieve data. Error: ${err}` });
  }
});

const getEmployeebyId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id)

    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ msg: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ msg: `Failed to retrieve data. Error: ${err}` });
  }
});

// const getEmployeebyName = asyncHandler(async(req , res) => {
//   const { name } = req.params;
// })

module.exports = { getAllEmployees, getEmployeebyId };
