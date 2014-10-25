var fs = require("fs");
var monk = require('monk');
var db = monk('localhost:27017/passkee')

//这里用来读取dta目录下的json数据，插入到数据库作为模拟数据或基础数据

var users=db.get('users');
users.remove({},{safe:true},function(err){
	if(!err){
		console.log('users removed.');
	}else console.log(err);
})

fs.readFile('data/users.txt','utf-8',function(err,data){
	if(err) console.log(err);
	else {
		data=JSON.parse(data);
		for(var i=0;i<data.length;i++){
			if(i%5==0) data[i].IsOnline=true;
			else data[i].IsOnline=false;
			users.insert(data[i]);
		}
		users.find({},function(err,data){
			var offline=0;
			for(var i=0;i<data.length;i++) if(!data[i].IsOnline) offline++;
			console.log(data.length +' rows inserted.   '+offline +' offline');
		});
		
	}
});


/*var products = db.get('products')
products.drop(function(err){
	if(!err){
		console.log('products droped.');
	}else console.log(err);
});
*/
