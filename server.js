var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var todos = require('./server/routes/todos');

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', todos);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(8080, function() {
    console.log("server started on port 8080");
});
