var express = require('express');
    formidable = require('formidable')
    router = express.Router();
    util = require('util');

router.all('/',function(req,res,next){
    if (req.method.toLowerCase() == 'post'){
        var form = new formidable.IncomingForm();
        var x = process.cwd()+"/login/public/images";
        form.uploadDir = x;
        form.parse(req, function(err, fields, files) {
            if (!err){
                res.writeHead(200, {'content-type': 'text/plain'});
                res.write("<h>上传成功！</h>");
                res.end(util.inspect({fields: fields, files: files}));
                
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