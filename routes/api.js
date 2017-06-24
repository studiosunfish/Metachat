var express = require('express');
var router = express.Router();
var nano = require('nano')('http://localhost:5984')

var docs = nano.db.use('docs');

//Stupid stuff because we have two servers
router.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

router.get('/', function(req, res, next) {
  res.send("api!");
})

router.post('/v0.1/docs', function(req, res, next) {
  req.body.timestamp = new Date();
  docs.insert(req.body, null, function(err, body, header) {
    if (err) {
      console.log('[docs.insert] ', err.message);
      return;
    }
  });

  res.header('Access-Control-Allow-Origin', '*');
  res.end();
});

router.get('/v0.1/docs', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');

  docs.list({include_docs: true}, function (err, body) {
    if (err) {
      console.log(err)
    } else {
      res.send(body.rows);
    }
  })

});


module.exports = router;
