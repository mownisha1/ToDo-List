const express = require('express');
const path=require('path');

// set up the port number
const port = 8087;

// importing the DataBase
const db = require('./config/mongoose');
// importng the Schema For tasks
const  Task  = require('./models/task');

// using express
const app = express();
app.set('views',path.join(__dirname,'views'));
// to use encrypted data
app.use(express.urlencoded());

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// rendering the App Page
app.get('/',function(req,res){
    const todolist=Task.find({}).exec();
    todolist.then(contacts=>{res.render('home',{list_data:contacts})})
            .catch((err)=>console.log('Error'));
    });


// creating Tasks
app.post('/create-task', function(req, res){
  //  console.log("Creating Task");
  const Todolist=new Promise((resolve,reject)=>{
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date

  })
    
  .then(newdata=>{
    console.log('**',newdata);
    resolve(newdata);
})
.catch(err=>{
    console.log('error');
    reject(err);
})
});
Todolist.then(data=>res.redirect('back'))
    .catch(err=>console.log('ERROR'));
});

// deleting Tasks
app.get('/delete-list',function(req,res){
    let id=req.query.id;
    Task.findByIdAndDelete(id)
            .then(()=>{
                console.log('Deleted');
                res.redirect('back');
            })
            .catch(err=>console.log('Error'));
});
// make the app to listen on asigned port number
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});