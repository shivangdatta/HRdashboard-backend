const asyncHandler = require('express-async-handler');
const Employee = require('../models/employee');

const getStats = asyncHandler(async (req, res) => {
  try {
    const topPerformers = await Employee.aggregate([
      { $sort: { performanceRating: -1 } },
      { $limit: 10 }
    ]);

    const gender = await Employee.aggregate([
      { $group: { _id: "$gender", count: { $sum: 1 } } },
      { $project: { _id: 0, gender: "$_id", count: 1 } }
    ]);

    const incomeAcrossYears = await Employee.aggregate([
      { $group: { _id: "$yearHired", totalIncome: { $sum: "$salary" } } },
      { $project: { _id: 0, year: "$_id", totalIncome: 1 } }
    ]);

    const employeesAcrossYears = await Employee.aggregate([
      { $group: { _id: "$yearHired", employeeCount: { $sum: 1 } } },
      { $project: { _id: 0, year: "$_id", employeeCount: 1 } }
    ]);

    const totalExpenditure = await Employee.aggregate([
      { $count: "totalEmployees" }
    ]);

    const avgRating = await Employee.aggregate([
      { $group: { _id: null, averagePerformance: { $avg: "$performanceRating" } } },
      { $project: { _id: 0, averagePerformance: 1 } }
    ]);

    const genderIncome = await Employee.aggregate([
      { $group: { _id: "$gender", totalIncome: { $sum: "$salary" } } },
      { $project: { _id: 0, gender: "$_id", totalIncome: 1 } }
    ]);


    if (!topPerformers || !gender || !incomeAcrossYears || !employeesAcrossYears || !totalExpenditure || !avgRating || !genderIncome) {
      throw new Error('Some data was not retrieved properly.');
    }

    res.status(201).json({
      rating: avgRating[0] || {},
      total: totalExpenditure[0] || {},
      graph1: employeesAcrossYears,
      graph2: incomeAcrossYears,
      pie1: gender,
      pie2: genderIncome,
      list: topPerformers
    });
  } catch (err) {
    res.status(501).json({ msg: `Some data was not retrieved: ${err.message}` });
  }
});

module.exports = { getStats };
