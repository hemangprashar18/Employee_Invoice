const Invoice = require('../models/invoiceModel');
const { generatePDF } = require('../utils/pdfGenerator');

// to generate invoice of that particular user
exports.generateInvoice = async (req, res) => {
    const { products } = req.body;  // Get products from the request body
    const userId = req.user.userId;  // Extract userId from the JWT token

    try {
        const updatedProducts = products.map(product => {
            const totalAmount = product.qty * product.rate; 
            return {
                ...product,
                totalAmount
            };
        });

        const totalAmountWithoutGST = updatedProducts.reduce((acc, product) => acc + product.totalAmount, 0);

        const gst = 0.18;
        const totalWithGST = totalAmountWithoutGST + (totalAmountWithoutGST * gst);

        const invoice = new Invoice({
            user: userId,
            products: updatedProducts,
            totalAmount: totalAmountWithoutGST,
            totalAmountwithGST: totalWithGST 
        });

        const pdfUrls = await generatePDF(invoice);
        invoice.pdfUrl = pdfUrls;
        await invoice.save();

        res.status(201).json({pdfUrl});
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};

// to view invoices pdf url of all users
exports.viewInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({},{pdfUrl:1,_id:0});
        res.status(200).json({ invoices });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};
