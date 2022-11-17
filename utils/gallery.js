const fs = require('fs');
let saveFile = function (req, res, next) {
    
    let fileName = new Date().valueOf() + '_' + req.files.file.name;
    req.files.file.mv(`./uploads/${fileName}`);
    req.body['image'] = fileName;
    next();
}
let saveFiles = function (req, res, next) {
    req.files.files.map(function (file) {
        let fileName = new Date().valueOf() + '_' + file.name;
        file.mv(`./uploads/${fileName}`);
        req.body['images'].push(fileName);
    })
    next();
}
let deleteFile = (file) => {
    if (fs.existsSync(`./uploads/${file}`)) {
        
        fs.unlinkSync(`./uploads/${file}`);
    } else {
        console.log('.uploads/'+file,"file doesn't exits");
    }
}
let deleteFiles = (file) => {
    if (fs.existsSync(`./uploads/${file}`)) {
        
        fs.unlinkSync(`./uploads/${file}`);
    } else {
        console.log('.uploads/'+file,"file doesn't exits");
    }
}
module.exports = { saveFile,deleteFile, saveFiles  };