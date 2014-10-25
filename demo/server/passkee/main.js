var cfg=require('./core/app/cfg.js');
var file=require('./utils/file.js');
var mediator=require('./utils/mediator.js');
var db=require('./utils/db.js');
console.log('1');
//构造全局应用
module.exports = global.app = {
	state:{},
	config:cfg,
	file:file,
	pub:function(channel,message){
		mediator.publish(channel,message);
	},
	sub:function(channel,callback){
		mediator.subscribe(channel,callback);
	},
	db:db,
	
};

require('./core/main.js');