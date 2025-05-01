const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: String,
    unit: String,
    quantity: { type: Number, default: 0 },
    image: String,
    supplier: String,
    price: Number,
    notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);
