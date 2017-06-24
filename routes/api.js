var express = require('express');
var router = express.Router();
var nano = require('nano')('http://localhost:5984')

var docs = nano.db.use('docs');

router.put('/v0.1/docs', function(req, res, next) {

});


module.exports = router;
