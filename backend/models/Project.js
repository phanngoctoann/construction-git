const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    image: String,
    startDate: Date,
    endDate: Date,
    budget: Number,
    progress: Number
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
