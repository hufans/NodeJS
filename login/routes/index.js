var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, response, next) {
//   // res.render('index', { title: 'geme' });
//   response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});   
//         str="<h1>欢迎</h1><a href='/login'>点我登录</a>";  
//          response.write(str);   
//          response.end();   
// });


router.get('/', function(req, response, next) {
  response.sendFile(__dirname + '/../views/chat.html');
});
module.exports = router;
