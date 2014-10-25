var file = require('../../utils/file.js');
var conf=require('../../config.js');
var path = require('path');
var fs=require('fs');


var path_,name,tmp;
var files=file.getFiles(conf.config.path,/\.js/i);
for(var x in files){
	//console.log(files[x]);
	path_=files[x].replace(new RegExp(conf.config.path.replace(/\\/g,'\\\\')),'').split('\\');
	name=path_.pop().replace(/\.js/i,'');
	tmp=conf;
	for(var i=0;i<path_.length;i++){
		if(path_[i]) tmp=tmp[path_[i]]||{};
	}
	//console.log(files[x]);
	tmp[name]=require(files[x]);
}

//console.log(conf);
module.exports =global.config= conf;


