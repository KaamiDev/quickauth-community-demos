// import modules
const express = require('express');
const { default: Axios } = require('axios');
const router = express.Router();
const axios = require('axios');
const { response } = require('express');

// check session middleware
router.use(async (req, res, next) => {
	// check if session exists
	if (req.session.userId) {
		// try getting user info from horizon api
		try {
			let response = await axios.get(`https://horizon.alles.cc/users/${req.session.userId}`);
			// set user information
			req.user = response.data;
			next();
		} catch (err) {
			// if err, log error and redirect to auth page
			console.log(err);

			// logout if invalid key
			res.redirect('/auth/logout');
		}
	} else {
		// redirect to auth if session doesnt exist
		res.redirect('/auth');
	}
});

router.get('/', (req, res) => {
	// send home page view with user info
	res.render('home', { user: req.user });
});

// export routes
module.exports = router;
