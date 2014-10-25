var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/niceChat')
var users=db.get('users');

router.get('/list', function(req, res) {
	
	users.find({}, function(err, data) {
		if(err) console.log(err);
		else res.send(data);
	})
});

module.exports = router;




