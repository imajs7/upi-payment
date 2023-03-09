import express from "express";
import qr from 'qr-image';
import cors from "cors";

const PORT = 4000;
// UPI ID to receive payments
const upiId = 'anukhg-1@okicici';

// business name
const businessName = 'MernCloud';

const app = express();

app.use( express.json() );
app.use( cors() );

app.get( '/', function( req, res ) {
    res.status(200).send('Working....');
} );

app.get( '/qr', function( req, res ) {

    // Amount to be paid
    const amount = Number(req.query.amount);

    if( ! amount ) {
        res.set('Content-Type', 'text');
        res.status(400).json({
            amount: 0,
            message: 'amount cannot be zero or negative'
        });
    }

    // Generate UPI QR code
    const upiUri = `upi://pay?pa=${upiId}&pn=${businessName}&am=${amount}`;
    const qrCode = qr.imageSync(upiUri, { type: 'svg' });

    // Send the QR code to the client
    res.set('Content-Type', 'image/svg+xml');
    res.send(qrCode);

} );

app.listen( PORT, function(error) {
    if(error)
        console.log(error);

    console.log(`Server running at http://localhost:${PORT}`);
} );