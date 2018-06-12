var express = require('express');
var router = express.Router();
var mysql = require("../mysql/sql")


router.get('/', function(req, res, next){
    console.log(req.session)
    var user = req.session.user;

    var sql = "SELECT * FROM t_user WHERE id = '" + user.id + "'";
    mysql.query(sql, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.length !== 1) {
            return renderTemplate(res, userNotFoundHtmlTemplate());
        }
        const userData = results[0];
        renderTemplate(res, userProfileHtmlTemplate({
            userData: userData,
        }));
    });
});

function renderTemplate(res, template) {
    res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
    res.write(template);
    res.end();
}

function userNotFoundHtmlTemplate() {
    return `
        <h1>User Not Found!</h1>
        <p>
            <a href='/profile'>Refresh Current Page pls!</a>
        </p>
    `
}

//show user detail after login success 
function userProfileHtmlTemplate(templateData) {
    var userData = templateData.userData;
    return `
        <h1>你好啊</h1>
        <div>
            <p>Account: ${userData.name}</p>
            <div>
                <img 
                    src=\"/static/images/header.png\"
                    alt=\"header\" 
                    width='64px' 
                    height='64px' 
                />
            <div/>
            <table border='1' width='400px'>
                <tr>
                    <th>姓名</th><th>电话</th><th>年龄</th><th>操作</th>
                </tr>
                <tr>
                    <td>${userData.name}</td>
                    <td>${userData.tel}</td>
                    <td>${userData.age}</td>
                    <td><a href='/modify'>修改</a></td>
                </tr>
            </table>
        </div>
    `;
}

module.exports = router;
