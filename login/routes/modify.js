var express = require('express');
var router = express.Router();
var mysql = require('./../mysql/sql');
var templateView = require("./../views/templated")
var async = require("async")
var fs = require("fs")
var formidable = require("formidable")

router.get('/', function (req, res, next) {
    async.waterfall(
        [
            function (callback) {
                selectUserMsgFromMysql(req.session.user, function (err, result) {
                    if (err) {
                        callback(new Error(`database query error, reason:[${err.message}]`))
                    }
                    callback(err, result)
                })
            },
            function (sqlSelectData, callback) {
                callback(null, templateView.getModifyPageTemplate(sqlSelectData));
            }
        ], function (err, templateView) {
            if (err) {
                next(err)
            }
            randerTemplate(req, res, templateView);
        }
    )
});

router.post("/msg", function (req, res, next) {
    //修改个人信息的表单提交
    var userData_baseSession = req.session.user
    var receive_clientData = req.body

    //此处客户端需要验证参数是否有效。服务端辅助验证
    if (!receive_clientData.password || !receive_clientData.tel || !receive_clientData.age || !userData_baseSession.id) {
        next()//new Error('params shouldn`t be empty')
    } else {
        var sql = "UPDATE t_user set PASSWORD = '" + receive_clientData.password + "',tel = " + receive_clientData.tel + ", age = " + receive_clientData.age + " WHERE id = " + userData_baseSession.id;
        mysql.query(sql, function (err, sqlCallBackData) {
            if (!err) {
                //修改用户session
                saveSessionWhenUserMsgChanged(req, receive_clientData);
                res.redirect("/profile");
                return;
            } else {
                next(err);
            }
        });
    }
})

router.post("/header", function (req, res, next) {
    //修改头像的相应
    router.form = new formidable.IncomingForm();
    router.form.parse(req, function (err, fields, files) {
        if (!err) {
            modifyUserHeader(req,res,fields,files)
        } else {
            next(err);
        }
    });
})

//修改用户头像
function modifyUserHeader(req,res,fields,files){
    //modify header
    var imagePath = process.cwd()+"/login/public/images";
    router.form.uploadDir = imagePath;
    var fileOldPath = files.upload.path;
    var fileNewPath = imagePath + "/header.png";
    fs.access(fileNewPath, fs.constants.F_OK, (err) => {
        if( !err )  fs.unlinkSync(fileNewPath) ;
        fs.rename(fileOldPath,fileNewPath,function(){
            res.redirect("/profile");
        });
    });
}

//当用户信息改变修改session
function saveSessionWhenUserMsgChanged(req, userData) {
    req.session.user = {
        login: true,
        id: userData.id,
        userName: userData.name,
        tel: userData.tel,
        age: userData.age
    }
}

//生成temple并且写入res
function randerTemplate(req, res, templateData) {
    res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
    res.write(templateData);
    res.end();
}

function selectUserMsgFromMysql(useData, callback) {
    var sql = "SELECT * FROM t_user WHERE id = '" + useData.id + "';";
    mysql.query(sql, function (err, sqlCallBackData) {
        callback(err, sqlCallBackData[0]);
    })
}

module.exports = router;