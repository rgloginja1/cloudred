Dropzone.options.myDropzone = {
  init: function() {
    var self = this;
    // config
    self.options.addRemoveLinks = false;
    self.options.dictRemoveFile = "Delete";

    // load already saved files
    $.get('/upload', function(data) {
      var files = JSON.parse(data).files;
      for (var i = 0; i < files.length; i++) {

        var mockFile = {
          name: files[i].name,
          size: files[i].size,
          type: 'image/jpeg'
        };

        //self.options.addedfile.call(self, mockFile);
        //self.options.thumbnail.call(self, mockFile, files[i].url);

      };

    });

    // bind events

    //New file added
    self.on("addedfile", function(file) {
      console.log('new file added ', file);
      $('#uploaded').show();
      if(file.type == "image/jpeg") {
        $('#uploaded').append('<div class="col-md-4 text-center well"><center><img src="/uploaded/files/'+file.name+'" class="img-responsive " style="max-height: 128px;"/></center></p><p><small>'+file.name+'</small></p><div class="row"><div class="col-xs-2"><i class="ion-social-facebook" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-social-twitter" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-social-googleplus" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-email" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-edit" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-wand" style="font-size: 14px;"></i></div></div>');
      } else if (file.type == "image/png") {
         $('#uploaded').append('<div class="col-md-4 text-center well"><center><img src="/uploaded/files/'+file.name+'" class="img-responsive " style="max-height: 128px;"/></center></p><p><small>'+file.name+'</small></p><div class="row"><div class="col-xs-2"><i class="ion-social-facebook" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-social-twitter" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-social-googleplus" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-email" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-edit" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-wand" style="font-size: 14px;"></i></div></div>');
      } else {
        $('#uploaded').append('<div class="col-md-4 text-center well"><center><img src="/img/logo1.png" class="img-responsive" style="max-height: 128px;"/></center></p><p><small>'+file.name+'</small></p><div class="row"><div class="col-xs-2"><i class="ion-social-facebook" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-social-twitter" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-social-googleplus" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-email" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-edit" style="font-size: 14px;"></i></div><div class="col-xs-2"><i class="ion-wand" style="font-size: 14px;"></i></div></div>');
      }
      
    });

    // Send file starts
    self.on("sending", function(file) {
      console.log('upload started', file);
    });

    // File upload Progress
    self.on("totaluploadprogress", function(progress) {
      console.log("progress ", progress);
    });

    self.on("queuecomplete", function(progress) {
      //$('.meter').delay(999).slideUp(999);
      console.log('queuecomplete');
    });

    // On removing file
    self.on("removedfile", function(file) {
      console.log(file);
      $.ajax({
        url: '/uploaded/files/' + file.name,
        type: 'DELETE',
        success: function(result) {
          console.log(result);
        }
      });
    });

  }
};
