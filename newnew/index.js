const express = require ('express');
const app = express();
const path = require ('path');
const session = require('express-session');
const mysql = require('mysql');

app.listen(3000, function(){
    console.log('Server started on port 3000.');
})

const public = path.join(__dirname,'public');
app.use(express.static(public));

app.get('/index', function(req,res){
    res.sendFile(path.join(public,'index.html'));
});

// app.use(function(req,res){
//     res.status(404);
//     res.send('Oops! We didn\'t find what you were looking for!');

// });

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
	database: 'ip'
  });

// console.log for connected/error
connection.connect(function(error){
	if(!!error){
		console.log('Error')
	} else{
		console.log('Connected')
	}
})

//initializing express application


//associating the modules we will be using with express
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/login', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

// establishing new route to authenticate users; http://localhost:3000/auth
// this is done by capturing the input fields when user submits form
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to index page
				response.redirect('/index');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// output to confirm user's loged-in
app.get('/index', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

// register

app.get('/register', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/register.html'));
});

	app.post('/reg', function(request, response){

		let username = request.body.username;
		let password = request.body.password;
		let email = request.body.email;

		var sql = "Insert INTO users VALUES(9, '"+ username +"', '"+ password +"', '"+ email +"')";

	

		

		
			// Execute SQL query that'll select the account from the database based on the specified username and password
			connection.query(sql, function(err, rows, fields){
				if(err) throw err;
				response.redirect('/index');
			});
		

	})


	
