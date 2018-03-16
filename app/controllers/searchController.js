const request = require('request');
 
exports.index = (req,res,next) =>{
	res.render('index');
};

exports.buscar = (req,res,next) =>{
	var dato = req.query.search;

	request('http://localhost:3000/api/items?q='+dato, { json: true }, (err, res2, body) => {
  	if (err) { return console.log(err); }
  	res.render('search', body);
	});
	
	// res.redirect("/app/imagenes/"+imagen._id);
};

exports.detalle = (req,res,next) =>{
	var id = req.params.id;

	request('http://localhost:3000/api/items/'+id, { json: true }, (err, res2, body) => {
  	if (err) { return console.log(err); }
  	res.render('description', body);
	});
};