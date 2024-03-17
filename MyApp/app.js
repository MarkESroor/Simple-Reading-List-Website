
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var response="";
var response2="";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));




app.get('/dune',function(req,res){
  res.render('dune');
})

app.get('/',function(req,res){
  response2="";
  res.render('login',{title:response});
})

app.get('/novel',function(req,res){
  res.render('novel');
})

app.get('/poetry',function(req,res){
  res.render('poetry');
})

app.get('/fiction',function(req,res){
  res.render('fiction');
})
app.get('/readlist',function(req,res){
  res.render('readlist');
})

app.get('/flies',function(req,res){
  res.render('flies');
})

app.get('/grapes',function(req,res){
  res.render('grapes');
})

app.get('/leaves',function(req,res){
  res.render('leaves');
})
app.get('/sun',function(req,res){
  res.render('sun');
})

app.get('/mockingbird',function(req,res){
  res.render('mockingbird');
})




app.get('/register',function(req,res){
  response="";
  res.render('registration',{title:response2})
})

app.get('/registration',function(req,res){
  response="";
  res.render('registration',{title:response2})
})

//REMOVE LATER
app.get('/home',function(req,res){
  res.render('home')
})




app.post('/',function(req,res){
  var x=req.body.username;
  var y=req.body.password;
 
  var user={userID:x, password:y};

  var data=fs.readFileSync("users.json"); 
  obj = JSON.parse(data); //now it an object
  var flag = false;
  var wrongpass = false;

for (i=0;i<obj.table.length;i++){
  if (obj.table[i].userID==x){
      if(obj.table[i].password==y)
        flag=true;
      else
        wrongpass=true;
  }
}

if (flag){
console.log("Found");
// response="Login Success";
res.redirect('/home');response="";
// getElementById('user').innerHTML = "Registration Failed. Duplicate username found."; 
}
else{
 
  console.log("User not found");
  if(wrongpass)
    response="Incorrect Password";
  else
    response="User Not Found. Please Register!";
  res.redirect('/');
  
  // res.render('/home');
  // getElementById('user').innerHTML = "Registration Success!"; 
  
}
})              




app.post('/register',function(req,res){   // REGISTRATION
  response="";
  var x=req.body.username;
  var y=req.body.password;
  // var tbox1 = getElementById('user');
  var newuser={userID:x, password:y};

var data=fs.readFileSync("users.json"); 
obj = JSON.parse(data); //now it an object
var flag = false;

for (i=0;i<obj.table.length;i++){
  if (obj.table[i].userID==x)
    flag=true;
}
if(x==""){
    response2="Please Enter a Username!";
    res.redirect('/register');
    }
else if(y==""){
    response2="Please Enter a Valid Password!";
    res.redirect('/register');
    }
else if (flag){
console.log("failed");
response2="Registration Failed. Duplicate Found!";
res.redirect('/register');
// response="";
// getElementById('user').innerHTML = "Registration Failed. Duplicate username found."; 
}
else{
  obj.table.push(newuser);
  json = JSON.stringify(obj); //convert it back to json
  fs.writeFileSync("users.json",json);
  console.log("success");

  response2="Registration Success!";
  response2="";
  
  res.redirect('/home');
  
  // res.render('/home');
  // getElementById('user').innerHTML = "Registration Success!"; 
  
}
})                                        //END REGISTRATION


app.post('/search',function(req,res){
  res.render('/home')
})




/*
var data=fs.readFileSync("users.json"); 
obj = JSON.parse(data); //now it an object
var newEntry= {att1:"1", att2:"2"};
obj.table.push(newEntry);
json = JSON.stringify(obj); //convert it back to json
fs.writeFileSync("users.json",json);
*/
  
app.listen(3000);

