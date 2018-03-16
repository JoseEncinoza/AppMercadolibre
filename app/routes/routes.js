var searchController = require('../controllers/searchController');
var apiController = require('../controllers/apiController');
var express = require("express");


var router =express.Router();

//------- Puntos de Acceso------------
router.get('/', searchController.index);
router.get('/items', searchController.buscar);
router.get('/items/:id',searchController.detalle);

//------- EndPoints------------
router.get('/api/items', apiController.query);
router.get('/api/items/:id', apiController.details);

// ------------------------------------
module.exports = router;
