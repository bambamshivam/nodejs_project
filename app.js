const express=require('express');

const morgan=require('morgan');
const mongoose=require('mongoose');
const app=express();

const { render } = require('ejs');

const blogRoutes=require('./routes/blogRoutes');

const dbURI='mongodb+srv://b_s:test1234@node-course.ni7mc.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err));


app.set('view engine','ejs');

app.use(morgan('dev'));




app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.redirect('/blogs');
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
})

app.use('/blogs',blogRoutes);

app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
})