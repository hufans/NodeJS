var express = require('express');
var router = express.Router();
var mysql = require("../mysql/sql")
var templated = require("../views/templated") 


router.get('/', function(req, res, next){
    var user = req.session.user;

    var sql = "SELECT * FROM t_user WHERE id = '" + user.id + "'";
    mysql.query(sql, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.length !== 1) {
            return renderTemplate(res, templated.userNotFoundHtmlTemplate());
        }
        const userData = results[0];
        renderTemplate(res, templated.userProfileHtmlTemplate(userData));
    });
});

function renderTemplate(res, template) {
    res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
    res.write(template);
    res.end();
}

module.exports = router;
