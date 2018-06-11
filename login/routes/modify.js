var express = require('express');
var router = express.Router();
var mysql = require('./../mysql/sql'); 

router.get('/', function(req,res,data){
    var sql = "SELECT * FROM t_user WHERE id = '"+req.session.user.id+"';";  
    console.log(sql)
    mysql.query(sql,function(err, dataR){  
        console.log(dataR)
        modifyview(req,res,dataR);  
    }) 
});

router.post("/msg",function(req,res,next){
    req.setEncoding("utf8"); 
    var params = req.body
    var name = params.name;
    modifyMesg(req,res,next)
})

router.post("/header",function(req,res,next){
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




function modifyview(req,res,data){ 

    req.session.userData = {
        login:true,
        userName = data[0].name,
        tel = data[0].name,
        age = data[0].name,
        id = data[0].name
    };
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'}); 
    //upload header img 
    var str = "<img src=\"/static/images/header.png\"alt=\"header\" />";
    str +='<form action="/modifyUser/header" enctype="multipart/form-data" method="post">'+
        '<input type="file" name="upload" multiple="multiple"><br>'+     
        '<input type="submit" value="上传">'+
    '</form><br/>'

    //update user message
     str += '<form action="/modifyUser/msg"  method="post">'+  
        "密码:<input type ='text' name='password' value= "+data[0].password+"> <br/>"+ 
        "年龄:<input type ='text' name='age' value="+data[0].age+"><br/>"+
        "电话:<input type ='text' name='tel' value="+data[0].tel+"><br/>"+
        " <input type ='submit' value='修改'></form>";  

   res.write(str); 
   res.end(); 
}
module.exports = router;