// import express modules
const express = require('express');
const app = express();

// import session modules
const session = require('express-session');
app.set('trust proxy', 1);
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true
	})
);

// set view engine
app.set('view engine', 'ejs');

// setup public dir
app.use(express.static('./public'));

// setup routes
app.use('/auth', require('./routes/auth.js'));
app.use('/', require('./routes/home.js'));

// listen to port & start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started, listening on port ${PORT}`);
});
