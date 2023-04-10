//jshint esversion
const express = require('express');
const bodyparser = require("body-parser");
const request = require('request');
const Swal = require('sweetalert');
//multer for uploding files
const multer = require("multer");
//view pdf
const pdfjsLib = require('pdfjs-dist');
const path = require('path');
const fs = require('fs');
const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({
    storage: Storage,
});
// authanctation import
const session = require('express-session');
const passport = require('passport');
const local = require('passport-local');
const connectEnsureLogin = require('connect-ensure-login');
//import 
const mongoose = require('mongoose');

const uri ="mongodb+srv://ankitkumar15032003:<password>@cluster0.0kzpahg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('Error connecting to MongoDB Atlas:', err));

const passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect(uri, { useNewUrlParser: true });
mongoose.set('strictQuery', true);
const userSchema = require('./models/user');
//question add
const questionSchema = require('./models/question');
const postSchema = require('./models/post');
userSchema.plugin(passportLocalMongoose);
const app = express();
//using ejs in express 
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

//use all import  use 
app.use(session({
    secret: "Ankit animesh Tuhin",
    resave: false,
    saveUninitialized: true,
    cookie: { max: 60 * 60 * 60 }
}));
app.use(passport.initialize());
app.use(passport.session());



const User = mongoose.model("user", userSchema);
const Question = mongoose.model("question", questionSchema);
const Post = mongoose.model("post", postSchema);



passport.use(User.createStrategy());




passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

app.get("/", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("user/home", { auth: "t", user: req.user });
    }
    else {
        res.render("user/home", { auth: "f" });
    }
});
app.get("/exam", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("user/exam", { auth: "t", user: req.user });
    }
    else {
        res.redirect("/login");
    }
});
app.get("/openforem", async (req, res) => {
    if (req.isAuthenticated()) {

        Post.find({})
            .populate({
                path:'author',
            }
            )
            .populate({
                path:'comments',
                populate:{
                    path:'postedBy'
                }
            })
            .exec(function (err, posts) {
               

                res.render("user/openforem", { post: posts, auth: "t", user: req.user });
            });
    }
    else {
        res.redirect("/login");
    }

});
app.post("/post", function (req, res) {
    if (req.isAuthenticated()) {
        const post = new Post({
            description: req.body.post,
            author: req.user.id,
        })
        post.save();
        res.redirect("/openforem");
    }
    else {
        res.redirect("/");
    }
})
app.post("/likes/:postId",async(req,res)=>
{
    if(req.isAuthenticated())
    {
    const { postId } = req.params;
    const userId = req.user.id;
    const post = await Post.findById(postId);

    // Remove the user's like from the post
    const index = post.likes.indexOf(userId);
    if (index > -1) 
    {
      post.likes.splice(index, 1);
      await post.save();
      res.redirect(`/openforem`);
    }
    else
    {
               
    Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } })
    .then(() => res.redirect(`/openforem`))
    .catch(err => console.error(err));
    }
}
else{
    res.redirect("/");
}
    
    
});
app.post("/comment/:postId",async(req,res)=>{
    if (req.isAuthenticated()) {
         const { postId } = req.params;
              const text1=req.body.comments;
              const userId=req.user.id;
              
              const comment={
                text:text1,
                postedBy:userId,
              }
              Post.findById(postId, (err, post) => {
                if (err) {
                  console.log(err);
                } else 
                {
                  post.comments.push(comment);
                  post.save();
                  res.redirect("/openforem");
                }
              });

            }
            else{
                res.redirect("/login");
            }
})

app.get("/erepository", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("user/erepository", { auth: "t", user: req.user });
    }
    else {
        res.redirect("/login");
    }


});
app.post("/upload", upload.single("pdf"), function (req, res) {
    if (req.isAuthenticated()) {
        
        
           const  repository={
                 data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
                contentType: req.file.mimetype,
                title:req.body.title,
            }
        var newrepository = [];
        newrepository = req.user.repository;
      
        newrepository.push(repository);
        User.findByIdAndUpdate(req.user.id, { repository: newrepository }, function (err, user) {
            if (err) {
                console.log(err);
            }
            else {

                console.log("succefully upload")
            }
        })
        res.redirect("/erepository");
    }
    else {
        res.redirect("/");
    }
});
app.get("/document", (req, res) => {
    if (req.isAuthenticated()) {

        User.findById(req.user.id, function (err, founditem) {
            if (err) {
                console.log(err);
            }
            else {
                res.render("user/document", { image: founditem.repository });
            }
        })
    }
    else {
        res.redirect("/");
    }
});


