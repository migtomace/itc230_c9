const list = require('./list.js');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get("/", (req, res) =>{
    res.sendFile(__dirname + '/public/home.html');
});

app.get("/about", (req, res) =>{
    res.sendFile(__dirname + '/package.json');
});

app.get("/getAll", (req, res) =>{
    let content = 'All movies: ' + JSON.stringify(list.getAll());
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


const port = process.env.PORT || 3000;
app.listen(port);

// var http = require("http"); 
// http.createServer(function(req,res) {
//   var path = req.url.toLowerCase();
//   var fs = require("fs");
  
//     var query = req.url.toLowerCase().split("?");
//     console.log(query);
//     var path = query[0]; // part before the ?
//     var title = decodeURI((query[1]) ? query[1].split("=")[1] : '');
  
//   switch(path) {
//     case '/':
//       fs.readFile('public/home.html', function (err, data) {
//         if (err) {
//          console.log(err);
//          // HTTP Status: 404 : NOT FOUND
//          // Content Type: text/plain
//          res.writeHead(404, {'Content-Type': 'text/html'});
//       }else {	
//          //Page found	  
//          // HTTP Status: 200 : OK
//          // Content Type: text/plain
//          res.writeHead(200, {'Content-Type': 'text/html'});	
         
//          // Write the content of the file to response body
//          res.write(data.toString());		
//       }
//       // Send the response body 
//       res.end();
//       });
//       break;
      
//     case '/about':
//       fs.readFile('package.json', function (err, data) {
//         if (err) {
//          console.log(err);
//          // HTTP Status: 404 : NOT FOUND
//          // Content Type: text/plain
//          res.writeHead(404, {'Content-Type': 'text/html'});
//       }else {	
//          //Page found	  
//          // HTTP Status: 200 : OK
//          // Content Type: text/plain
//          res.writeHead(200, {'Content-Type': 'text/html'});	
         
//          // Write the content of the file to response body
//          res.write(data.toString());		
//       }
//       // Send the response body 
//       res.end();
//       });
//       break;
//  case '/getall':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('All movies: ' + JSON.stringify(list.getAll()));
//       break; 
//     case '/get':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('Searched for: ' + JSON.stringify(list.get(title)));
//       break;  
//     case '/delete':
//       var deleted = list.delete(title); 
//       if (deleted) {
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('Movie ' + title + ' removed');
//       } else {
//       res.writeHead(200, {'Content-Type': 'text/plain'});  
//       res.end('Movie ' + title + ' not removed');
//       }
//       break;
//     default:
//       res.writeHead(404, {'Content-Type': 'text/plain'});
//       res.end('Not found');
// break;
//     }
// }).listen(process.env.PORT || 3000);