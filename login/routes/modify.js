var express = require('express');
var router = express.Router();
var mysql = require('./../mysql/sql'); 
var templateView = require("./../views/templated") 

router.get('/', function(req,res){
    //当搜索成功的时候为当前这个用户修改个人信息。
    var sql = "SELECT * FROM t_user WHERE id = '"+req.session.user.id+"';";  
    mysql.query(sql,function(err, sqlCallBackData){ 
        if (!err) {
            //当前用户仅有一个数据
            randerTemple(req,res,templateView.getModifyPageTemplate(sqlCallBackData[0]))
        } else {
            next(err);
        }
    }) 
});

router.post("/msg",function(req,res,next){
    //修改给人信息的相应
    req.setEncoding("utf8"); 
    var params = req.body
    var name = params.name;

    //此处客户端需要验证参数是否有效。服务端辅助验证
    if ( !password || !tel || !id || !age ) {
        next(new Error('params should`t empty'))
    } else {
        var sql = "UPDATE t_user set PASSWORD = '"+password+"',tel = "+data.tel+", age = "+data.age+" WHERE id = "+id;
        mysql.query(sql,function(err,sqldata){
            saveSession(sqlCallBackData[0])
            
        }); 
    }
    modifyMesg(req,res,next)
})

router.post("/header",function(req,res,next){
    //修改头像的相应
    router.form = new formidable.IncomingForm();
    router.form.parse(req, function(err, fields, files) {
        if (!err){
            //modify user header
            modifyUserHeader(req,res,fields,files);
        }else{
            next();
        }
    });
})

function saveSession(req,data){
    req.session.userData = {
        login : true,
        userName : data.name,
        tel : data.name,
        age : data.name,
        id : data.name
    };
}
function randerTemple(req,res,templateData){ 
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'}); 
    res.write(templateData); 
    res.end();
};

module.exports = router;