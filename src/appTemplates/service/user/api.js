var app = global.app;
var db = app.db('passkee');


module.exports = {
	
	login:function(req, res){
		//console.log(res.socket);
		if(req.session_start) req.session_start();
		res.send(req.session.id);
		//console.log('req.session.id:'+req.session.id);
		//console.log(res.socket);
		req.socket.emit('news',req.session.id+(new Date).getTime());
		//global.sockets.bySsid[req.session.id].emit('news',req.session.id);
	},
	
	list:function(req, res){
		
		var users=db.get('users');
		users.find({iiiddd:9}, function(data) {
			res.send(data);
		})
	},
	
};






