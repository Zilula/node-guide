 var querystring = require("querystring"), 
    fs = require('fs'), 
    formidable = require('formidable');


function start(response) {
    console.log('Request handle Start was Called');

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+'<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload" multiple="multiple">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(body);
        response.end();
};

function upload(response, request) {
    var form  = new formidable.IncomingForm();

        console.log('Request Handle Upload was called');

        form.parse(request, function(err, fields, files) {

            fs.rename(files.upload.path, "/tmp/test.png", function(error) {

                if(err) {
                    fs.unlink("/tmp/test.png");
                    fs.rename(files.upload.path, "/tmp/test.png");
                };

            });


            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('received image: <br/>');
            response.write("<img src='/show' />");
            response.end();
        });
}
function show(response) {
    response.writeHead(200, {'Content-Type': 'image/png'});
    fs.createReadStream("/tmp/test.png").pipe(response);
}
exports.start = start;
exports.upload = upload;
exports.show = show;