const list = require('./list.js');
const app = require('express')();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');


list.add({title : "random", genre : "this", price : "9.99"});

app.engine(".html", handlebars({
    extname: ".html"
}));

app.set("view engine", ".html");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get("/", (req, res, next) =>{
     list.getAll().then((items) => {
    res.render('home', {movies : items }); 
  }).catch((err) =>{
    return next(err);
  });
});

app.get("/about", (req, res) =>{
    res.sendFile(__dirname + '/package.json');
});

app.get("/getAll", (req, res) =>{
    // let content = JSON.stringify(list.getAll());
    res.send(list.getAll());
});

app.get("/get", (req, res) =>{
    let query = req.url.split('?');
    let path = query[1].split('=');
    let title = path[1];
    if (list.get(title) == true){
        res.send('Searched for: ' + JSON.stringify(list.movieModel.find(title)));
    }
    
});

app.get("/delete", (req, res) =>{
    let query = req.url.split('?');
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
    let movie = {title :  req.body.title, genre : req.body.genre, price : req.body.price};
    let added = list.add(movie);
    res.send(added + "<br><br><a href='/'>HOME</a>");
    
});

app.get("/detail", (req, res, next) =>{
    let query = req.url.split('?');
    let path = query[1].split('=');
    let title = path[1];
    if(title.includes('%20')){
        title = title.replace('%20', ' ');
    }
    list.get(title).then((movie)=>{
        if(movie){
        res.send("Searching for: " + title + "<br><br>" 
        + movie.title +" , "+ movie.genre +" , "+ movie.price + 
        "<br><br><a href='delete?title="+title+
        "'>Delete " + title.toUpperCase() + "</a>" + "<br><br><a href='/'>HOME</a>"); 
    } else {
        res.send("Searching for: " + title + "<br><br>" + "<br><br>NOT FOUND" + "<br><br><a href='/'>HOME</a>");
    }
    }).catch((err)=>{
        return next(err);
    });
});

app.post("/detail", (req, res) =>{
    let title = req.body.title;
    if(list.get(title)){
        console.log(list.get(title));
        // res.send("Searching for: " + title + "<br><br>" + JSON.stringify(list.get(title)) + "<br><br><a href='delete?title="+title+"'>Delete " + title.toLowerCase() + "</a>" + "<br><br><a href='/'>HOME</a>"); 
    } else {
        res.send("Searching for: " + title + "<br><br>" + "<br><br>NOT FOUND" + "<br><br><a href='/'>HOME</a>");
    }
    
});


const port = process.env.PORT || 3000;
app.listen(port);

