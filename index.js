var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/registration', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/sign_up", (req, res) => {
    const { name, age, email, phno, gender, password } = req.body;

    const data = {
        name,
        age,
        email,
        phno,
        gender,
        password
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            return res.status(500).send("Error inserting record");
        }
        console.log("Record Inserted Successfully");
        res.redirect('/signup_successful.html');
    });
});

app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.sendFile(__dirname + '/public/index.html');
});

app.get("/signup", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.sendFile(__dirname + '/public/signup.html');
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
