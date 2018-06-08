var express = require('express');
var router = express.Router();
var mysql = require('./../mysql/sql');

router.all("*", function (req, res, next) {    //if already login
    console.log(req.originalUrl); // '/admin/new'
    console.log(req.baseUrl); // '/admin'
    console.log(req.path); // '/new'
    if (req.session.userData) {
        if (req.originalUrl === "login" || req.originalUrl === "dologin" || req.originalUrl === "/") {
            showUserPage(req,res)
        }
    } else {//Not yet logged in
        if (req.baseUrl.indexOf("modify") != -1) { //未匹配到相同的字符
            res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
            var str = "<form action='/dologin' method='post'>" +
                "帐号:<input type ='text' name='name'><br/><br/>" +
                "密码:<input type ='password' name='password'><br/><br/>" +
                "  <input type ='submit' value='提交'></form>";
            res.write(str);
            res.end();
        }
    }
    next();
});
//函数使用
function showUserPage(req, res) {
    var usermsg = req.session.userData
    res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
    if (data != '') { //usermsg.name+usermsg.password
        var str = "<h1>你好啊</h1>";
        str += "帐号:" + usermsg.name + "<br>";
        str += "密码:" + usermsg.password;
        str += "<table border='1' width='400px'>";
        str += "<tr><th>姓名</th><th>电话</th><th>年龄</th><th>操作</th></tr>";
        for (var i = data.length - 1; i >= 0; i--) {
            str += "<tr>";
            str += "<td>" + usermsg.name + "</td>";
            str += "<td>" + usermsg.tel + "</td>";
            str += "<td>" + usermsg.age + "</td>";
            str += "<td><a href='/modify?id=" + usermsg.id + "'>修改</a></td>";
            str += "<img src=\"./images/header.png\"alt=\"header\" />"
            str += "</tr>";
        };
        str += "</tr></table>";
    }
    res.write(str);
    res.end();
}
module.exports = router;