const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  jobRole: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  performanceRating: {
    type: Number,
    required: true
  },
  tenure: {
    type: Number,
    required: true
  },
  yearHired: {
    type: Number,
    required: true
  },
  location: {
    type: Map,
    of: mongoose.Schema.Types.Mixed 
  },
  projectCount: {
    type: Number
  },
  attendancePercentage: {
    type: Number
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
