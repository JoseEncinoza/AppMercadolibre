const request = require('request');


//------------- endpoint /api/items?q=:query ----------------
exports.query = (req,res,next) =>{

	//Variables
	var query = req.query.q;
	var items = [];
	var item;
	var arrCategorias = [];
	var eleCategoria;
	//Request a la Api de mercadoLibre
	request('https://api.mercadolibre.com/sites/MLA/search?q='+query, { json: true }, (err, res2, body) => {
	  	if (err) return console.log(err);
	  	console.log('request api.mercadolibre.com/sites/MLA/search realizado con exito');
	  	//Request para Categorias
	  	request('https://api.mercadolibre.com/sites/MLA/categories', { json: true }, (err, res3, Categorias) => {
	  	if (err) return console.log(err);
	  	console.log('request api.mercadolibre.com/sites/MLA/categories realizado con exito');
	  	
	  		//Arreglo categorias
	  		for(var i=0; i<Categorias.length; i++){
		  		eleCategoria = Categorias[i].name;
				arrCategorias.push(eleCategoria);
		  	}

		  	//Arreglo items
		  	for(var i=0; i<body.results.length; i++){
		  		item = {
						id: body.results[i].id,
						title: body.results[i].title,
						price: {
								currency: body.results[i].currency_id,
								amount: Math.trunc(body.results[i].price),
								decimals: parseFloat((body.results[i].price - Math.trunc(body.results[i].price)).toFixed(2))
								},
						picture: body.results[i].thumbnail,
						condition: body.results[i].condition,
						free_shipping: body.results[i].shipping.free_shipping
						}
				items.push(item);
		  	}

		  	//JSON
		  	res.send(
				{
				author: 
					{
					name: 'Jose',
					lastname: 'Encinoza',
					},
				categories: arrCategorias,
				items: items
				}
			);
	  	})

	});
	
};

//------------- endpoint /api/items/:id ----------------
exports.details= (req,res,next) =>{
	//-------Variables
	var id = req.params.id;

	//------- Request a la Api de mercadoLibre
	request('https://api.mercadolibre.com/items/'+id, { json: true }, (err, res2, body) => {
  	if (err) return console.log(err);
  	console.log('request api.mercadolibre.com/items/id realizado con exito');

  		request('https://api.mercadolibre.com/items/'+id+'/description', { json: true }, (err, res3, itemDesc) => {
  		if (err) return console.log(err);
  		console.log('request api.mercadolibre.com/items/id/description realizado con exito');
  		
  		//JSON
  		res.send({
					author: 
							{
							name: 'Jose',
							lastname: 'Encinoza',
							},
					item: {
							id: body.id,
							title: body.title,
							price: {
									currency: body.currency_id,
									amount: Math.trunc(body.price),
									decimals: parseFloat((body.price - Math.trunc(body.price)).toFixed(2))
									},
							picture: body.thumbnail,
							condition: body.condition,
							free_shipping: body.shipping.free_shipping,
							sold_quantity: body.sold_quantity,
							description: itemDesc.plain_text
							}
				});

		})

	}); 

};