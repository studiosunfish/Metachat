var express = require('express');
var router = express.Router();
var nano = require('nano')('http://localhost:5984')

var testdb = nano.db.use('docs');

/* GET users listing. */
router.get('/', function(req, res, next) {

  // Insert a book document in the books database
  testdb.insert({ crazy: true }, null, function(err, body, header) {
    if (err) {
      console.log('[alice.insert] ', err.message);
      return;
    }
    console.log('you have inserted the rabbit.')
    console.log(body);
    res.send(body);
  });
});

router.get('/list', function(req, res, next) {
    // Get a list of all books
  testdb.list({include_docs: true}, function (err, body) {
    if (err) {
      console.log(err)
    } else {
      console.log(body.rows)
      res.send(body.rows);
    }
  })
})

module.exports = router;
