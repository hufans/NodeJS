var crypto = require('crypto');
var fs = require("fs")

function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

/**
 * 
 * @param {int} id 
 */

function getHeaderPath( id ) {
    var idString  = md5( id.toString() );
    var headerPath = "/static/images/headers/"+idString+".png";
    var imagePath = process.cwd()+"/login/public/images/headers/"+idString+".png";
    return  fs.existsSync( imagePath ) ? headerPath : "/static/images/header.png"
}

global.md5 = md5;
module.exports.getHeaderPath = getHeaderPath;
