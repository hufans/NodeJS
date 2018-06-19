var express = require('express');
var router = express.Router();
var mysql = require('./../mysql/sql');

router.get('/', function(req, res, next){ 
    var user = req.session.user;
    if (user) {
        res.redirect('/product');
    } else {
        renderTemplate(res, loginHtmlTemplate());   
    }
});

router.post("/", 
    handleUserAuthentication,
    handleUserSession,
    function(req, res, next) {
        res.redirect('/product');
    }
)

function handleUserAuthentication(req, res, next) {
    var pass = req.body;
    var name = pass.name;
    var password = pass.password;
    var sql = "SELECT * FROM t_user WHERE name = '" + name + "' AND password = '" + password + "'";
    mysql.query(sql, function (err, data) {
        if (err) {
            return next(err);
        }
        if(data.length !== 1) {
            return renderTemplate(res, failedToLoginHtmlTemplate());
        }
        req.userData = data[0];
        next();
    });
}

function handleUserSession(req, res, next) {
    console.log("hahaha");
    var userData = req.userData;
    req.session.user = {
        id: userData.id,
        userName: userData.name,
        tel: userData.tel,
        age: userData.age,
        address:userData.defaultCity,
    }
    next();
}

function renderTemplate(res, template) {
    res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
    res.write(template);
    res.end();
}

function failedToLoginHtmlTemplate() {
    return `
        <div>
            <p>用户登录失败<p>
            <a href='/login'>返回登录</a>
        </div>
    `;
}

function loginHtmlTemplate() {
    return `
        <div>
            <form action='/login' method='post'>
                <div>
                    帐号:<input type ='text' name='name'>
                </div>
                <div>
                    密码:<input type ='password' name='password'>
                </div>
                <div>
                    <input type ='submit' value='提交'>
                </div>
            </form>
        </div>
    `;
}

module.exports = router;