app.get("/mywall", function (req, res) {
    if (req.isAuthenticated()) {

        res.render("user/mywall", { auth: "t", user: req.user });
    }
    else {
        res.redirect("/login");
    }


});
app.post("/updateprofile", upload.single("myimage"), function (req, res) {
    if (req.isAuthenticated()) {
        const obj = {
            img: {
                data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
                contentType: "image/png"
            }
        }
        const newuser = {
            profile: obj.img,
        }

        User.findByIdAndUpdate(req.user.id, newuser, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                
                res.redirect("/mywall");
            }
        })

    }
    else {
        res.redirect("/");
    }

})
app.post("/updateuser", function (req, res) {
    if (req.isAuthenticated()) {
        const newuser = {
            name: req.body.name,
            sic: req.body.sic,
            email: req.body.email,
            mobileno: req.body.phoneno,
            address: req.body.address,
            college: req.body.college,
            country: req.body.country,
        }

        User.findByIdAndUpdate(req.user.id, newuser, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                //console.log(req.user);
                res.redirect("/mywall");
            }
        })

    }
    else {
        res.redirect("/");
    }

})
app.get("/login", function (req, res) {

    res.render("user/login", { auth: "f" });
});
app.get("/signup", function (req, res) {

    res.render("user/signup", { auth: "f" });
});

app.post("/login", passport.authenticate('local', { failureRedirect:'/login' }), function (req, res, err) 
{ 
   
    res.redirect("/");
});

app.post("/signup", function (req, res) {

    const imageUrl = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-glasses-profile.jpg";
    request.get({ url: imageUrl, encoding: null }, (err, ress, body) => {
        if (err) throw err;
        var obj = {
            img: {
                data: body,
                contentType: "image/png"
            }
        }
        User.register({ username: req.body.username, name: req.body.name, email: req.body.username, profile: obj.img }, req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                res.redirect("/signup");
            }
            else {
                res.redirect("/login");
            }
    
        });

    });
});
app.use("/logout", function (req, res) {
    req.logOut(function (err) {
        res.redirect("/");
    })
})

// Function of giving exam
var question1 = [];
var q = 0;
var score = 0;
app.get("/quiz", (req, res) => {
    if (req.isAuthenticated()) {

        Question.find({}, function (err, foundList) {
            question1.push(foundList);
            //console.log(question1);
           
            res.render("user/quiz", { question: question1[0][q], qno: q + 1 });
        });
    }
    else {
        res.redirect("/");
    }

})
app.post("/quiz", (req, res) => {
    if (req.isAuthenticated()) {
        var ans = req.body.option;
        //console.log(ans);
        //console.log(question1[0][q].answer);
        if (question1[0][q].answer == ans)
        {
            score = score + 1;
        }
        q++;
        if (q >= 5) {
            q = q - 5;
            res.redirect("/result");
        }
        else {

            res.redirect("/quiz");
        }
    }
    else {
        res.redirect("/");
    }

})

app.get("/result", function (req, res) {
    if (req.isAuthenticated()) {
        var newscore = [];
        newscore = req.user.score;
        newscore.push(score);
        q=0;
        score=0;
        User.findByIdAndUpdate(req.user.id, { score: newscore }, function (err, user) {
            if (err) {
                console.log(err);
            }
            else {
                res.render("user/score", { score: score, auth: 't', user: req.user });
                score = 0;
            }
        });

    }
    else {
        res.redirect("/");
    }
})

// admin add questions
app.post("/addquestion", (req, res) => {
    const question = new Question({
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        answer: req.body.answer,
    });
    question.save();
    res.render("admin/addquestion");

})
app.get("/adminlogin", (req,res)=>{
    res.render("admin/login");
});
app.post("/adminlogin", (req,res)=>{
    const userid=req.body.username;
    const password=req.body.password;
    if(userid=="admin@gmail.com"&&password=="12345678")
    {
        res.render("admin/addquestion");
    }
    else{
        res.redirect("/")
    }
});

app.listen(3000, function () {
    console.log("Server is running at 3000 port");
});


