// import modules
const express = require('express');
const router = express.Router();
const axios = require('axios');

// logout route
router.get('/logout', (req, res) => {
	// destroy session and redirect to auth page
	req.session.destroy((err) => {
		res.redirect('/auth');
	});
});

// check session middleware
router.use((req, res, next) => {
	if (!req.session.userId) {
		next();
	} else {
		res.redirect('/');
	}
});

router.get('/', (req, res) => {
	// send auth page view
	res.render('auth');
});

router.get('/login', (req, res) => {
	// check if token url query string exists
	if (req.query.token) {
		// if exists, get user id with post request
		axios({
			method: 'post',
			url: `https://quickauth.alles.cx/`,
			headers: {},
			data: {
				token: req.query.token,
				redirect: `https://${req.get('host')}/auth/login`
			}
		})
			.then((response) => {
				// save userid to session
				req.session.userId = response.data.id;
				// redirect home
				res.redirect('/');
			})
			.catch((err) => {
				// log error if one occurs
				console.log(err);
				res.redirect('/');
			});
	} else {
		// if it doesn't, redirect to quick auth
		res.redirect(`https://quickauth.alles.cx/?redirect=https://${req.get('host')}/auth/login`);
	}
});

// export routes
module.exports = router;
