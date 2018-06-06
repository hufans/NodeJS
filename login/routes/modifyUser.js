var express = require('express');
    formidable = require('formidable')
    router = express.Router();
    util = require('util');
    fs = require("fs")

router.all('/',function(req,res,next){
    if (req.method.toLowerCase() == 'post'){
        var form = new formidable.IncomingForm();
        var x = process.cwd()+"/login/public/images";
        form.uploadDir = x;
        form.parse(req, function(err, fields, files) {
            if (!err){
                //执行改名
                var old = files.upload.path;
                var newpath = x + "/header.png";
                fs.unlinkSync(newpath)
                fs.rename(old,newpath,function(){
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write("<h>上传成功！</h>");
                    files.name = "header.png"
                    res.end(util.inspect({fields: fields, files: files}));
                });
                

                // res.end();
            }else{
                throw err;
            }
        });
    }else{
        next()
    }
  });
module.exports = router;