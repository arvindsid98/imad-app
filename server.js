var express = require('express');//create server
var morgan = require('morgan');//handle logs
var path = require('path');
var Pool=require("pg").Pool;
var crypto=require('crypto');
var bodyParser=require("body-parser");

var config={
    user: "aravind951",
    database: "aravind951",
    host: "db.imad.hasura-app.io",
    port: "5432",
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter', function(req,res){
    counter+=1;
    res.send(counter.toString());
});

app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, '/', 'article-one.html'));
});
app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, '/', 'article-2.html'));
});
app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, '/', 'article-3.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

var pool=new Pool(config);
app.get('/test-db', function(req,res){
   //db conect an select
   //return with response
    pool.query("select * from test",function(err,result){
        if(err){
            res.status(500).send(err,toString());
        }
        res.send(JSON.stringify(result.rows));
    });
    
});


function hash(input, salt){
    var hashed=crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf2Sync','10000',salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res){
   var hashString=hash(req.params.input,"this-is-random-string");
   res.send(hashString);
});

app.post('/create-user/',function(req,res){
    
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(512).toString('hex');
    var dbString=hash(password,salt);
    pool.query('insert into "user"(id,name,password) values($1,$2,$3) ',[1,username,dbString],function(err,result){
        
        if(err){
            res.status(500).send(err.toString());
        }
        res.send("user creation success"+username);
    });
});

app.post('/login/',function(req,res){
    
    var username=req.body.username;
    var password=req.body.password;

    pool.query('select * from "user" where name=$1 ',[username],function(err,result){
        
        if(err){
            res.status(500).send(err.toString());
        }
        if(result.rows.length===0){
            res.status(403).send("No such user: "+username);
        }
        else{
            var dbString2=result.rows[0].password;
            var salt=dbString.split('$')[2];
            var hashedPass=hash(password,salt);
            if(dbString === hashedPass){
                res.send("user suuccessfully logged in");
            }
            else{
                res.send("wrong password");
            }
        }
        
        
    });
});

app.get('/login/',function(req,res){
    
    var username="sid";
    var password="password";

    pool.query('select * from "user" where name=$1 ',[username],function(err,result){
        
        if(err){
            res.status(500).send(err.toString());
        }
        if(result.rows.length===0){
            res.status(403).send("No such user: "+username);
        }
        else{
            var dbString2=result.rows[0].password;
            var salt=dbString.split('$')[2];
            var hashedPass=hash(password,salt);
            if(dbString === hashedPass){
                res.send("user suuccessfully logged in");
            }
            else{
                res.send("wrong password");
            }
        }
        
        
    });
});

app.get('articles/articleeName',function(req,res){
    
    pool.query("'select * from article where title = "+req.params.articleName,"'",function(err,result){
        if(err){
            res,status(500).send(err.toString());
        }
        if(result.rows.length===0){
            res.status(404).send("Article not found");
        }
        else{
            var articleData=result.roes[0];
            res.send(createTemplate(articleData));
        }
    });   

});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var names=[];
app.get('/submit-name', function (req, res) {
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
