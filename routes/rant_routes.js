'use strict';

var fs = require('fs');
var bodyparser = require('body-parser');


module.exports = function(router) {

	router.use(bodyparser.json());

	router.get('/rants', function(req, res) {
		
		fs.readdir('./data', function(err, files) {
			if (err) {
				console.log(err);
				return;
			}
			res.json(files);
		});
	});

	router.post('/rants', function(req, res){
		var newRant = {
			title: req.body.title,
			rant: req.body.rant
		};
		var stringRant = JSON.stringify(newRant);
		var fileId;
		fs.readdir('./data', function(err, files){
			if(err) {
				console.log(err);
			} 
			else
				fileId = files.length;
				var filepath = './data/file' + fileId + '.json';
				fs.writeFile(filepath, stringRant, function(err){
					if(err) {
						console.log(err);
						return res.status(500).json({msg: 'Ooooh, looks like something is wrong with the process'});
					}
					res.json({msg:'new file written'});
				});
		});
	});

	router.put('/rants/:id', function(req, res){
		var update = JSON.stringify(req.body);
		var filepath = './data/' + req.params.id;
		fs.writeFile(filepath, update, function(err){
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'Ooooh, looks like something is wrong with the process'});
			}
			res.json({msg:'put request complete'});
		});
	});

	router.patch('/rants/:id', function(req, res){
		var filepath = './data/' + req.params.id;
		fs.readFile(filepath, 'utf8', function(err, data){
			var newWrite = JSON.parse(data);
			console.log(newWrite);
			if(req.body.title) {
				console.log('WE ARE HERE');
				newWrite.title = req.body.title;
			}
			else if(req.body.rant) {
				newWrite.rant = req.body.rant;
			}

			fs.writeFile(filepath, JSON.stringify(newWrite), function(err){
				if(err) {
					console.log(err);
					return res.status(500).json({msg: 'Ooooh, looks like something is wrong with the process'});
				}
				res.json({msg:'patch request complete'});
			});
		});
	});

	router.delete('/rants/:id', function(req, res) {
		var filepath = './data/' + req.params.id;
		fs.unlink(filepath, function(err){
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'Ooooh, looks like something is wrong with the process'});
			}
			res.json({msg:'delete request complete'});
		});
	});
};
