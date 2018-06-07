var express = require('express');
    formidable = require('formidable')
    router = express.Router();
    util = require('util');
    fs = require("fs")
    mysql = require('./../mysql/sql');


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
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write("send Success");
        files.name = "header.png"
        // res.end(util.inspect({fields: fields, files: files}));
        res.end();
    });
}
function modifyMesg(req,res,next){
    var data = req.body;
    var id = 2;
    var name = data.name;  
    var password = data.password;
    var sql = "UPDATE t_user set PASSWORD = '"+password+"',tel = "+data.tel+", age = "+data.age+" WHERE id = "+id;
    mysql.query(sql,function(sqldata){
        res.end("modify success");
    }); 
}

module.exports = router;