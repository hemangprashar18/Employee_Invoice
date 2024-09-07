const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

exports.generatePDF = async (invoice) => {
    try{
        // const browser = await puppeteer.launch();
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        const htmlContent = `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                h1 {
                    text-align: center;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 8px;
                    text-align: center;
                }
                th {
                    background-color: #f2f2f2;
                }
                .total-section {
                    text-align: right;
                    margin-top: 20px;
                    font-size: 1.2em;
                }
            </style>
        </head>
        <body>
            <h1>Invoice</h1>
            
            <!-- Invoice Details -->
            <div>
                <p><strong>Invoice ID:</strong> ${invoice._id}</p>
                <p><strong>User ID:</strong> ${invoice.user}</p>
                <p><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString()}</p>
            </div>
    
            <!-- Products Table -->
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoice.products.map(product => `
                    <tr>
                        <td>${product.name}</td>
                        <td>${product.qty}</td>
                        <td>₹${product.rate}</td>
                        <td>₹${product.qty * product.rate}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
    
            <!-- Total Amount Section -->
            <div class="total-section">
                <p><strong>Total Amount: </strong> ₹${invoice.totalAmount}</p>
                <p><strong>Total with GST (18%): </strong> ₹${invoice.totalAmountwithGST}</p>
            </div>
        </body>
        </html>`
    ;
    
        await page.setContent(htmlContent);
    
        const invoicesFolderPath = path.join(__dirname, '../invoices');
    
        const pdfPath = path.join(invoicesFolderPath, `invoice_${invoice._id}.pdf`);
        await page.pdf({ path: pdfPath, format: 'A4' });
    
        await browser.close();
    
        return `/invoices/invoice_${invoice._id}.pdf`;
    }catch(error){
        console.log(`Error generating PDF`,error);
    }

}
