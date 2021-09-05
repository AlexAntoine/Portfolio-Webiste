require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const {sendEmail} = require('../email/message');

const app = express();

const viewsPath = path.join(__dirname, '../templates');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(path.join(__dirname,'../public')));
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


app.listen(3000,()=>{
    console.log('server is listening on port 3000');
});

app.get('/', (req, res)=>{

    res.render('home',{
        title:'Hello, I\'m Don-Alex'
    });
});

app.get('/post', (req,res)=>{
    
    res.render('post',{
        postTitle: 'Projects'
    });
})

app.post('/', (req, res)=>{

    console.log(req);

    const {email, subject, message} = req.body;

    sendEmail(email,subject, message);

    res.redirect('/');

});