const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) =>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('app.log', log + '\n', (err) =>{
        if(err){
            console.log('Unable to append to app.log.')
        }
    });
    //console.log(`${now}`);
    next();
});

/* This maintenance.hbs will override all the pages that are below it's code, you will see only this
* in case you move one page above will be visible!! */

// app.use((req, res, next) =>{
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
    return text;
});

app.get('/',(req, res) => {
  res.render('home.hbs', {
      pageTitle: 'Home',
      content: 'Welcome to our Node App, we are learning seriously good stuff here!!',

  })
});

app.get('/about',(req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page',

    })
});

app.listen(3000, () =>{
    console.log('Server is up on port 3000');
});




module.exports = app;
