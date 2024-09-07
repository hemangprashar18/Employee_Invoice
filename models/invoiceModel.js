const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            name: String,
            qty: Number,
            rate: Number,
            gst: Number,
            userId: { type: mongoose.Schema.Types.ObjectId}  // Assuming you have a User model,
        }
    ],
    totalAmount: { type: Number, required: true },
    totalAmountwithGST: {type: Number, required: true},
    date: { type: Date, default: Date.now },
    pdfUrl: { type: String, required:true }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
