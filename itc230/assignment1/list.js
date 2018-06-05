const movies = [
    {Title : "Holloween", Genre : "Horror", Price : "$9.99"},
    {Title : "Deadpool", Genre : "Comedy", Price : "$13.99"},
    {Title : "Taken", Genre : "Action", Price : "$13.99"},
    {Title : "Titanic", Genre : "Drama", Price : "$9.99"},
    {Title : "Pineapple Express", Genre : "Comedy", Price : "$12.99"}
];

exports.movies = movies;

exports.getAll = () => {
    return movies;
};

exports.get = (movie) => {
    movie = movie.toLowerCase();
    let bool = false;
    for(var i = 0; i < movies.length; i++){
        if(movies[i].Title.toLowerCase() == movie){
            return movies[i];
        }
        if(movies[i].Title.toLowerCase() != movie && bool != true){
            bool = false;
        } else {
            bool = true;
        }
    }
    if(bool == false){
        return "Movie not found";
    }
};

const get = (movie) => {
    movie = movie.toLowerCase();
    for(var i = 0; i < movies.length; i++){
        if(movies[i].Title.toLowerCase() == movie){
            return movies[i];
        }
    }
};

exports.delete = (movie) => {
    movie = movie.toLowerCase();
    for(var i = 0; i < movies.length; i++){
        if(movies[i].Title.toLowerCase() == movie){
            movies.splice(i, 1);
            return movies;
        }
    }
};

exports.add = (title, genre, price) => {
    if(get(title)){
        return "Movie already exists";
    } else {
        movies.push({Title : title, Genre : genre, Price : price});
        return title + " added!";
    }
};