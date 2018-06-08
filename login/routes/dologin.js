var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
var mysql = require('./../mysql/sql');

router.post('/', function (req, res, data) {
    req.setEncoding("utf8");
    var x = req.body
    deal(req, res, data)
});

function deal(req, res, data) {
    var pass = req.body;
    var name = pass.name;
    var password = pass.password;
    var sql = "SELECT * FROM t_user WHERE name = '" + name + "' AND password = '" + password + "'";
    mysql.query(sql, function (data) {
        showpage(req, res, data);
    });
}

//show user detail after login success 
function showpage(req, res, data) {
    res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
    if (data != '') { //data[0].name+data[0].password
        //login success 
        req.session.userData = {};
        req.session.userData.login = true;
        req.session.userData.userName = data[0].name;
        req.session.userData.tel = data[0].tel;
        req.session.userData.age = data[0].age;
        req.session.userData.id = data[0].id;

        var str = "<h1>你好啊</h1>";
        str += "帐号:" + data[0].name + "<br>";
        str += "密码:" + data[0].password;
        str += "<table border='1' width='400px'>";
        str += "<tr><th>姓名</th><th>电话</th><th>年龄</th><th>操作</th></tr>";
        for (var i = data.length - 1; i >= 0; i--) {
            str += "<tr>";
            str += "<td>" + data[i].name + "</td>";
            str += "<td>" + data[i].tel + "</td>";
            str += "<td>" + data[i].age + "</td>";
            str += "<td><a href='/modify?id=" + data[i].id + "'>修改</a></td>";
            str += "<img src=\"./images/header.png\"alt=\"header\" />"
            str += "</tr>";
        };
        str += "</tr></table>";

    } else {
        var str = "<h1>登录失败</h1>";
        str += "<a href='/login'>返回登录</a>";
    };
    res.write(str);
    res.end();
}
module.exports = router;