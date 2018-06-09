const list = require('./list.js');
const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get("/", (req, res) =>{
    list.getAll()
    res.sendFile(__dirname + '/public/home.html');
});

app.get("/about", (req, res) =>{
    res.sendFile(__dirname + '/package.json');
});

app.get("/getAll", (req, res) =>{
    let content = JSON.stringify(list.getAll());
    res.send(content);
});

app.get("/get", (req, res) =>{
    let query = req.url.toLowerCase().split('?');
    let path = query[1].split('=');
    let title = path[1];
    res.send('Searched for: ' + JSON.stringify(list.get(title)));
});

app.get("/delete", (req, res) =>{
    let query = req.url.toLowerCase().split('?');
    let path = query[1].split('=');
    let title = path[1];
    if(title.includes('%20')){
        title = title.replace('%20', ' ');
    }
    let deleted = list.delete(title);
    if(deleted){
        res.send('Movie: ' + title + ' removed ' + "<br><br><a href='/'>HOME</a>");
    } else {
        res.send('Movie: ' + title + ' not found ' + "<br><br><a href='/'>HOME</a>");
    }
});

app.post("/add", (req, res) =>{
    let title = req.body.title.toLowerCase();
    let genre = req.body.genre.toLowerCase();
    let price = req.body.price.toLowerCase();
    let added = list.add(title, genre, price);
    res.send(added + "<br><br><a href='/'>HOME</a>");
    
});

app.get("/detail", (req, res) =>{
    let query = req.url.toLowerCase().split('?');
    let path = query[1].split('=');
    let title = path[1];
    if(title.includes('%20')){
        title = title.replace('%20', ' ');
    }
    if(list.get(title)){
        res.send("Searching for: " + title + "<br><br>" + JSON.stringify(list.get(title)) + "<br><br><a href='delete?title="+title+"'>Delete " + title.toUpperCase() + "</a>" + "<br><br><a href='/'>HOME</a>"); 
    } else {
        res.send("Searching for: " + title + "<br><br>" + "<br><br>NOT FOUND" + "<br><br><a href='/'>HOME</a>");
    }
});

app.post("/detail", (req, res) =>{
    let title = req.body.title.toLowerCase();
    if(list.get(title)){
        res.send("Searching for: " + title + "<br><br>" + JSON.stringify(list.get(title)) + "<br><br><a href='delete?title="+title+"'>Delete " + title.toUpperCase() + "</a>" + "<br><br><a href='/'>HOME</a>"); 
    } else {
        res.send("Searching for: " + title + "<br><br>" + "<br><br>NOT FOUND" + "<br><br><a href='/'>HOME</a>");
    }
    
});

// if('development' == app.get('env')){
//     app.use(app.errorHandler());
//     mongoose.connect('mongodb://55.55.55.5/mongo');
// }


const port = process.env.PORT || 3000;
app.listen(port);

