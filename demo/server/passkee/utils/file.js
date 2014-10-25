var fs = require('fs');


module.exports = {
	each:file_each,
	getFiles:function(path,filter){
		var files=[];
		getFile(path,files,filter);
		return files;
	},
};



function getFile(path,files_,filter) {
	var files=fs.readdirSync(path)
	files.forEach(function(item) {
		var tmpPath = path + '\\' + item;
		var stats= fs.statSync(tmpPath);
		if (stats.isDirectory()) {
			getFile(tmpPath,files_,filter);
		} else {
			if(filter&&filter.constructor==RegExp){
				if(filter.test(tmpPath))
					files_.push(tmpPath);
			}else files_.push(tmpPath);
		}
	});
}



function file_each(path, handleFile) {
	handleFile(path);
	fs.readdir(path, function(err, files) {
		if (err) {
			console.log('read dir error');
		} else {
			files.forEach(function(item) {
				var tmpPath = path + '/' + item;
				fs.stat(tmpPath, function(err1, stats) {
					if (err1) {
						console.log('stat error');
					} else {
						if (stats.isDirectory()) {
							file_each(tmpPath, handleFile);
						} else {
							handleFile(tmpPath);
						}
					}
				})
			});

		}
	});
}

