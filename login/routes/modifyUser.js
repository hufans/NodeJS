var express = require('express');
    formidable = require('formidable')
    router = express.Router();
    util = require('util');
    fs = require("fs")
    mysql = require('./../mysql/sql');
    app = express()

router.use("/msg",function(req,res,next){
    req.setEncoding("utf8"); 
    var params = req.body
    var name = params.name;
    modifyMesg(req,res,next)
})

router.use("/header",function(req,res,next){
    router.form = new formidable.IncomingForm();
    router.form.parse(req, function(err, fields, files) {
        if (!err){
            //modify user msg
            modifyUserHeader(req,res,fields,files);
        }else{
            next();
        }
    });
})

function modifyUserHeader(req,res,fields,files){
    //modify header
    var imagePath = process.cwd()+"/login/public/images";
    router.form.uploadDir = imagePath;
    var old = files.upload.path;
    var newpath = imagePath + "/header.png";
    fs.unlinkSync(newpath)
    fs.rename(old,newpath,function(){
        deal(req,res)
    });
}
function modifyMesg(req,res,next){
    var data = req.body;
    var id = req.session.userData.id;
    var name = data.name;  
    var password = data.password;
    var sql = "UPDATE t_user set PASSWORD = '"+password+"',tel = "+data.tel+", age = "+data.age+" WHERE id = "+id;
    mysql.query(sql,function(sqldata){
        invokeSql(req,res,id);
    }); 
}

function invokeSql(req,res,id) {
    var sql = "SELECT * FROM t_user WHERE id = " + id +";";
    mysql.query(sql, function (data) {
        showpage(req, res, data);
    });
}

//show page when sql invoke success
function showpage(req,res,data){  
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});  
    if(data != ''){ 
        //login success 
        var str ="<h1>修改成功</h1>";  
            str+="帐号:"+data[0].name+"<br>";  
            str+="密码:"+data[0].password;  
            str+="<table border='1' width='400px'>";  
            str+="<tr><th>姓名</th><th>电话</th><th>年龄</th><th>操作</th></tr>";  
            for (var i = data.length - 1; i >= 0; i--) {  
                str+="<tr>";  
                str+="<td>"+data[i].name+"</td>";  
                str+="<td>"+data[i].tel+"</td>";  
                str+="<td>"+data[i].age+"</td>";  
                str+="<td><a href='/modify?id="+data[i].id+"'>修改</a></td>";
                str+="<img src=\"/images/header.png\"alt=\"header\" />"
                str+="</tr>";  
            };  
            str+="</tr></table>";  
           
    }
    res.write(str);  
    res.end();
}  

module.exports = router;