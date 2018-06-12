var express = require('express');
var router = express.Router();
var templateView = require("./../views/templated");

router.get('/', function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(templateView.getLoginTemplate());
    res.end();
});

module.exports = router;
