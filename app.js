// ------- Dependencias------------
var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');

// ------- Archivos js------------ 
var router_app = require("./app/routes/routes");

// ------- Express app------------
var app = express();
app.use(express.static(path.join(__dirname + '/public')));

// ------- bodyparser------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ------- hbs------------
app.engine('hbs', hbs({
	layoutsDir: 'app/views/layouts',
	defaultLayout: 'default',
	extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './app/views'));

// ------- Rutas------------
app.use("/",router_app);

// ------- Server------------
app.listen(3000, () => {
	console.log("Corriendo en el puerto 3000");
});