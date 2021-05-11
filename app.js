
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const purchaseSchema = {
    item: String
}

const userSchema = {
    email: String,
    password: String,
    purchases: [purchaseSchema]
};

const User = new mongoose.model("User", userSchema);

app.listen(3000, function(){
    console.log("Server started on port 3000.");
});

app.get("/", function(req, res){
    res.render("index")
});

app.get("/home", function(req, res){
    res.render("home")
});

app.get("/index", function(req, res){
    res.render("index")
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/cars", function(req, res){
    res.render("cars");
});

app.get("/parts", function(req, res){
    res.render("parts");
});

app.get("/tools", function(req, res){
    res.render("tools");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save(function(err){
        if(err) {
            console.log(err);
        } else {

            res.render("home");
        }
    });
});
   
app.post("/login", function(req, res){

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            if(foundUser){
                if(foundUser.password === password){
                    res.render("home");
                }
            }
        }
    });
});


