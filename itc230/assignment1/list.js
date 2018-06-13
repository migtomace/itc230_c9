const movies = require("./models/movie.js");

exports.getAll = () => {
    return movies.find({}, (err, result) => {
    if (err) {
      return err;
    } 
    return result;
  });
};

exports.get = (title) => {
    return movies.find({ 'title': title },(err,item)=>{
        if (err) {
            return {
            success: false
        };
        }
        return item;
    });
};


exports.delete = (title) => {
    return movies.findOneAndRemove({'title':title},(err,item)=>{
        if(err) {
            return {
                success: false
            };
        }
        return item;
    });
};

exports.add = (movie) => {
    return movies.update({'title':movie.title}, movie , {upsert:true}, (err,item)=>{
        if(err) {
            return {
                success: false
            };
        }
        return item;
    });
};