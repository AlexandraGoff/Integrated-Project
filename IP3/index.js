const express = require ('express');
const app = express();
const path = require ('path');

app.listen(3000, function(){
    console.log('Server started on port 3000.');
})

const public = path.join(__dirname,'public');
app.use(express.static(public));

app.get('/index', function(req,res){
    res.sendFile(path.join(public,'index.html'));
});

app.use(function(req,res){
    res.status(404);
    res.send('Oops! We didn\'t find what you were looking for!');

});