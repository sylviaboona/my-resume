const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/ContactForm')

//DATABASE CONNECTION
//Dotenv will load our connection details, 
//from the configuration file into Node’s process.env.
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });



//CONFIGURATION SETTINGS
//Setting the view engine to pug
app.set('view engine', 'pug')
//views is the folder where we shall be having our pug files & set path to views
app.set('views', path.join(__dirname, 'views'));


const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/contactMe', (req, res) => {
    try {
        const question = new Question(req.body);
        question.save();
        res.redirect('back')
    } catch (error) {
        res.status(400).send("Ooops! Something went wrong.");
        console.log(error);

    }

})

app.get('*', (req, res) => {
    res.send('Error');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));