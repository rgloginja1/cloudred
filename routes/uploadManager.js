var path = require('path');
var mime = require('mime');

var options = {
  tmpDir: __dirname + '/../public/uploaded/tmp',
  uploadDir: __dirname + '/../public/uploaded/files',
  uploadUrl: '/uploaded/files/',
  storage: {
    type: 'local'
  }
};

var uploader = require('blueimp-file-upload-expressjs')(options);

module.exports = function(router) {
  router.get('/uploaded', function(req, res) {
    //uploader.get(req, res, function(obj) {
    //  res.send(JSON.stringify(obj));
    //});
    console.log('IP');
  });

  router.post('/upload', function(req, res) {
    uploader.post(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });

  });

  router.get('/uploaded/files/:name', function(req, res) {
    //uploader.get(req, res, function(obj) {
    //  res.send(obj);
    //});
    //console.log(req.params.name);
    var file = __dirname + '/uploaded/files/' + req.params.name;

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);

  });

  router.delete('/uploaded/files/:name', function(req, res) {
    uploader.delete(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });
  return router;
};
