const list = require('./list.js');
const app = require('express')();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route

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

app.post("/add", (req, res) =>{
    let movie = {title :  req.body.title, genre : req.body.genre, price : req.body.price};
    let added = list.add(movie);
    res.send(added + "<br><br><a href='/'>HOME</a>");
    
});


app.post("/detail", (req, res, next) =>{
    let title = req.body.title;
    list.get(title).then((movie)=>{
        if(list.get(title)){
        // console.log(list.get(title));
        res.send("Searching for: " + movie.title + "<br><br>" + movie.title + " , " + movie.genre + " , " + movie.price + "<br><br><a href='delete?title="+title+"'>Delete " + title + "</a>" + "<br><br><a href='/'>HOME</a>"); 
    } else {
        res.send("Searching for: " +movie.title + "<br><br>" + "<br><br>NOT FOUND" + "<br><br><a href='/'>HOME</a>");
    }
    }).catch((err)=>{
        return next(err);
    })
    
    
});

app.get('/api/movie/:title', (req, res, next) => {
    let title = req.params.title;
    list.get(title).then((movie)=>{
        if(movie){
        // console.log(list.get(title));
        res.send("Searching for: " + title + "<br><br>" + movie.title + " , " + movie.genre + " , " + movie.price + "<br><br><a href='/api/movie/delete/"+title+"'>Delete " + title + "</a>" + "<br><br><a href='/'>HOME</a>"); 
    } else {
        res.send("Searching for: " + title + "<br><br>" + "<br><br>NOT FOUND" + "<br><br><a href='/'>HOME</a>");
    }
    }).catch((err)=>{
        return next(err);
    });
});

app.get('/api/movies', (req, res, next) => {
    list.getAll().then((movies)=>{
        console.log(movies);
        let string = "";
        for(let movie in movies){
            string += movies[movie].title + ", " + movies[movie].genre + ", " + movies[movie].price + "<br>";
        }
        res.send(string);
    }).catch((err)=>{
        return next(err);
    });
    
});


app.get('/api/movie/delete/:title', (req,res) => {
    let title = req.params.title;
    let deleted = list.delete(title);
    if (deleted) {
    // res.json sets appropriate status code and response header
    res.json(title + " deleted");
  } else {
    return res.status(500).send('Error occurred: database error.');
  }
});

app.get('/api/movie/:title/:genre/:price', (req,res) => {
    let movie = {title : req.params.title, genre : req.params.genre, price : req.params.price};
    let added = list.add(movie);
    if (added) {
    // res.json sets appropriate status code and response header
    res.json(req.params.title + " added");
  } else {
    return res.status(500).send('Error occurred: database error.');
  }
});


const port = process.env.PORT || 3000;
app.listen(port);

