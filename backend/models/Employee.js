const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: String,
    department: String,
    phone: String,
    email: { type: String, unique: true },
    avatar: String,
    address: String,
    salary: Number,
    startDate: Date,
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
