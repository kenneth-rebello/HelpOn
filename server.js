const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");
const enforce = require('express-sslify');
const compression = require('compression');

if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(enforce.HTTPS({trustProtoHeader: true}))
app.use(bodyParser.json());
app.use(cors());

if(process.env.NODE_ENV === "production"){
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(compression());
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    });
}


app.post('/payment', (req,res) => {

    console.log('Here')
    const body = {
        source: req.body.token.id,
        amount: parseInt(req.body.amount),
        currency: 'inr',
        description:"Donations to HelpOn"
    }

    console.log(body)

    stripe.charges.create(body, (stripeErr, stripeRes)=>{
        if(stripeRes){
            return res.status(200).send({success: stripeRes});
        }else{
            return res.status(500).send({error: stripeErr})
        }
    })
});


app.listen(PORT, error => {
    if(error)
        throw error;
    console.log(`Server running on port ${PORT}`)
});


app.get('/service-worker.js', (req,res)=>{
    res.sendFile(path.resolve(__dirname, '..','build','service-worker.js'))
})