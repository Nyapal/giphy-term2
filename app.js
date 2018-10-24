const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const http = require('http');
const giphy = require('giphy-api')();

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.static('public'))

app.get('/hello-girl', (req, res) => {
    res.send('Hello girl')
})

app.get('/hello-gif', (req, res) => {
    let gifUrl = "http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif"
    res.render('hello-gif', {gifUrl: gifUrl})
})

app.get('/greetings/:name', (req, res) => {
    let name = req.params.name;
    res.render('greetings', {name: name})
})

app.get('/', (req, res) => {
    if (req.query.term) {
        giphy.search(req.query.term, (req, response) => {
            res.render('home', {gifs: response.data})
        })
    } else {
        giphy.trending((err, response) => {
            res.render('home', {gifs: response.data})
        })
    }
})

app.listen(3000, function () {
    console.log('GIf Search listening on localhost:3000!')
})
